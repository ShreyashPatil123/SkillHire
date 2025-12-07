import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Input, Textarea, Select } from '../components/ui/Input';
import Badge from '../components/ui/Badge';

type Step = 'type' | 'basic' | 'verification' | 'skills' | 'complete';

export default function Signup() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { register } = useAuth();

    const initialType = searchParams.get('type') as 'student' | 'startup' | null;
    const [userType, setUserType] = useState<'student' | 'startup' | null>(initialType);
    const [step, setStep] = useState<Step>(initialType ? 'basic' : 'type');
    const [loading, setLoading] = useState(false);

    // Form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        // Student fields
        university: '',
        major: '',
        graduationYear: '2025',
        learningGoals: [] as string[],
        githubUrl: '',
        linkedInUrl: '',
        // Startup fields
        companyName: '',
        companyWebsite: '',
        linkedInProfile: '',
        industry: '',
        teamSize: '1-2',
        mentorshipPhilosophy: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGoalToggle = (goal: string) => {
        setFormData(prev => ({
            ...prev,
            learningGoals: prev.learningGoals.includes(goal)
                ? prev.learningGoals.filter(g => g !== goal)
                : [...prev.learningGoals, goal]
        }));
    };

    const handleTypeSelect = (type: 'student' | 'startup') => {
        setUserType(type);
        setStep('basic');
    };

    const handleSubmit = async () => {
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (userType === 'student') {
            register({
                userType: 'student',
                name: formData.name,
                email: formData.email,
                eduEmail: formData.email,
                university: formData.university,
                major: formData.major,
                graduationYear: parseInt(formData.graduationYear),
                learningGoals: formData.learningGoals,
                portfolioLinks: [
                    ...(formData.githubUrl ? [{ type: 'github' as const, url: formData.githubUrl, verified: false }] : []),
                    ...(formData.linkedInUrl ? [{ type: 'linkedin' as const, url: formData.linkedInUrl, verified: false }] : []),
                ],
            });
        } else {
            register({
                userType: 'startup',
                name: formData.name,
                email: formData.email,
                companyName: formData.companyName,
                companyWebsite: formData.companyWebsite,
                linkedInProfile: formData.linkedInProfile,
                industry: formData.industry,
                teamSize: formData.teamSize,
                mentorshipPhilosophy: formData.mentorshipPhilosophy,
            });
        }

        setStep('complete');
        setLoading(false);
    };

    const renderTypeSelection = () => (
        <div className="text-center">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Join SkillHire</h1>
            <p className="text-gray-600 mb-10">Choose how you want to use SkillHire</p>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Card
                    variant="hover"
                    className="cursor-pointer border-2 border-transparent hover:border-primary-500"
                    onClick={() => handleTypeSelect('student')}
                >
                    <div className="text-center py-4">
                        <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Student</h3>
                        <p className="text-gray-600 text-sm">
                            Looking for experience, mentorship, and portfolio projects
                        </p>
                        <Badge variant="skill" className="mt-4">Free to join</Badge>
                    </div>
                </Card>

                <Card
                    variant="hover"
                    className="cursor-pointer border-2 border-transparent hover:border-verify-500"
                    onClick={() => handleTypeSelect('startup')}
                >
                    <div className="text-center py-4">
                        <div className="w-16 h-16 bg-verify-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-verify-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Startup</h3>
                        <p className="text-gray-600 text-sm">
                            Looking for talented students for projects and roles
                        </p>
                        <Badge variant="verified" className="mt-4">Post projects free</Badge>
                    </div>
                </Card>
            </div>

            <p className="mt-10 text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 font-medium hover:underline">Log in</Link>
            </p>
        </div>
    );

    const renderStudentBasic = () => (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your profile</h2>
            <p className="text-gray-600 mb-8">Let's start with the basics</p>

            <div className="space-y-5">
                <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@university.edu"
                    helperText="Use your .edu email for instant verification"
                    required
                />
                <Input
                    label="University"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    placeholder="e.g., Stanford University"
                    required
                />
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Major"
                        name="major"
                        value={formData.major}
                        onChange={handleInputChange}
                        placeholder="e.g., Computer Science"
                    />
                    <Select
                        label="Graduation Year"
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleInputChange}
                        options={[
                            { value: '2025', label: '2025' },
                            { value: '2026', label: '2026' },
                            { value: '2027', label: '2027' },
                            { value: '2028', label: '2028' },
                        ]}
                    />
                </div>
            </div>

            <div className="mt-8 flex gap-4">
                <Button variant="ghost" onClick={() => setStep('type')}>Back</Button>
                <Button
                    onClick={() => setStep('verification')}
                    disabled={!formData.name || !formData.email || !formData.university}
                    className="flex-1"
                >
                    Continue
                </Button>
            </div>
        </div>
    );

    const renderStudentVerification = () => (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your identity</h2>
            <p className="text-gray-600 mb-8">This helps us maintain a trusted community</p>

            <div className="space-y-6">
                <Card className={formData.email.endsWith('.edu') ? 'border-2 border-verify-500 bg-verify-50' : ''}>
                    <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${formData.email.endsWith('.edu') ? 'bg-verify-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                            {formData.email.endsWith('.edu') ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">.edu Email Verification</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                {formData.email.endsWith('.edu')
                                    ? `We'll send a verification link to ${formData.email}`
                                    : 'Use your university email ending in .edu'}
                            </p>
                            {formData.email.endsWith('.edu') && (
                                <Badge variant="verified" className="mt-3">Auto-verified</Badge>
                            )}
                        </div>
                    </div>
                </Card>

                <div className="text-center text-sm text-gray-500">or</div>

                <Card>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">Student ID Upload</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Upload your student ID for manual verification (takes 24-48 hours)
                            </p>
                            <Button variant="secondary" size="sm" className="mt-3">
                                Upload ID
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mt-8 flex gap-4">
                <Button variant="ghost" onClick={() => setStep('basic')}>Back</Button>
                <Button onClick={() => setStep('skills')} className="flex-1">
                    Continue
                </Button>
            </div>
        </div>
    );

    const renderStudentSkills = () => {
        const goals = [
            'Machine Learning', 'Web Development', 'Mobile Development', 'UI/UX Design',
            'Data Science', 'Cloud Computing', 'DevOps', 'Product Management',
            'Marketing', 'Content Writing', 'Video Production', 'Business Development'
        ];

        return (
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">What do you want to learn?</h2>
                <p className="text-gray-600 mb-8">Select your learning goals to get matched with relevant projects</p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {goals.map(goal => (
                        <button
                            key={goal}
                            onClick={() => handleGoalToggle(goal)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.learningGoals.includes(goal)
                                    ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {goal}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    <Input
                        label="GitHub Profile (optional)"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleInputChange}
                        placeholder="https://github.com/yourusername"
                        icon={
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        }
                    />
                    <Input
                        label="LinkedIn Profile (optional)"
                        name="linkedInUrl"
                        value={formData.linkedInUrl}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/yourprofile"
                        icon={
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        }
                    />
                </div>

                <div className="mt-8 flex gap-4">
                    <Button variant="ghost" onClick={() => setStep('verification')}>Back</Button>
                    <Button
                        onClick={handleSubmit}
                        loading={loading}
                        disabled={formData.learningGoals.length === 0}
                        className="flex-1"
                    >
                        Create Account
                    </Button>
                </div>
            </div>
        );
    };

    const renderStartupBasic = () => (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your startup</h2>
            <p className="text-gray-600 mb-8">Help students understand your company</p>

            <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Founder name"
                        required
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@company.com"
                        required
                    />
                </div>
                <Input
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Your startup name"
                    required
                />
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Company Website"
                        name="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleInputChange}
                        placeholder="https://yourcompany.com"
                    />
                    <Select
                        label="Industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        options={[
                            { value: '', label: 'Select industry' },
                            { value: 'SaaS', label: 'SaaS' },
                            { value: 'E-commerce', label: 'E-commerce' },
                            { value: 'FinTech', label: 'FinTech' },
                            { value: 'HealthTech', label: 'HealthTech' },
                            { value: 'EdTech', label: 'EdTech' },
                            { value: 'AI/ML', label: 'AI/ML' },
                            { value: 'Other', label: 'Other' },
                        ]}
                        required
                    />
                </div>
                <Select
                    label="Team Size"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    options={[
                        { value: '1-2', label: '1-2 people' },
                        { value: '2-5', label: '2-5 people' },
                        { value: '5-10', label: '5-10 people' },
                        { value: '10-20', label: '10-20 people' },
                        { value: '20+', label: '20+ people' },
                    ]}
                />
            </div>

            <div className="mt-8 flex gap-4">
                <Button variant="ghost" onClick={() => setStep('type')}>Back</Button>
                <Button
                    onClick={() => setStep('verification')}
                    disabled={!formData.name || !formData.email || !formData.companyName}
                    className="flex-1"
                >
                    Continue
                </Button>
            </div>
        </div>
    );

    const renderStartupVerification = () => (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your startup</h2>
            <p className="text-gray-600 mb-8">This builds trust with students</p>

            <div className="space-y-5">
                <Input
                    label="Your LinkedIn Profile"
                    name="linkedInProfile"
                    value={formData.linkedInProfile}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    helperText="Required for verification"
                    required
                    icon={
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    }
                />

                <Textarea
                    label="Your Mentorship Philosophy"
                    name="mentorshipPhilosophy"
                    value={formData.mentorshipPhilosophy}
                    onChange={handleInputChange}
                    placeholder="What will students learn from working with you? How do you approach mentorship?"
                    rows={4}
                />

                <Card className="bg-amber-50 border border-amber-200">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center text-white">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">$50 Escrow Deposit</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                To post projects, you'll need to deposit $50 (refundable). This proves your intent and protects students.
                            </p>
                            <p className="text-xs text-amber-700 mt-2">You can add this after creating your account</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mt-8 flex gap-4">
                <Button variant="ghost" onClick={() => setStep('basic')}>Back</Button>
                <Button
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={!formData.linkedInProfile}
                    className="flex-1"
                >
                    Create Account
                </Button>
            </div>
        </div>
    );

    const renderComplete = () => (
        <div className="text-center py-8">
            <div className="w-20 h-20 bg-verify-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-verify-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to SkillHire!</h2>
            <p className="text-gray-600 mb-8">
                Your account has been created. {userType === 'student'
                    ? "Let's verify your skills and find you some great projects!"
                    : "You can now post projects and find talented students."}
            </p>

            <div className="space-y-4">
                <Button onClick={() => navigate('/dashboard')} className="w-full">
                    Go to Dashboard
                </Button>
                {userType === 'student' && (
                    <Button variant="secondary" onClick={() => navigate('/projects')} className="w-full">
                        Browse Projects
                    </Button>
                )}
            </div>
        </div>
    );

    const renderStep = () => {
        if (step === 'type') return renderTypeSelection();
        if (step === 'complete') return renderComplete();

        if (userType === 'student') {
            if (step === 'basic') return renderStudentBasic();
            if (step === 'verification') return renderStudentVerification();
            if (step === 'skills') return renderStudentSkills();
        } else {
            if (step === 'basic') return renderStartupBasic();
            if (step === 'verification') return renderStartupVerification();
        }

        return null;
    };

    const steps = userType === 'student'
        ? ['Basic Info', 'Verification', 'Skills']
        : ['Company Info', 'Verification'];

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-lg">
                {step !== 'type' && step !== 'complete' && (
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            {steps.map((s, i) => (
                                <div key={s} className="flex items-center">
                                    <div className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${i < steps.indexOf(step === 'skills' ? 'Skills' : step === 'verification' ? 'Verification' : 'Basic Info')
                                                ? 'bg-verify-500 text-white'
                                                : step === s.toLowerCase().replace(' ', '') ||
                                                    (step === 'basic' && s.includes('Info')) ||
                                                    (step === 'skills' && s === 'Skills')
                                                    ? 'bg-primary-500 text-white'
                                                    : 'bg-gray-200 text-gray-500'
                                            }`}>
                                            {i < steps.indexOf(step === 'skills' ? 'Skills' : step === 'verification' ? 'Verification' : step === 'basic' ? (userType === 'student' ? 'Basic Info' : 'Company Info') : '') ? (
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            ) : i + 1}
                                        </div>
                                        <span className="ml-2 text-sm font-medium text-gray-600 hidden sm:block">{s}</span>
                                    </div>
                                    {i < steps.length - 1 && <div className="flex-1 h-0.5 bg-gray-200 mx-4" />}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <Card className="shadow-xl">
                    {renderStep()}
                </Card>
            </div>
        </div>
    );
}
