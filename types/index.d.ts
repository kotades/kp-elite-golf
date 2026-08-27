export type Subject =
  | "golf-basics"
  | "equipment"
  | "grip-setup"
  | "full-swing"
  | "short-game"
  | "bunker-recovery"
  | "course-management"
  | "etiquette-safety"
  | "practice-plan"
  | "biomechanics"
  | "putting-mastery";

export interface Coach {
  id: string;
  name: string;
  title: string;
  credentials: string[];
  specialty: string;
  image: string;
  videoIntroUrl?: string;       // short 15-30s coach intro video
  bio: string;
  tourExperience: string;
  handicapSpecialty: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  videoUrl?: string;            // Pexels/Firebase CDN MP4 stream
  videoThumbnail?: string;      // Unsplash poster frame
  drillsCount: number;
  isPreview?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface CourseModule {
  id: string;
  moduleNumber: number;
  slug: string;
  title: string;
  category: "Fundamentals" | "Swing Mechanics" | "Short Game & Scrambling" | "Strategy & Mindset";
  description: string;
  level: "All Levels" | "Beginner" | "Intermediate" | "Tour Prep";
  duration: string;
  lessonsCount: number;
  drillsCount: number;
  image: string;
  previewVideoUrl?: string;     // free-preview clip for the module hero
  price: number;
  rating: number;
  studentCount: number;
  instructor: Coach;
  learningOutcomes: string[];
  chapters: Chapter[];
  featured?: boolean;
}

/** Centralised media asset catalog — verified 200-OK */
export interface MediaAsset {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;           // poster frame for videos
  alt: string;
  credit?: string;
  page: string;                 // which page/section uses this asset
  placement: string;
}


export interface StudentProgress {
  userId: string;
  currentModuleId: string;
  currentMilestone: "Foundation" | "Consistency" | "On-Course Ready" | "Tour Caliber";
  completedLessons: string[];
  overallScore: number;
  skillRatings: {
    grip: number;
    setup: number;
    fullSwing: number;
    putting: number;
    chipping: number;
    courseManagement: number;
  };
  handicapStart: number;
  handicapCurrent: number;
  swingsAnalyzed: number;
  upcomingLessons: {
    id: string;
    date: string;
    time: string;
    coach: string;
    topic: string;
  }[];
}

export interface SwingSubmission {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  videoUrl: string;
  clubUsed: string;
  viewAngle: "Down-the-Line" | "Face-On" | "Top-Down 3D";
  status: "Pending AI Review" | "Coach Analyzed" | "Complete";
  aiMetrics?: {
    tempoRatio: string;
    backswingAngle: number;
    hipRotationImpact: number;
    clubheadSpeedMph: number;
    launchAngleDeg: number;
    pathTendency: "Square" | "Inside-Out" | "Over-the-Top";
  };
  coachNotes?: string;
  assignedDrill?: string;
}

export interface IntakeApplication {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: "Email" | "Text" | "Phone";
  experienceLevel: "Brand new" | "Beginner" | "Intermediate" | "Advanced";
  yearsPlaying: string;
  currentHandicap: string;
  homeCourse: string;
  primaryGoal: "Learn basics" | "Improve swing mechanics" | "Lower tournament scores" | "Course confidence";
  specificChallenges: string;
  physicalLimitations?: string;
  preferredDays: string[];
  preferredTime: "Morning" | "Afternoon" | "Evening";
  agreedToTerms: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaLink: string;
}

export interface Testimonial {
  id: string;
  name: string;
  handicapDrop: string;
  program: string;
  milestone: string;
  quote: string;
  image: string;
  homeClub: string;
  status: "Course-ready" | "Consistent setup" | "Short-game certified" | "Continuing";
}

export interface AIVoicePersona {
  id: string;
  name: string;
  role: string;
  voiceId: string;
  avatar: string;
  prompt: string;
  welcomeMessage: string;
  specialty: string;
}

export interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

declare global {
  interface Companion {
    id: string;
    name: string;
    subject: string;
    topic: string;
    voice: string;
    style: string;
    duration?: number;
    bookmarked?: boolean;
  }

  interface CompanionComponentProps {
    companionId: string;
    subject: string;
    topic: string;
    name: string;
    userName: string;
    userImage: string;
    style: string;
    voice: string;
  }

  interface SavedMessage {
    role: string;
    content: string;
  }

  interface CreateCompanion {
    name: string;
    subject: string;
    topic: string;
    voice: string;
    style: string;
    duration?: number;
  }

  interface GetAllCompanions {
    limit?: number;
    page?: number;
    subject?: string | string[];
    topic?: string | string[];
  }

  interface SearchParams {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }

  interface Message {
    role: string;
    content?: string;
    type?: string;
    transcriptType?: string;
    transcript?: string;
  }
}

