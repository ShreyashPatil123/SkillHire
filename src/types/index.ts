// User Types
export type UserType = 'student' | 'startup';

export interface User {
    id: string;
    email: string;
    name: string;
    userType: UserType;
    avatar?: string;
    createdAt: Date;
    trustScore: number;
    verificationLevel: 1 | 2;
}

export interface Student extends User {
    userType: 'student';
    eduEmail?: string;
    studentIdVerified: boolean;
    university?: string;
    major?: string;
    graduationYear?: number;
    skills: Skill[];
    learningGoals: string[];
    portfolioLinks: PortfolioLink[];
    endorsements: Endorsement[];
    completedProjects: number;
    earnings: number;
    proBadge: boolean;
}

export interface Startup extends User {
    userType: 'startup';
    companyName: string;
    companyWebsite?: string;
    linkedInProfile: string;
    companyLinkedIn?: string;
    industry: string;
    teamSize: string;
    escrowDeposit: number;
    mentorshipPhilosophy?: string;
    projectsPosted: number;
    hiresMade: number;
}

// Skills & Verification
export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    level: 'beginner' | 'intermediate' | 'advanced';
    verified: boolean;
    testScore?: number;
}

export type SkillCategory =
    | 'programming'
    | 'design'
    | 'marketing'
    | 'data'
    | 'writing'
    | 'video'
    | 'business'
    | 'other';

export interface PortfolioLink {
    type: 'github' | 'behance' | 'dribbble' | 'linkedin' | 'website' | 'other';
    url: string;
    verified: boolean;
}

export interface Endorsement {
    id: string;
    fromName: string;
    fromRole: 'professor' | 'peer' | 'employer';
    fromEmail?: string;
    message: string;
    skillId?: string;
    verified: boolean;
    createdAt: Date;
}

// Projects
export interface Project {
    id: string;
    startupId: string;
    title: string;
    description: string;
    type: 'micro-internship' | 'project-gig';
    status: ProjectStatus;
    skills: string[];
    mentorshipOffer: string;
    deliverables: string[];
    duration: string;
    compensation: number;
    escrowFunded: boolean;
    createdAt: Date;
    deadline?: Date;
    applicants: Application[];
    selectedStudentId?: string;
    milestones: Milestone[];
}

export type ProjectStatus =
    | 'draft'
    | 'open'
    | 'in-progress'
    | 'mid-check'
    | 'completed'
    | 'cancelled';

export interface Application {
    id: string;
    studentId: string;
    projectId: string;
    videoPitchUrl?: string;
    coverLetter: string;
    matchScore: number;
    status: 'pending' | 'accepted' | 'rejected';
    appliedAt: Date;
}

// Milestones & Payment
export interface Milestone {
    id: string;
    projectId: string;
    title: string;
    description: string;
    order: number;
    status: MilestoneStatus;
    submission?: string;
    feedback?: MilestoneFeedback;
    dueDate?: Date;
    completedAt?: Date;
}

export type MilestoneStatus =
    | 'pending'
    | 'in-progress'
    | 'submitted'
    | 'needs-revision'
    | 'approved'
    | 'completed';

export interface MilestoneFeedback {
    rating: 1 | 2 | 3 | 4 | 5;
    comment: string;
    detailed: boolean; // System enforces detailed feedback
    submittedAt: Date;
}

export interface EscrowTransaction {
    id: string;
    projectId: string;
    amount: number;
    status: 'locked' | 'released' | 'refunded' | 'disputed';
    lockedAt: Date;
    releasedAt?: Date;
}

// Trust Scores
export interface TrustScoreBreakdown {
    baseScore: number;
    verificationBonus: number;
    deadlinesMet: number;
    skillTestBonus: number;
    endorsementBonus: number;
    qualityBonus: number;
    penalties: number;
    total: number;
}

// Certificates
export interface Certificate {
    id: string;
    studentId: string;
    projectId: string;
    projectTitle: string;
    startupName: string;
    skills: string[];
    completedAt: Date;
    hoursWorked?: number;
    testimonial?: string;
}

// Notifications
export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    read: boolean;
    createdAt: Date;
    actionUrl?: string;
}

export type NotificationType =
    | 'application'
    | 'milestone'
    | 'payment'
    | 'verification'
    | 'match'
    | 'feedback'
    | 'system';
