import { createContext, useContext, useState, ReactNode } from 'react';
import { Project, Application, Milestone, Notification, Certificate, EscrowTransaction } from '../types';
import { mockProjects, mockCertificates, mockEscrowTransactions } from '../data/mockProjects';
import { mockStudents, mockStartups } from '../data/mockUsers';

interface AppContextType {
    // Projects
    projects: Project[];
    getProject: (id: string) => Project | undefined;
    getOpenProjects: () => Project[];
    getStartupProjects: (startupId: string) => Project[];
    getStudentProjects: (studentId: string) => Project[];
    createProject: (project: Omit<Project, 'id' | 'createdAt' | 'applicants' | 'milestones'>) => Project;
    updateProject: (id: string, updates: Partial<Project>) => void;

    // Applications
    applyToProject: (projectId: string, studentId: string, application: Omit<Application, 'id' | 'projectId' | 'studentId' | 'appliedAt' | 'status'>) => void;
    acceptApplication: (projectId: string, applicationId: string) => void;
    rejectApplication: (projectId: string, applicationId: string) => void;

    // Milestones
    updateMilestone: (projectId: string, milestoneId: string, updates: Partial<Milestone>) => void;
    submitMilestone: (projectId: string, milestoneId: string, submission: string) => void;
    approveMilestone: (projectId: string, milestoneId: string, feedback: { rating: 1 | 2 | 3 | 4 | 5; comment: string }) => void;

    // Matching
    getMatchScore: (studentId: string, projectId: string) => number;
    getRecommendedProjects: (studentId: string) => Project[];
    getRecommendedStudents: (projectId: string) => typeof mockStudents;

    // Certificates
    certificates: Certificate[];
    generateCertificate: (projectId: string) => Certificate;

    // Escrow
    escrowTransactions: EscrowTransaction[];
    fundEscrow: (projectId: string, amount: number) => void;
    releaseEscrow: (projectId: string) => void;

    // Notifications
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
    markAsRead: (notificationId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);
    const [escrowTransactions, setEscrowTransactions] = useState<EscrowTransaction[]>(mockEscrowTransactions);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // Projects
    const getProject = (id: string) => projects.find(p => p.id === id);
    const getOpenProjects = () => projects.filter(p => p.status === 'open');
    const getStartupProjects = (startupId: string) => projects.filter(p => p.startupId === startupId);
    const getStudentProjects = (studentId: string) => projects.filter(p => p.selectedStudentId === studentId);

    const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'applicants' | 'milestones'>) => {
        const newProject: Project = {
            ...projectData,
            id: `proj-${Date.now()}`,
            createdAt: new Date(),
            applicants: [],
            milestones: [
                { id: `m-${Date.now()}-1`, projectId: '', title: 'Kickoff', description: 'Project kickoff and initial planning', order: 1, status: 'pending' },
                { id: `m-${Date.now()}-2`, projectId: '', title: 'Mid-Point', description: 'Mid-project checkpoint and review', order: 2, status: 'pending' },
                { id: `m-${Date.now()}-3`, projectId: '', title: 'Completion', description: 'Final delivery and handoff', order: 3, status: 'pending' },
            ],
        };
        newProject.milestones.forEach(m => m.projectId = newProject.id);
        setProjects(prev => [...prev, newProject]);
        return newProject;
    };

    const updateProject = (id: string, updates: Partial<Project>) => {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    // Applications
    const applyToProject = (projectId: string, studentId: string, applicationData: Omit<Application, 'id' | 'projectId' | 'studentId' | 'appliedAt' | 'status' | 'matchScore'>) => {
        const matchScore = getMatchScore(studentId, projectId);
        const application: Application = {
            id: `app-${Date.now()}`,
            projectId,
            studentId,
            appliedAt: new Date(),
            status: 'pending',
            ...applicationData,
            matchScore,
        };
        setProjects(prev => prev.map(p =>
            p.id === projectId ? { ...p, applicants: [...p.applicants, application] } : p
        ));
    };

    const acceptApplication = (projectId: string, applicationId: string) => {
        setProjects(prev => prev.map(p => {
            if (p.id !== projectId) return p;
            const application = p.applicants.find(a => a.id === applicationId);
            if (!application) return p;
            return {
                ...p,
                status: 'in-progress',
                selectedStudentId: application.studentId,
                applicants: p.applicants.map(a => ({
                    ...a,
                    status: a.id === applicationId ? 'accepted' : 'rejected'
                })),
                milestones: p.milestones.map((m, i) => i === 0 ? { ...m, status: 'in-progress' } : m),
            };
        }));
    };

    const rejectApplication = (projectId: string, applicationId: string) => {
        setProjects(prev => prev.map(p =>
            p.id === projectId ? {
                ...p,
                applicants: p.applicants.map(a => a.id === applicationId ? { ...a, status: 'rejected' } : a)
            } : p
        ));
    };

    // Milestones
    const updateMilestone = (projectId: string, milestoneId: string, updates: Partial<Milestone>) => {
        setProjects(prev => prev.map(p =>
            p.id === projectId ? {
                ...p,
                milestones: p.milestones.map(m => m.id === milestoneId ? { ...m, ...updates } : m)
            } : p
        ));
    };

    const submitMilestone = (projectId: string, milestoneId: string, submission: string) => {
        updateMilestone(projectId, milestoneId, { status: 'submitted', submission });
    };

    const approveMilestone = (projectId: string, milestoneId: string, feedback: { rating: 1 | 2 | 3 | 4 | 5; comment: string }) => {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        const milestoneIndex = project.milestones.findIndex(m => m.id === milestoneId);
        const isLastMilestone = milestoneIndex === project.milestones.length - 1;

        updateMilestone(projectId, milestoneId, {
            status: 'completed',
            completedAt: new Date(),
            feedback: {
                rating: feedback.rating,
                comment: feedback.comment,
                detailed: feedback.comment.length >= 50,
                submittedAt: new Date(),
            }
        });

        // Start next milestone or complete project
        if (!isLastMilestone) {
            const nextMilestone = project.milestones[milestoneIndex + 1];
            updateMilestone(projectId, nextMilestone.id, { status: 'in-progress' });
        } else {
            updateProject(projectId, { status: 'completed' });
            releaseEscrow(projectId);
        }
    };

    // Matching Algorithm
    const getMatchScore = (studentId: string, projectId: string): number => {
        const student = mockStudents.find(s => s.id === studentId);
        const project = projects.find(p => p.id === projectId);
        if (!student || !project) return 0;

        let score = 0;
        const studentSkillNames = student.skills.map(s => s.name.toLowerCase());
        const projectSkills = project.skills.map(s => s.toLowerCase());

        // Skill match (up to 50 points)
        const matchedSkills = projectSkills.filter(ps =>
            studentSkillNames.some(ss => ss.includes(ps) || ps.includes(ss))
        );
        score += Math.min(50, (matchedSkills.length / projectSkills.length) * 50);

        // Learning goal alignment (up to 20 points)
        const learningMatch = student.learningGoals.some(goal =>
            project.mentorshipOffer.toLowerCase().includes(goal.toLowerCase()) ||
            project.skills.some(s => goal.toLowerCase().includes(s.toLowerCase()))
        );
        if (learningMatch) score += 20;

        // Verification bonus (up to 15 points)
        score += student.verificationLevel * 7.5;

        // Trust score bonus (up to 15 points)
        score += (student.trustScore / 100) * 15;

        return Math.round(score);
    };

    const getRecommendedProjects = (studentId: string): Project[] => {
        const openProjects = getOpenProjects();
        return openProjects
            .map(project => ({ project, score: getMatchScore(studentId, project.id) }))
            .sort((a, b) => b.score - a.score)
            .map(item => item.project);
    };

    const getRecommendedStudents = (projectId: string) => {
        return [...mockStudents]
            .map(student => ({ student, score: getMatchScore(student.id, projectId) }))
            .sort((a, b) => b.score - a.score)
            .map(item => item.student);
    };

    // Certificates
    const generateCertificate = (projectId: string): Certificate => {
        const project = projects.find(p => p.id === projectId);
        const startup = mockStartups.find(s => s.id === project?.startupId);

        const certificate: Certificate = {
            id: `cert-${Date.now()}`,
            studentId: project?.selectedStudentId || '',
            projectId,
            projectTitle: project?.title || '',
            startupName: startup?.companyName || '',
            skills: project?.skills || [],
            completedAt: new Date(),
            hoursWorked: parseInt(project?.duration || '0') * 15,
        };
        setCertificates(prev => [...prev, certificate]);
        return certificate;
    };

    // Escrow
    const fundEscrow = (projectId: string, amount: number) => {
        const transaction: EscrowTransaction = {
            id: `esc-${Date.now()}`,
            projectId,
            amount,
            status: 'locked',
            lockedAt: new Date(),
        };
        setEscrowTransactions(prev => [...prev, transaction]);
        updateProject(projectId, { escrowFunded: true });
    };

    const releaseEscrow = (projectId: string) => {
        setEscrowTransactions(prev => prev.map(t =>
            t.projectId === projectId ? { ...t, status: 'released', releasedAt: new Date() } : t
        ));
    };

    // Notifications
    const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
        const newNotification: Notification = {
            ...notification,
            id: `notif-${Date.now()}`,
            createdAt: new Date(),
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const markAsRead = (notificationId: string) => {
        setNotifications(prev => prev.map(n =>
            n.id === notificationId ? { ...n, read: true } : n
        ));
    };

    return (
        <AppContext.Provider value={{
            projects,
            getProject,
            getOpenProjects,
            getStartupProjects,
            getStudentProjects,
            createProject,
            updateProject,
            applyToProject,
            acceptApplication,
            rejectApplication,
            updateMilestone,
            submitMilestone,
            approveMilestone,
            getMatchScore,
            getRecommendedProjects,
            getRecommendedStudents,
            certificates,
            generateCertificate,
            escrowTransactions,
            fundEscrow,
            releaseEscrow,
            notifications,
            addNotification,
            markAsRead,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
