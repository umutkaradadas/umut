export interface JourneyPhase {
  phase: string;
  title: string;
  text: string;
}

export interface RatingBreakdown {
  explanation: number; // clarity of explanation
  success: number;     // treatment success
  postOp: number;      // post-op care
}

export interface Review {
  id: string;
  treatmentType: string;
  patientIdCode: string; // e.g. "Patient #4829 - Verified via National Health ID"
  verified: boolean;
  date: string;
  summary: string;
  journey: JourneyPhase[];
  ratings: RatingBreakdown;
  text: string;
  verifiedWithDocument?: boolean;
  docFileName?: string;
  replyText?: string;
  replyDate?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  patientName: string;
  patientEmail: string;
  patientUid: string;
  date: string;       // e.g. '2026-05-24'
  timeSlot: string;   // e.g. '11:00'
  complaint: string;
  previousDiagnoses?: string;
  consultationType: 'Yüz yüze' | 'Online Video';
  status: 'Onaylandı' | 'Beklemede' | 'İptal Edildi';
}

export interface ResearchPaper {
  id: string;
  year: string;
  title: string;
  category: 'Publication' | 'Clinical Case' | 'Award';
  institution: string;
  description: string;
}

export interface HospitalExperience {
  hospitalName: string;
  department: string;
  yearsRange: string;
  title: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  hospital: string;
  city: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  credibilityRating: number; // e.g. 98
  verifiedTreatments: number;
  experienceYears: number;
  satisfactionRate: number;
  age: number;
  about: string;
  education: string[];
  specialInterests: string[];
  reviews: Review[];
  timeline: ResearchPaper[];
  experienceHistory?: HospitalExperience[];
}

export interface SearchFilters {
  specialty: string;
  symptom: string;
  city: string;
  minCredibility: number;
}
