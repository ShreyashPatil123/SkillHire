import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge, { VerificationBadge, SkillBadge, ProBadge } from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import TrustScore, { TrustScoreProgress, TrustScoreBreakdown } from '../components/ui/TrustScore';

export default function Dashboard() {
    const { user, isStudent, isStartup } = useAuth();

    if (!user) return <Navigate to="/login" />;

    if (isStudent) {
        return <StudentDashboard />;
    }

    if (isStartup) {
        return <StartupDashboard />;
    }

    return <Navigate to="/login" />;
}

function StudentDashboard() {
    const { getStudent } = useAuth();
    const { getRecommendedProjects, getStudentProjects, getMatchScore, certificates } = useApp();

    const student = getStudent();
    if (!student) return null;

    const recommendedProjects = getRecommendedProjects(student.id).slice(0, 3);
    const activeProjects = getStudentProjects(student.id);
    const studentCertificates = certificates.filter(c => c.studentId === student.id);

    const trustBreakdown = [
        { category: 'Verification', points: student.verificationLevel === 2 ? 20 : 10, maxPoints: 20 },
        { category: 'Deadlines Met', points: Math.min(student.completedProjects * 4, 20), maxPoints: 20 },
        { category: 'Skill Tests', points: student.skills.filter(s => s.verified).length * 5, maxPoints: 20 },
        { category: 'Quality Work', points: Math.min(student.completedProjects * 3, 20), maxPoints: 20 },
        { category: 'Endorsements', points: Math.min(student.endorsements.length * 5, 15), maxPoints: 15 },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <Avatar src={student.avatar} name={student.name} size="xl" verified={student.verificationLevel === 2} />
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                            {student.proBadge && <ProBadge />}
                        </div>
                        <p className="text-gray-600">{student.major} • {student.university}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <VerificationBadge level={student.verificationLevel} verified={true} />
                            <Badge variant="level">Class of {student.graduationYear}</Badge>
                        </div>
                    </div>
                </div>
                <TrustScore score={student.trustScore} size="lg" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Active Projects */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Active Projects</h2>
                            <Link to="/projects" className="text-sm text-primary-600 font-medium hover:underline">View all</Link>
                        </div>

                        {activeProjects.length > 0 ? (
                            <div className="space-y-4">
                                {activeProjects.map(project => (
                                    <Card key={project.id} variant="hover">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{project.duration} • ${project.compensation}</p>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {project.skills.map(skill => (
                                                        <Badge key={skill} variant="skill" size="sm">{skill}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <Badge variant={project.status === 'in-progress' ? 'pending' : 'verified'}>
                                                {project.status === 'in-progress' ? 'In Progress' : 'Complete'}
                                            </Badge>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">
                                                    Milestone {project.milestones.filter(m => m.status === 'completed').length + 1} of {project.milestones.length}
                                                </span>
                                                <Link to={`/workflow/${project.id}`}>
                                                    <Button size="sm">View Progress</Button>
                                                </Link>
                                            </div>
                                            <div className="mt-2 h-2 bg-gray-200 rounded-full">
                                                <div
                                                    className="h-full bg-primary-500 rounded-full transition-all"
                                                    style={{ width: `${(project.milestones.filter(m => m.status === 'completed').length / project.milestones.length) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">No active projects</h3>
                                <p className="text-gray-500 text-sm mb-4">Start applying to projects to build your experience!</p>
                                <Link to="/projects">
                                    <Button>Browse Projects</Button>
                                </Link>
                            </Card>
                        )}
                    </section>

                    {/* Recommended Projects */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
                            <Link to="/projects" className="text-sm text-primary-600 font-medium hover:underline">View all</Link>
                        </div>

                        <div className="space-y-4">
                            {recommendedProjects.map(project => {
                                const matchScore = getMatchScore(student.id, project.id);
                                return (
                                    <Card key={project.id} variant="hover">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${matchScore >= 70 ? 'bg-verify-100 text-verify-600' :
                                                    matchScore >= 50 ? 'bg-amber-100 text-amber-600' :
                                                        'bg-gray-100 text-gray-600'
                                                }`}>
                                                {matchScore}%
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{project.title}</h3>
                                                        <p className="text-sm text-gray-500">{project.type === 'micro-internship' ? 'Micro-Internship' : 'Project Gig'} • {project.duration}</p>
                                                    </div>
                                                    <span className="font-bold text-primary-600">${project.compensation}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex gap-2">
                                                        {project.skills.slice(0, 3).map(skill => (
                                                            <Badge key={skill} variant="skill" size="sm">{skill}</Badge>
                                                        ))}
                                                    </div>
                                                    <Link to={`/projects/${project.id}`}>
                                                        <Button size="sm" variant="secondary">View Details</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </section>

                    {/* Certificates */}
                    {studentCertificates.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Certificates</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {studentCertificates.map(cert => (
                                    <Card key={cert.id} className="bg-gradient-to-br from-primary-50 to-verify-50 border border-primary-100">
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
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-4">
                                            {cert.skills.map(skill => (
                                                <Badge key={skill} variant="verified" size="sm">{skill}</Badge>
                                            ))}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <Card>
                        <h3 className="font-semibold text-gray-900 mb-4">Your Stats</h3>
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

                    {/* Skills */}
                    <Card>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">Your Skills</h3>
                            <Button variant="ghost" size="sm">+ Add</Button>
                        </div>
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

                    {/* Upgrade to Pro */}
                    {!student.proBadge && (
                        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-lg flex items-center justify-center text-white">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Upgrade to Pro</h4>
                                    <p className="text-sm text-gray-600 mt-1">See profile views, retake skill tests, and stand out!</p>
                                    <Button size="sm" className="mt-3 bg-gradient-to-r from-amber-500 to-orange-500">
                                        $5/month
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

function StartupDashboard() {
    const { getStartup } = useAuth();
    const { getStartupProjects } = useApp();

    const startup = getStartup();
    if (!startup) return null;

    const startupProjects = getStartupProjects(startup.id);
    const openProjects = startupProjects.filter(p => p.status === 'open');
    const activeProjects = startupProjects.filter(p => p.status === 'in-progress');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <Avatar src={startup.avatar} name={startup.companyName} size="xl" verified={startup.verificationLevel === 2} />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{startup.companyName}</h1>
                        <p className="text-gray-600">{startup.industry} • {startup.teamSize} team members</p>
                        <div className="flex items-center gap-2 mt-2">
                            <VerificationBadge level={startup.verificationLevel} verified={true} />
                            {startup.escrowDeposit >= 50 && (
                                <Badge variant="verified">Escrow Active</Badge>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <TrustScore score={startup.trustScore} size="lg" />
                    <Link to="/projects/new">
                        <Button>
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Post Project
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Active Projects */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Active Projects ({activeProjects.length})</h2>
                        </div>

                        {activeProjects.length > 0 ? (
                            <div className="space-y-4">
                                {activeProjects.map(project => (
                                    <Card key={project.id}>
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{project.type === 'micro-internship' ? 'Micro-Internship' : 'Project Gig'}</p>
                                            </div>
                                            <Badge variant="pending">In Progress</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <p className="text-sm text-gray-600">
                                                    Student assigned • Milestone {project.milestones.filter(m => m.status === 'completed').length + 1}/{project.milestones.length}
                                                </p>
                                            </div>
                                            <Link to={`/workflow/${project.id}`}>
                                                <Button size="sm">Manage</Button>
                                            </Link>
                                        </div>
                                        <div className="mt-3 h-2 bg-gray-200 rounded-full">
                                            <div
                                                className="h-full bg-primary-500 rounded-full"
                                                style={{ width: `${(project.milestones.filter(m => m.status === 'completed').length / project.milestones.length) * 100}%` }}
                                            />
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="text-center py-12">
                                <p className="text-gray-500">No projects in progress</p>
                            </Card>
                        )}
                    </section>

                    {/* Open Projects */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Open Projects ({openProjects.length})</h2>

                        {openProjects.length > 0 ? (
                            <div className="space-y-4">
                                {openProjects.map(project => (
                                    <Card key={project.id}>
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">${project.compensation} • {project.duration}</p>
                                            </div>
                                            <Badge variant="verified">Open</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-600">
                                                {project.applicants.length} applicant{project.applicants.length !== 1 ? 's' : ''}
                                            </p>
                                            <div className="flex gap-2">
                                                <Link to={`/projects/${project.id}`}>
                                                    <Button size="sm" variant="secondary">View</Button>
                                                </Link>
                                                <Link to={`/projects/${project.id}/applicants`}>
                                                    <Button size="sm">Review</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">No open projects</h3>
                                <p className="text-gray-500 text-sm mb-4">Post a project to find talented students</p>
                                <Link to="/projects/new">
                                    <Button>Post Your First Project</Button>
                                </Link>
                            </Card>
                        )}
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <Card>
                        <h3 className="font-semibold text-gray-900 mb-4">Your Stats</h3>
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
                                <span className="text-gray-600">Escrow Balance</span>
                                <span className="font-bold text-verify-600">${startup.escrowDeposit}</span>
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

                    {/* Mentorship Philosophy */}
                    {startup.mentorshipPhilosophy && (
                        <Card>
                            <h3 className="font-semibold text-gray-900 mb-3">Your Mentorship Philosophy</h3>
                            <p className="text-sm text-gray-600">{startup.mentorshipPhilosophy}</p>
                        </Card>
                    )}

                    {/* Add Escrow */}
                    {startup.escrowDeposit < 50 && (
                        <Card className="bg-amber-50 border border-amber-200">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center text-white">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Add Escrow Deposit</h4>
                                    <p className="text-sm text-gray-600 mt-1">Deposit $50 to start posting projects and show students you're serious.</p>
                                    <Button size="sm" className="mt-3">Add Funds</Button>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
