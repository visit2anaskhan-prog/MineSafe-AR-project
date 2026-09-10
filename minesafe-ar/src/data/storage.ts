import { 
  UserProfile, SafetyModule, Question, Attempt, Progress, 
  Certificate, AIFeedback, AIQuestionDraft, AdminAnalytics, AdminInsightReport, Language
} from '../types';
import { 
  SEED_MODULES, SEED_QUESTIONS, SEED_TRAINEES, 
  DEMO_ADMIN, SEED_CERTIFICATES, INITIAL_ANALYTICS 
} from './seedData';

const STORAGE_KEYS = {
  USER: 'minesafe_current_user',
  LANGUAGE: 'minesafe_language',
  MODULES: 'minesafe_modules',
  QUESTIONS: 'minesafe_questions',
  ATTEMPTS: 'minesafe_attempts',
  CERTIFICATES: 'minesafe_certificates',
  PROGRESS: 'minesafe_progress',
  FEEDBACK: 'minesafe_ai_feedback',
  QUESTION_DRAFTS: 'minesafe_ai_drafts',
  INSIGHTS: 'minesafe_admin_insights',
  TRAINEES: 'minesafe_trainees'
};

class StorageManager {
  private currentUser: UserProfile | null = null;
  private currentLanguage: Language = 'en';

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    // Initialize Language
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language;
    if (savedLang === 'en' || savedLang === 'hi') {
      this.currentLanguage = savedLang;
    }

    // Initialize Default User as Demo Trainee (Ramesh Murmu)
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch {
        this.currentUser = SEED_TRAINEES[0];
      }
    } else {
      this.currentUser = SEED_TRAINEES[0];
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(this.currentUser));
    }

    // Initialize Seed Modules if not set
    if (!localStorage.getItem(STORAGE_KEYS.MODULES)) {
      localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(SEED_MODULES));
    }

    // Initialize Seed Questions
    if (!localStorage.getItem(STORAGE_KEYS.QUESTIONS)) {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(SEED_QUESTIONS));
    }

    // Initialize Seed Trainees
    if (!localStorage.getItem(STORAGE_KEYS.TRAINEES)) {
      localStorage.setItem(STORAGE_KEYS.TRAINEES, JSON.stringify(SEED_TRAINEES));
    }

    // Initialize Seed Certificates
    if (!localStorage.getItem(STORAGE_KEYS.CERTIFICATES)) {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(SEED_CERTIFICATES));
    }

    // Initialize Seed Progress
    if (!localStorage.getItem(STORAGE_KEYS.PROGRESS)) {
      const initialProgress: Progress[] = [
        {
          id: 'prog_01',
          userId: 'trainee_01',
          moduleId: 'ppe-safety',
          progressPercentage: 100,
          bestScore: 100,
          attempts: 1,
          completed: true,
          lastAccessedAt: new Date().toISOString()
        },
        {
          id: 'prog_02',
          userId: 'trainee_01',
          moduleId: 'electrical-safety',
          progressPercentage: 50,
          bestScore: 60,
          attempts: 1,
          completed: false,
          lastAccessedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(initialProgress));
    }
  }

  // Language
  getLanguage(): Language {
    return this.currentLanguage;
  }

  setLanguage(lang: Language) {
    this.currentLanguage = lang;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    }
  }

  // User Auth & Profiles
  getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  setCurrentUser(user: UserProfile | null) {
    this.currentUser = user;
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
  }

  switchDemoUser(role: 'TRAINEE' | 'ADMIN', traineeIndex = 0): UserProfile {
    if (role === 'ADMIN') {
      this.setCurrentUser(DEMO_ADMIN);
      return DEMO_ADMIN;
    } else {
      const trainees = this.getTrainees();
      const trainee = trainees[traineeIndex] || SEED_TRAINEES[0];
      this.setCurrentUser(trainee);
      return trainee;
    }
  }

  getTrainees(): UserProfile[] {
    if (typeof window === 'undefined') return SEED_TRAINEES;
    const data = localStorage.getItem(STORAGE_KEYS.TRAINEES);
    return data ? JSON.parse(data) : SEED_TRAINEES;
  }

  // Modules
  getModules(): SafetyModule[] {
    if (typeof window === 'undefined') return SEED_MODULES;
    const data = localStorage.getItem(STORAGE_KEYS.MODULES);
    return data ? JSON.parse(data) : SEED_MODULES;
  }

  getModuleById(id: string): SafetyModule | undefined {
    return this.getModules().find(m => m.id === id);
  }

  // Questions
  getQuestions(moduleId?: string): Question[] {
    if (typeof window === 'undefined') return SEED_QUESTIONS;
    const data = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    const questions: Question[] = data ? JSON.parse(data) : SEED_QUESTIONS;
    if (moduleId) {
      return questions.filter(q => q.moduleId === moduleId && q.published);
    }
    return questions;
  }

  // Attempts & Score Recording
  getAttempts(userId?: string): Attempt[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    const attempts: Attempt[] = data ? JSON.parse(data) : [];
    if (userId) {
      return attempts.filter(a => a.userId === userId);
    }
    return attempts;
  }

  saveAttempt(attempt: Omit<Attempt, 'id'>): { attempt: Attempt; certificate?: Certificate } {
    const attempts = this.getAttempts();
    const newAttempt: Attempt = {
      ...attempt,
      id: `att_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
    };

    let generatedCert: Certificate | undefined;

    // If score >= 70, generate official Certificate!
    if (newAttempt.score >= 70) {
      generatedCert = this.generateCertificate(
        newAttempt.userId,
        newAttempt.userName,
        newAttempt.moduleId,
        newAttempt.moduleTitle,
        newAttempt.score,
        newAttempt.performanceLevel
      );
      newAttempt.certificateId = generatedCert.certificateId;
    }

    attempts.unshift(newAttempt);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
    }

    // Update progress
    this.updateProgress(newAttempt.userId, newAttempt.moduleId, newAttempt.score);

    return { attempt: newAttempt, certificate: generatedCert };
  }

  // Progress
  getUserProgress(userId: string): Progress[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    const allProgress: Progress[] = data ? JSON.parse(data) : [];
    return allProgress.filter(p => p.userId === userId);
  }

  updateProgress(userId: string, moduleId: string, score: number) {
    if (typeof window === 'undefined') return;
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    const allProgress: Progress[] = data ? JSON.parse(data) : [];
    const index = allProgress.findIndex(p => p.userId === userId && p.moduleId === moduleId);

    if (index >= 0) {
      const existing = allProgress[index];
      allProgress[index] = {
        ...existing,
        attempts: existing.attempts + 1,
        bestScore: Math.max(existing.bestScore, score),
        completed: existing.completed || score >= 70,
        progressPercentage: score >= 70 ? 100 : Math.max(existing.progressPercentage, 75),
        lastAccessedAt: new Date().toISOString()
      };
    } else {
      allProgress.push({
        id: `prog_${Date.now()}`,
        userId,
        moduleId,
        attempts: 1,
        bestScore: score,
        completed: score >= 70,
        progressPercentage: score >= 70 ? 100 : 75,
        lastAccessedAt: new Date().toISOString()
      });
    }

    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProgress));
  }

  // Certificates
  getCertificates(userId?: string): Certificate[] {
    if (typeof window === 'undefined') return SEED_CERTIFICATES;
    const data = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
    const certificates: Certificate[] = data ? JSON.parse(data) : SEED_CERTIFICATES;
    if (userId) {
      return certificates.filter(c => c.userId === userId);
    }
    return certificates;
  }

  getCertificateById(certificateId: string): Certificate | undefined {
    const certs = this.getCertificates();
    const cleanId = certificateId.trim().toUpperCase();
    return certs.find(c => c.certificateId.toUpperCase() === cleanId);
  }

  generateCertificate(
    userId: string, 
    userName: string, 
    moduleId: string, 
    moduleName: string, 
    score: number,
    performanceLevel: Attempt['performanceLevel']
  ): Certificate {
    const certs = this.getCertificates();
    // Unique ID: MSAR-2026-XXXXXX
    const count = certs.length + 101;
    const certificateId = `MSAR-2026-${count.toString().padStart(6, '0')}`;
    const randCode = Math.floor(100000 + Math.random() * 900000);
    const prefix = moduleId.split('-')[0].toUpperCase().slice(0, 3);
    const verificationCode = `VERIF-${prefix}-${randCode}`;

    const newCert: Certificate = {
      id: `cert_${Date.now()}`,
      certificateId,
      userId,
      userName,
      moduleId,
      moduleName,
      score,
      performanceLevel,
      issueDate: new Date().toISOString().split('T')[0],
      verificationCode,
      status: 'VERIFIED',
      issuer: 'MineSafe AR Certification Authority',
      stateDept: 'Department of Higher & Technical Education, Govt of Jharkhand'
    };

    certs.unshift(newCert);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certs));
    }
    return newCert;
  }

  // AI Feedback
  saveAIFeedback(feedback: AIFeedback) {
    if (typeof window === 'undefined') return;
    const data = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
    const all: AIFeedback[] = data ? JSON.parse(data) : [];
    all.unshift(feedback);
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(all));
  }

  getAIFeedback(attemptId: string): AIFeedback | undefined {
    if (typeof window === 'undefined') return undefined;
    const data = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
    const all: AIFeedback[] = data ? JSON.parse(data) : [];
    return all.find(f => f.attemptId === attemptId);
  }

  // AI Question Drafts (Admin)
  getQuestionDrafts(): AIQuestionDraft[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.QUESTION_DRAFTS);
    return data ? JSON.parse(data) : [];
  }

  saveQuestionDraft(draft: Omit<AIQuestionDraft, 'id' | 'createdAt'>): AIQuestionDraft {
    const drafts = this.getQuestionDrafts();
    const newDraft: AIQuestionDraft = {
      ...draft,
      id: `draft_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    drafts.unshift(newDraft);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.QUESTION_DRAFTS, JSON.stringify(drafts));
    }
    return newDraft;
  }

  publishQuestionDraft(draftId: string) {
    const drafts = this.getQuestionDrafts();
    const draft = drafts.find(d => d.id === draftId);
    if (!draft) return;

    // Convert draft to published question
    const questions = this.getQuestions();
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      moduleId: draft.moduleId,
      question: draft.question,
      questionHindi: draft.questionHindi,
      options: draft.options,
      optionsHindi: draft.optionsHindi,
      correctAnswer: draft.correctAnswer,
      explanation: draft.explanation,
      explanationHindi: draft.explanationHindi,
      difficulty: draft.difficulty,
      topic: draft.topic,
      published: true
    };
    questions.push(newQuestion);
    draft.status = 'APPROVED';

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
      localStorage.setItem(STORAGE_KEYS.QUESTION_DRAFTS, JSON.stringify(drafts));
    }
  }

  // Analytics Computation
  getAdminAnalytics(): AdminAnalytics {
    const trainees = this.getTrainees();
    const attempts = this.getAttempts();
    const certs = this.getCertificates();

    if (attempts.length === 0) {
      return INITIAL_ANALYTICS;
    }

    const totalTrainees = trainees.length;
    const trainingCompletions = attempts.length;
    const totalScore = attempts.reduce((sum, a) => sum + a.score, 0);
    const averageScore = Math.round((totalScore / attempts.length) * 10) / 10;
    const passedAttempts = attempts.filter(a => a.score >= 70).length;
    const passRate = Math.round((passedAttempts / attempts.length) * 1000) / 10;
    const certificatesIssued = certs.length;

    // Module stats
    const modules = this.getModules();
    const moduleStats = modules.map(m => {
      const modAttempts = attempts.filter(a => a.moduleId === m.id);
      const modAvg = modAttempts.length > 0 
        ? Math.round((modAttempts.reduce((s, a) => s + a.score, 0) / modAttempts.length) * 10) / 10 
        : 75;
      const modPassed = modAttempts.filter(a => a.score >= 70).length;
      const compRate = modAttempts.length > 0 ? Math.round((modPassed / modAttempts.length) * 100) : 70;
      return {
        id: m.id,
        title: m.title.split('(')[0].trim(),
        avgScore: modAvg,
        completionRate: compRate,
        totalAttempts: modAttempts.length
      };
    });

    return {
      totalTrainees,
      trainingCompletions,
      averageScore,
      passRate,
      certificatesIssued,
      moduleStats,
      weakTopicFrequencies: INITIAL_ANALYTICS.weakTopicFrequencies,
      scoreDistribution: INITIAL_ANALYTICS.scoreDistribution,
      recentActivity: attempts.slice(0, 8).map(a => ({
        id: a.id,
        userName: a.userName,
        moduleName: a.moduleTitle,
        score: a.score,
        status: a.score >= 70 ? 'Passed' : 'Failed',
        date: a.completedAt.split('T')[0]
      }))
    };
  }
}

export const storage = new StorageManager();
