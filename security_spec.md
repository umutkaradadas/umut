# Security Spec: CareTrust İstanbul - İstanbul Doktor Güvenilirlik ve Tedavi Sicili

## 1. Data Invariants
1. A **User** profile must correspond exactly to the `request.auth.uid`. No user can register/simulate a role they do not have or claim another user's email.
2. A **DoctorProfile** and **PatientProfile** can only be created by their respective owners.
3. No user can self-approve their own `pending_verification` status or modify immutable structures such as `createdAt`.
4. Anyone who is signed-in can read a list of **doctors** and their **reviews**, but only authenticated, email-verified, or logged-in users with valid protocol codes can submit new, verified treatment reports.
5. All reviews must have strict ratings (1 to 5) for explanation clarity, treatment success, and post-op care.
6. The numeric rating summaries of a doctor profile must be derived correctly and cannot be set directly by patients (except as cumulative calculation increments).

---

## 2. The "Dirty Dozen" Rogue Payloads
Here are the 12 payloads aimed at compromising the system under Zero-Trust constraints:

### Payload 1: Admin Privilege Escalation (Self-Admin Role Registration)
```json
{
  "uid": "attacker_userId_123",
  "fullName": "Imposter Admin",
  "email": "attacker@gmail.com",
  "role": "admin",
  "createdAt": "2026-05-23T08:52:00Z"
}
```
*Expected Status*: `PERMISSION_DENIED` - The system role only permits `['doctor', 'patient']`.

### Payload 2: Hostile Takeover (Creating Doctor Profile for Someone Else)
```json
{
  "uid": "victim_userId_456",
  "currentTitle": "Assoc. Prof.",
  "hospitalClinicAffiliation": "Fake Hospital",
  "graduationYear": 2012,
  "medicalSpecialty": ["Kardiyoloji"],
  "focusAreas": [],
  "procedures": [],
  "biography": "Hacked!",
  "pending_verification": false
}
```
*Expected Status*: `PERMISSION_DENIED` - UID in profile must match the user's authentic `request.auth.uid`.

### Payload 3: Instant Validation Bypass (Self-Approving Clinic Profile)
```json
{
  "uid": "doctor_userId_789",
  "currentTitle": "Prof. Dr.",
  "hospitalClinicAffiliation": "Klinik",
  "graduationYear": 2005,
  "medicalSpecialty": ["Ortopedi ve Travmatoloji"],
  "focusAreas": [],
  "procedures": [],
  "biography": "Valid biography details.",
  "pending_verification": false
}
```
*Expected Status*: `PERMISSION_DENIED` - Users writing to their profiles must either default `pending_verification` to `true` or have it verified server-side/admin-side only.

### Payload 4: Arbitrary Custom Path Injection (shadowing doctor collections)
```json
{
  "id": "doc-999-attack-vector\\\\../invalid-char-seq",
  "name": "Dr. Hack",
  "title": "MD",
  "specialty": "Kardiyoloji",
  "hospital": "Hospital",
  "city": "Istanbul",
  "imageUrl": "https://img.com",
  "rating": 5.0,
  "reviewsCount": 10,
  "credibilityRating": 100
}
```
*Expected Status*: `PERMISSION_DENIED` - Path ID parsing constraints (`isValidId()`) rule out traversal paths or junk strings.

### Payload 5: Spoofed Patient Identifier (Impersonating national health verification code)
```json
{
  "id": "rev-999",
  "treatmentType": "Kardiyoloji Prosedürü",
  "patientIdCode": "Patient #8888 — Verified via National Health ID (SPOOFED)",
  "verified": true,
  "date": "2026-05-23",
  "summary": "Fake review summary",
  "text": "Fake review body."
}
```
*Expected Status*: `PERMISSION_DENIED` - Writes must validate against real `request.auth` and profile constraints.

### Payload 6: Overflow String Injection (Denial of Wallet Attack via Biography Limit)
```json
{
  "uid": "doctor_123",
  "currentTitle": "Dr.",
  "biography": "A very long sentence... [repeating 5000 times to exceed 400 chars limit]"
}
```
*Expected Status*: `PERMISSION_DENIED` - Exceeds strict `.size() <= 400` constraint.

### Payload 7: Immature Input Data Attack (Creating a review with rating 10)
```json
{
  "id": "rev-123",
  "ratings": {
    "explanation": 10,
    "success": 10,
    "postOp": 10
  }
}
```
*Expected Status*: `PERMISSION_DENIED` - Limits on review score must be between 1 and 5.

### Payload 8: Immutable Field Overwrite (Altering profile 'createdAt' timestamp)
```json
{
  "uid": "doctor_123",
  "createdAt": "2020-01-01T00:00:00Z"
}
```
*Expected Status*: `PERMISSION_DENIED` - Prevent alteration of database timing records.

### Payload 9: Orphaned Record Writing (Creating a Doctor Profile without registering a Core User profile)
```json
{
  "uid": "unregistered_doctor_999",
  "currentTitle": "Dr."
}
```
*Expected Status*: `PERMISSION_DENIED` - Enfore matches validation with `exists(/databases/$(database)/documents/users/$(userId))`.

### Payload 10: Anonymous Sybil Review Submission
```json
{
  "id": "anonymous-review",
  "text": "I will spam fake entries."
}
```
*Expected Status*: `PERMISSION_DENIED` - Must be an authenticated, signed-in user.

### Payload 11: Future Timing Assault (Spoofing timestamps to a future date)
```json
{
  "id": "res-123",
  "createdAt": "2035-12-31T23:59:59Z"
}
```
*Expected Status*: `PERMISSION_DENIED` - CreatedAt checks require strict alignment with `request.time`.

### Payload 12: Affected Keys Bypassing (Updating unauthorized fields on a review)
```json
{
  "id": "rev-123",
  "verified": true
}
```
*Expected Status*: `PERMISSION_DENIED` - Updates to a verified treatment require strict `affectedKeys().hasOnly(...)` limitations.

---

## 3. The Test Runner Structure (`firestore.rules.test.ts`)
Below is our test skeleton checking rogue input requests.
