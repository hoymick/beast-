export interface Applicant {
  id: string;
  fullName: string;
  email: string;
  age: number;
  country: string;
  whyPickYou: string;
  whatMakesYouDifferent: string;
  craziestThing: string;
  videoUrl: string;
  socialMedia: string;
  status: 'pending' | 'reviewed' | 'selected' | 'rejected';
  createdAt: string;
}

export type ApplicationFormData = Omit<Applicant, 'id' | 'status' | 'createdAt'>;
