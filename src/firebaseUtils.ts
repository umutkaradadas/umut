import { db, handleFirestoreError, OperationType } from './firebase';
import { collection, doc, setDoc, onSnapshot, getDoc, updateDoc, getDocs } from 'firebase/firestore';
import { DOCTORS } from './data';
import { Doctor, Review } from './types';

export async function seedDatabase() {
  const specialties = [
    'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Gastroenterology', 'Ophthalmology', 'Psychiatry', 'General Surgery', 'Internal Medicine', 'Oncology', 'Gynecology', 'Urology', 'Other'
  ];
  const focusAreas = [
    'Heart Failure', 'Acne & Skin Care', 'Migraine Management', 'Joint Replacement', 'Child Development', 'IBS & Gut Health', 'Laser Eye Surgery', 'Anxiety & Depression', 'Minimal Invasive Surgery', 'Diabetes Management', 'Immunotherapy', 'Pregnancy Care', 'Kidney Stones', 'Preventive Medicine'
  ];
  const procedures = [
    'Echocardiography', 'Botox & Fillers', 'EEG Tracking', 'Arthroscopy', 'Pediatric Vaccination', 'Endoscopy', 'LASIK', 'Cognitive Behavioral Therapy', 'Laparoscopy', 'Insulin Titration', 'Chemotherapy Management', 'Ultrasound Imaging', 'Robotic Surgery', 'Dietary Counseling'
  ];

  try {
    console.log("Seeding specialties...");
    for (const spec of specialties) {
      const id = spec.toLowerCase().replace(/\s+/g, '-');
      try {
        await setDoc(doc(db, 'specialties', id), { id, label: spec, isActive: true });
      } catch (e: any) {
        console.error(`Failed to seed specialty ${id}:`, e.message, e);
        throw e;
      }
    }
    console.log("Seeding focusAreas...");
    for (const focus of focusAreas) {
      const id = focus.toLowerCase().replace(/\s+/g, '-');
      try {
        await setDoc(doc(db, 'focusAreas', id), { id, label: focus, isActive: true });
      } catch (e: any) {
        console.error(`Failed to seed focusArea ${id}:`, e.message, e);
        throw e;
      }
    }
    console.log("Seeding procedures...");
    for (const proc of procedures) {
      const id = proc.toLowerCase().replace(/\s+/g, '-');
      try {
        await setDoc(doc(db, 'procedures', id), { id, label: proc, isActive: true });
      } catch (e: any) {
        console.error(`Failed to seed procedure ${id}:`, e.message, e);
        throw e;
      }
    }

    // Seed doctors
    console.log("Seeding doctors...");
    for (const doctor of DOCTORS) {
      const docRef = doc(db, 'doctors', doctor.id);
      try {
        await setDoc(docRef, doctor);
      } catch (e: any) {
        console.error(`Failed to seed doctor ${doctor.id} (${doctor.name}):`, e.message, e);
        throw e;
      }
      
      // Seed reviews to subcollection
      for (const review of doctor.reviews) {
        try {
          await setDoc(doc(db, 'doctors', doctor.id, 'reviews', review.id), review);
        } catch (e: any) {
          console.error(`Failed to seed review ${review.id} for doctor ${doctor.id}:`, e.message, e);
          throw e;
        }
      }
    }
    console.log("Seed data loaded successfully (including doctors and reviews)");
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'seed');
  }
}

export async function submitReviewToFirestore(doctorId: string, review: Review, updatedDoctorState: Doctor) {
  try {
    // 1. Save review to subcollection
    const reviewRef = doc(db, 'doctors', doctorId, 'reviews', review.id);
    await setDoc(reviewRef, {
      id: review.id,
      treatmentType: review.treatmentType,
      patientIdCode: review.patientIdCode,
      verified: review.verified,
      date: review.date,
      summary: review.summary,
      text: review.text,
      ratings: review.ratings,
      journey: review.journey
    });

    // 2. Sync doctor parent document state
    const docRef = doc(db, 'doctors', doctorId);
    await setDoc(docRef, updatedDoctorState, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `doctors/${doctorId}/reviews`);
  }
}
