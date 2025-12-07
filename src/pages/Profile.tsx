import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge, { VerificationBadge, SkillBadge, ProBadge } from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import TrustScore, { TrustScoreProgress, TrustScoreBreakdown } from '../components/ui/TrustScore';
import { mockStudents, mockStartups } from '../data/mockUsers';

export default function Profile() {
    const { id } = useParams();
    const { user } = useAuth();

    // If no ID provided, show current user's profile
    const profileId = id || user?.id;

    const student = mockStudents.find(s => s.id === profileId);
    const startup = mockStartups.find(s => s.id === profileId);

    if (!student && !startup) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile not found</h1>
                <Link to="/dashboard">
                    <Button>Back to Dashboard</Button>
                </Link>
            </div>
        );
    }

    if (student) {
        return <StudentProfile student={student} isOwnProfile={user?.id === student.id} />;
    }

    if (startup) {
        return <StartupProfile startup={startup} isOwnProfile={user?.id === startup.id} />;
    }

    return null;
}

function StudentProfile({ student, isOwnProfile }: { student: typeof mockStudents[0]; isOwnProfile: boolean }) {
    const { certificates } = useApp();
    const studentCertificates = certificates.filter(c => c.studentId === student.id);

    const trustBreakdown = [
        { category: 'Verification', points: student.verificationLevel === 2 ? 20 : 10, maxPoints: 20 },
        { category: 'Deadlines Met', points: Math.min(student.completedProjects * 4, 20), maxPoints: 20 },
        { category: 'Skill Tests', points: student.skills.filter(s => s.verified).length * 5, maxPoints: 20 },
        { category: 'Quality Work', points: Math.min(student.completedProjects * 3, 20), maxPoints: 20 },
        { category: 'Endorsements', points: Math.min(student.endorsements.length * 5, 15), maxPoints: 15 },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <Card className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <Avatar src={student.avatar} name={student.name} size="xl" verified={student.verificationLevel === 2} />
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                            {student.proBadge && <ProBadge />}
                        </div>
                        <p className="text-gray-600">{student.major} • {student.university}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                            <VerificationBadge level={student.verificationLevel} verified={true} />
                            <Badge variant="level">Class of {student.graduationYear}</Badge>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <TrustScore score={student.trustScore} size="lg" />
                        {isOwnProfile && (
                            <Button variant="secondary" size="sm">Edit Profile</Button>
                        )}
                    </div>
                </div>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Skills */}
                    <Card>
                        <h3 className="font-semibold text-gray-900 mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {student.skills.map(skill => (
                                <SkillBadge
                                    key={skill.id}
                                    name={skill.name}
                                    verified={skill.verified}
                                    score={skill.testScore}
                                />
                            ))}
                        </div>
                    </Card>

                    {/* Learning Goals */}
                    <Card>
                        <h3 className="font-semibold text-gray-900 mb-4">Learning Goals</h3>
                        <div className="flex flex-wrap gap-2">
                            {student.learningGoals.map(goal => (
                                <Badge key={goal} variant="level">{goal}</Badge>
                            ))}
                        </div>
                    </Card>

                    {/* Portfolio */}
                    <Card>
                        <h3 className="font-semibold text-gray-900 mb-4">Portfolio</h3>
                        <div className="space-y-3">
                            {student.portfolioLinks.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
                                >
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        {link.type === 'github' && (
                                            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        )}
                                        {(link.type === 'behance' || link.type === 'dribbble') && (
                                            <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                        {link.type === 'linkedin' && (
                                            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        )}
                                        {link.type === 'website' && (
                                            <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 capitalize">{link.type}</p>
                                        <p className="text-sm text-gray-500 truncate">{link.url}</p>
                                    </div>
                                    {link.verified && (
                                        <Badge variant="verified" size="sm">Verified</Badge>
                                    )}
                                </a>
                            ))}
                        </div>
                    </Card>

                    {/* Endorsements */}
                    {student.endorsements.length > 0 && (
                        <Card>
                            <h3 className="font-semibold text-gray-900 mb-4">Endorsements</h3>
                            <div className="space-y-4">
                                {student.endorsements.map(endorsement => (
                                    <div key={endorsement.id} className="p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-medium text-gray-900">{endorsement.fromName}</span>
                                            <Badge variant="level" size="sm">{endorsement.fromRole}</Badge>
                                            {endorsement.verified && <Badge variant="verified" size="sm">Verified</Badge>}
                                        </div>
                                        <p className="text-gray-600 text-sm italic">"{endorsement.message}"</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* Certificates */}
                    {studentCertificates.length > 0 && (
                        <Card>
                            <h3 className="font-semibold text-gray-900 mb-4">Verified Experience Certificates</h3>
                            <div className="space-y-4">
                                {studentCertificates.map(cert => (
                                    <div key={cert.id} className="p-4 bg-gradient-to-br from-primary-50 to-verify-50 rounded-xl border border-primary-100">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900">{cert.projectTitle}</h4>
                                                <p className="text-sm text-gray-600">{cert.startupName}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Completed {new Date(cert.completedAt).toLocaleDateString()}
                                                    {cert.hoursWorked && ` • ${cert.hoursWorked} hours`}
                                                </p>
                                                <div className="flex gap-2 mt-2">
                                                    {cert.skills.map(skill => (
                                                        <Badge key={skill} variant="verified" size="sm">{skill}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Stats */}
                    <Card>
                        <h3 className="font-semibold text-gray-900 mb-4">Stats</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Projects Completed</span>
                                <span className="font-bold text-gray-900">{student.completedProjects}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Total Earnings</span>
                                <span className="font-bold text-verify-600">${student.earnings.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Verified Skills</span>
                                <span className="font-bold text-gray-900">{student.skills.filter(s => s.verified).length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Endorsements</span>
                                <span className="font-bold text-gray-900">{student.endorsements.length}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Trust Score Breakdown */}
                    <Card>
                        <TrustScoreProgress score={student.trustScore} className="mb-6" />
                        <TrustScoreBreakdown breakdown={trustBreakdown} />
                    </Card>
                </div>
            </div>
        </div>
    );
}

function StartupProfile({ startup, isOwnProfile }: { startup: typeof mockStartups[0]; isOwnProfile: boolean }) {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <Card className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <Avatar src={startup.avatar} name={startup.companyName} size="xl" verified={startup.verificationLevel === 2} />
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">{startup.companyName}</h1>
                        <p className="text-gray-600">{startup.industry} • {startup.teamSize} team members</p>
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                            <VerificationBadge level={startup.verificationLevel} verified={true} />
                            {startup.escrowDeposit >= 50 && (
                                <Badge variant="verified">Escrow Active</Badge>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <TrustScore score={startup.trustScore} size="lg" />
                        {isOwnProfile && (
                            <Button variant="secondary" size="sm">Edit Profile</Button>
                        )}
                    </div>
                </div>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Mentorship Philosophy */}
                    {startup.mentorshipPhilosophy && (
                        <Card>
                            <h3 className="font-semibold text-gray-900 mb-3">Mentorship Philosophy</h3>
                            <p className="text-gray-600">{startup.mentorshipPhilosophy}</p>
                        </Card>
                    )}

                    {/* Links */}
                    <Card>
                        <h3 className="font-semibold text-gray-900 mb-4">Links</h3>
                        <div className="space-y-3">
                            {startup.companyWebsite && (
                                <a
                                    href={startup.companyWebsite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
                                >
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Website</p>
                                        <p className="text-sm text-gray-500">{startup.companyWebsite}</p>
                                    </div>
                                </a>
                            )}
                            <a
                                href={startup.linkedInProfile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
                            >
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Founder LinkedIn</p>
                                    <p className="text-sm text-gray-500">View Profile</p>
                                </div>
                                <Badge variant="verified" size="sm">Verified</Badge>
                            </a>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    {/* Stats */}
                    <Card>
                        <h3 className="font-semibold text-gray-900 mb-4">Stats</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Projects Posted</span>
                                <span className="font-bold text-gray-900">{startup.projectsPosted}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Hires Made</span>
                                <span className="font-bold text-gray-900">{startup.hiresMade}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Member Since</span>
                                <span className="font-medium text-gray-900">{new Date(startup.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Trust Score */}
                    <Card>
                        <TrustScoreProgress score={startup.trustScore} className="mb-6" />
                        <TrustScoreBreakdown breakdown={[
                            { category: 'Verification', points: startup.verificationLevel === 2 ? 20 : 10, maxPoints: 20 },
                            { category: 'Detailed Descriptions', points: 15, maxPoints: 20 },
                            { category: 'Quick Payments', points: 18, maxPoints: 20 },
                            { category: 'Quality Feedback', points: 17, maxPoints: 20 },
                            { category: 'Fair Behavior', points: 12, maxPoints: 15 },
                        ]} />
                    </Card>
                </div>
            </div>
        </div>
    );
}
