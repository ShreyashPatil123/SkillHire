import { createContext, useContext, useState, ReactNode } from 'react';
import { User, Student, Startup } from '../types';
import { mockStudents, mockStartups } from '../data/mockUsers';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isStudent: boolean;
    isStartup: boolean;
    login: (email: string, userType: 'student' | 'startup') => boolean;
    logout: () => void;
    register: (userData: Partial<Student> | Partial<Startup>) => User;
    updateUser: (updates: Partial<User>) => void;
    getStudent: () => Student | null;
    getStartup: () => Startup | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [students, setStudents] = useState<Student[]>(mockStudents);
    const [startups, setStartups] = useState<Startup[]>(mockStartups);

    const isAuthenticated = user !== null;
    const isStudent = user?.userType === 'student';
    const isStartup = user?.userType === 'startup';

    const login = (email: string, userType: 'student' | 'startup'): boolean => {
        if (userType === 'student') {
            const student = students.find(s => s.email === email);
            if (student) {
                setUser(student);
                return true;
            }
        } else {
            const startup = startups.find(s => s.email === email);
            if (startup) {
                setUser(startup);
                return true;
            }
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    const register = (userData: Partial<Student> | Partial<Startup>): User => {
        const id = `${userData.userType}-${Date.now()}`;

        if (userData.userType === 'student') {
            const newStudent: Student = {
                id,
                email: userData.email || '',
                name: userData.name || '',
                userType: 'student',
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
                createdAt: new Date(),
                trustScore: 30,
                verificationLevel: 1,
                studentIdVerified: false,
                skills: [],
                learningGoals: [],
                portfolioLinks: [],
                endorsements: [],
                completedProjects: 0,
                earnings: 0,
                proBadge: false,
                ...userData as Partial<Student>,
            };
            setStudents(prev => [...prev, newStudent]);
            setUser(newStudent);
            return newStudent;
        } else {
            const newStartup: Startup = {
                id,
                email: userData.email || '',
                name: userData.name || '',
                userType: 'startup',
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
                createdAt: new Date(),
                trustScore: 40,
                verificationLevel: 1,
                companyName: (userData as Partial<Startup>).companyName || '',
                linkedInProfile: (userData as Partial<Startup>).linkedInProfile || '',
                industry: (userData as Partial<Startup>).industry || '',
                teamSize: (userData as Partial<Startup>).teamSize || '1-2',
                escrowDeposit: 0,
                projectsPosted: 0,
                hiresMade: 0,
                ...userData as Partial<Startup>,
            };
            setStartups(prev => [...prev, newStartup]);
            setUser(newStartup);
            return newStartup;
        }
    };

    const updateUser = (updates: Partial<User>) => {
        if (!user) return;

        const updatedUser = { ...user, ...updates };
        setUser(updatedUser as User);

        if (user.userType === 'student') {
            setStudents(prev => prev.map(s => s.id === user.id ? updatedUser as Student : s));
        } else {
            setStartups(prev => prev.map(s => s.id === user.id ? updatedUser as Startup : s));
        }
    };

    const getStudent = (): Student | null => {
        if (isStudent) return user as Student;
        return null;
    };

    const getStartup = (): Startup | null => {
        if (isStartup) return user as Startup;
        return null;
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isStudent,
            isStartup,
            login,
            logout,
            register,
            updateUser,
            getStudent,
            getStartup,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
