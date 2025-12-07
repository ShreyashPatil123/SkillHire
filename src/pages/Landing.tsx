import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function Landing() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-verify-50 -z-10" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-30 animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-verify-200 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-in">
                            <span className="w-2 h-2 bg-verify-500 rounded-full animate-pulse" />
                            Verify-First Marketplace
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-6 animate-in animate-delay-100">
                            Real Skills.<br />
                            <span className="gradient-text">Real Experience.</span><br />
                            Real Growth.
                        </h1>

                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-in animate-delay-200">
                            The verified skill-trading marketplace where students gain real experience and mentorship,
                            while startups discover affordable, ambitious talent.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in animate-delay-300">
                            <Link to="/signup?type=student">
                                <Button size="lg" className="w-full sm:w-auto">
                                    I'm a Student
                                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Button>
                            </Link>
                            <Link to="/signup?type=startup">
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                    I'm a Startup
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-12 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 text-center">
                        <div>
                            <p className="text-3xl font-bold text-gray-900">500+</p>
                            <p className="text-sm text-gray-500">Verified Students</p>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-gray-200" />
                        <div>
                            <p className="text-3xl font-bold text-gray-900">150+</p>
                            <p className="text-sm text-gray-500">Startups</p>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-gray-200" />
                        <div>
                            <p className="text-3xl font-bold text-gray-900">$120K+</p>
                            <p className="text-sm text-gray-500">Paid to Students</p>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-gray-200" />
                        <div>
                            <p className="text-3xl font-bold text-gray-900">95%</p>
                            <p className="text-sm text-gray-500">Success Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                            How SkillHire Works
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            A simple, transparent process designed to build trust and deliver results.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Verify',
                                description: 'Students verify with .edu email or student ID. Startups prove legitimacy with LinkedIn and escrow deposits.',
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                            },
                            {
                                step: '02',
                                title: 'Match',
                                description: 'Our smart algorithm matches students based on skills AND learning goals to projects offering mentorship.',
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                ),
                            },
                            {
                                step: '03',
                                title: 'Deliver',
                                description: 'Work through milestones with guaranteed feedback. Payment is released automatically upon completion.',
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                ),
                            },
                        ].map((item) => (
                            <Card key={item.step} variant="hover" className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mx-auto mb-6">
                                    {item.icon}
                                </div>
                                <span className="text-sm font-bold text-primary-600">STEP {item.step}</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* For Students & Startups */}
            <section className="py-20 lg:py-28 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* For Students */}
                        <Card className="relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="relative">
                                <Badge variant="skill" className="mb-4">For Students</Badge>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Trade Skills for Experience
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Get real-world experience, mentorship from founders, and build a verified portfolio
                                    that stands out to future employers.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        'Verified experience certificates',
                                        'Direct mentorship from startup founders',
                                        'Build a portfolio with real projects',
                                        'Flexible micro-internships',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-verify-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/signup?type=student">
                                    <Button>Join as Student</Button>
                                </Link>
                            </div>
                        </Card>

                        {/* For Startups */}
                        <Card className="relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-verify-100 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="relative">
                                <Badge variant="verified" className="mb-4">For Startups</Badge>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Find Ambitious Talent
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Access verified, motivated students ready to contribute. Our escrow system ensures
                                    commitment from both sides.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        'Pre-verified student skills',
                                        'Secure escrow payment system',
                                        'Smart matching algorithm',
                                        'Only 10% commission on success',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-verify-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/signup?type=startup">
                                    <Button variant="verify">Post a Project</Button>
                                </Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Trust Score Section */}
            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                                Trust Score System
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Every user has a 0-100 Trust Score built through verified actions.
                                It's the foundation of our "Verify-First" philosophy.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-verify-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-verify-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Earn Points</h4>
                                        <p className="text-gray-600 text-sm">Complete projects, meet deadlines, pass skill tests, and get endorsements.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Fair Penalties</h4>
                                        <p className="text-gray-600 text-sm">Ghosting projects, unpaid work, or unfair reviews result in score deductions.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Account Protection</h4>
                                        <p className="text-gray-600 text-sm">Scores below 60 result in account suspension to protect the community.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Card className="w-full max-w-sm">
                                <div className="text-center mb-6">
                                    <div className="w-24 h-24 bg-gradient-to-br from-verify-400 to-verify-600 rounded-full mx-auto flex items-center justify-center mb-4">
                                        <span className="text-4xl font-bold text-white">87</span>
                                    </div>
                                    <h4 className="font-bold text-gray-900">Excellent Trust Score</h4>
                                    <p className="text-sm text-gray-500">Based on verified activity</p>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { label: 'Verification', value: 20, max: 20 },
                                        { label: 'Deadlines Met', value: 18, max: 20 },
                                        { label: 'Skill Tests', value: 15, max: 20 },
                                        { label: 'Quality Work', value: 17, max: 20 },
                                        { label: 'Endorsements', value: 12, max: 15 },
                                        { label: 'Penalties', value: 5, max: 5, isNegative: true },
                                    ].map((item) => (
                                        <div key={item.label}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">{item.label}</span>
                                                <span className={`font-medium ${item.isNegative ? 'text-red-600' : 'text-gray-900'}`}>
                                                    {item.isNegative ? `-${item.max - item.value}` : `+${item.value}`}
                                                </span>
                                            </div>
                                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${item.isNegative ? 'bg-red-400' : 'bg-verify-500'}`}
                                                    style={{ width: `${(item.value / item.max) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-28 bg-gradient-to-r from-primary-600 to-primary-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                        Ready to Build Real Experience?
                    </h2>
                    <p className="text-xl text-primary-100 mb-10">
                        Join SkillHire today and start your journey toward verified skills and meaningful work.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup?type=student">
                            <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-primary-700 hover:bg-primary-50">
                                Get Started Free
                            </Button>
                        </Link>
                        <Link to="/projects">
                            <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white border-2 border-white/30 hover:bg-white/10">
                                Browse Projects
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
