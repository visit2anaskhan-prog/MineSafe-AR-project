export type Language = 'en' | 'hi';
export type UserRole = 'TRAINEE' | 'ADMIN';
export type PerformanceLevel = 
  | 'Needs Improvement' 
  | 'Basic Understanding' 
  | 'Competent' 
  | 'Excellent'
  | 'DISTINCTION'
  | 'COMPETENT'
  | 'NEEDS_TRAINING';

export interface UserProfile {
  uid: string;
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  preferredLanguage: Language;
  createdAt: string;
  lastLoginAt: string;
  mineLocation?: string;
}

export interface InteractiveObject {
  id: string;
  name: string;
  nameHindi: string;
  isHazard: boolean;
  hazardDescription: string;
  hazardDescriptionHindi: string;
  correction: string;
  correctionHindi: string;
  position: [number, number, number]; // X, Y, Z in 3D simulator
  category: string;
  resolved?: boolean;
}

export interface ARScenario {
  markerTitle: string;
  markerSubtitle: string;
  objective: string;
  objectiveHindi: string;
  instructions: string;
  instructionsHindi: string;
  targetCount: number;
  interactiveObjects: InteractiveObject[];
}

export interface SafetyModule {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  durationMinutes?: number;
  thumbnail: string;
  arEnabled: boolean;
  published: boolean;
  createdAt: string;
  briefing: {
    title: string;
    titleHindi: string;
    points: string[];
    pointsHindi: string[];
    voiceTextEn: string;
    voiceTextHi: string;
    sopReference: string;
  };
  arScenario: ARScenario;
}

export interface Question {
  id: string;
  moduleId: string;
  question: string;
  questionHindi: string;
  options: string[];
  optionsHindi: string[];
  correctAnswer: number; // index 0-3
  explanation: string;
  explanationHindi: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  published: boolean;
}

export interface Attempt {
  id: string;
  userId: string;
  userName: string;
  moduleId: string;
  moduleTitle: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken?: number; // in seconds
  timeTakenSeconds?: number;
  answers?: Record<string, number>;
  userAnswers?: any[];
  completedAt: string;
  performanceLevel: PerformanceLevel;
  certificateId?: string;
}

export interface Progress {
  id: string;
  userId: string;
  moduleId: string;
  progressPercentage: number;
  bestScore: number;
  attempts: number;
  completed: boolean;
  lastAccessedAt: string;
}

export interface Certificate {
  id: string;
  certificateId: string; // e.g. MSAR-2026-000001
  userId: string;
  userName: string;
  moduleId: string;
  moduleName: string;
  score: number;
  performanceLevel: PerformanceLevel;
  issueDate: string;
  verificationCode: string;
  status: 'VERIFIED' | 'REVOKED' | 'PENDING';
  issuer: string;
  stateDept: string;
}

export interface AIFeedback {
  id: string;
  userId: string;
  moduleId: string;
  attemptId: string;
  feedback: string;
  weakTopics: string[];
  recommendation: string;
  nextRecommendedModule: string;
  revisionPoints: string[];
  createdAt?: string;
  generatedAt?: string;
}

export interface AIQuestionDraft {
  id: string;
  moduleId: string;
  question: string;
  questionHindi: string;
  options: string[];
  optionsHindi: string[];
  correctAnswer: number;
  explanation: string;
  explanationHindi: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  status: 'DRAFT' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface AdminAnalytics {
  totalTrainees: number;
  trainingCompletions: number;
  averageScore: number;
  passRate: number;
  certificatesIssued: number;
  moduleStats: Array<{
    id: string;
    title: string;
    avgScore: number;
    completionRate: number;
    totalAttempts: number;
  }>;
  weakTopicFrequencies: Array<{
    topic: string;
    count: number;
    module: string;
  }>;
  scoreDistribution: Array<{
    range: string;
    count: number;
  }>;
  recentActivity: Array<{
    id: string;
    userName: string;
    moduleName: string;
    score: number;
    status: 'Passed' | 'Failed';
    date: string;
  }>;
}

export interface AdminInsightReport {
  id: string;
  generatedAt: string;
  summary: string;
  lowestPerformingModule: string;
  commonGaps: string[];
  recommendations: string[];
  priorityActions: string[];
}
