import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState<'student' | 'startup'>('student');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const success = login(email, userType);

        if (success) {
            navigate('/dashboard');
        } else {
            setError('No account found with this email. Try one of the demo accounts below.');
        }

        setLoading(false);
    };

    const demoAccounts = {
        student: [
            { email: 'alex.chen@stanford.edu', name: 'Alex Chen', score: 87 },
            { email: 'maya.patel@mit.edu', name: 'Maya Patel', score: 72 },
            { email: 'sophia.martinez@ucla.edu', name: 'Sophia Martinez', score: 94 },
        ],
        startup: [
            { email: 'founders@techflow.io', name: 'TechFlow', score: 92 },
            { email: 'hello@greenvibe.co', name: 'GreenVibe', score: 85 },
            { email: 'ceo@aimedix.health', name: 'AIMedix', score: 78 },
        ],
    };

    const handleDemoLogin = async (demoEmail: string) => {
        setEmail(demoEmail);
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 300));
        const success = login(demoEmail, userType);
        if (success) navigate('/dashboard');
        setLoading(false);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Welcome back</h1>
                    <p className="text-gray-600">Log in to your SkillHire account</p>
                </div>

                <Card className="shadow-xl">
                    {/* User Type Toggle */}
                    <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                        <button
                            onClick={() => setUserType('student')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${userType === 'student'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Student
                        </button>
                        <button
                            onClick={() => setUserType('startup')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${userType === 'startup'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Startup
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={userType === 'student' ? 'your.email@university.edu' : 'you@company.com'}
                            error={error}
                            required
                        />

                        <Button type="submit" loading={loading} className="w-full mt-6">
                            Log in
                        </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <p className="text-sm text-gray-500 text-center mb-4">Or try a demo account:</p>
                        <div className="space-y-2">
                            {demoAccounts[userType].map((account) => (
                                <button
                                    key={account.email}
                                    onClick={() => handleDemoLogin(account.email)}
                                    className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all text-left"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900">{account.name}</p>
                                        <p className="text-sm text-gray-500">{account.email}</p>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${account.score >= 80 ? 'bg-verify-100 text-verify-600' :
                                            account.score >= 60 ? 'bg-amber-100 text-amber-600' :
                                                'bg-red-100 text-red-600'
                                        }`}>
                                        {account.score}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary-600 font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </Card>
            </div>
        </div>
    );
}
