import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Modal from '../components/ui/Modal';
import { Textarea } from '../components/ui/Input';
import TrustScore from '../components/ui/TrustScore';
import { mockStartups } from '../data/mockUsers';

export default function ProjectDetail() {
    const { id } = useParams();
    const { user, isStudent, isAuthenticated } = useAuth();
    const { getProject, applyToProject, getMatchScore } = useApp();

    const [showApplyModal, setShowApplyModal] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const [applying, setApplying] = useState(false);
    const [applied, setApplied] = useState(false);

    const project = getProject(id || '');
    const startup = project ? mockStartups.find(s => s.id === project.startupId) : null;
    const matchScore = isStudent && user && project ? getMatchScore(user.id, project.id) : null;

    if (!project || !startup) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h1>
                <Link to="/projects">
                    <Button>Back to Projects</Button>
                </Link>
            </div>
        );
    }

    const handleApply = async () => {
        if (!user || !isStudent) return;

        setApplying(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        applyToProject(project.id, user.id, {
            coverLetter,
            matchScore: matchScore || 0,
        });

        setApplying(false);
        setShowApplyModal(false);
        setApplied(true);
    };

    const hasApplied = applied || project.applicants.some(a => a.studentId === user?.id);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button */}
            <Link to="/projects" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Projects
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <Card>
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant={project.type === 'micro-internship' ? 'skill' : 'level'}>
                                        {project.type === 'micro-internship' ? 'Micro-Internship' : 'Project Gig'}
                                    </Badge>
                                    <Badge variant="verified">Open</Badge>
                                    {project.escrowFunded && (
                                        <Badge variant="verified" size="sm">Escrow Funded</Badge>
                                    )}
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-primary-600">${project.compensation}</p>
                                <p className="text-sm text-gray-500">{project.duration}</p>
                            </div>
                        </div>

                        {matchScore !== null && (
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-4 ${matchScore >= 70 ? 'bg-verify-100 text-verify-700' :
                                    matchScore >= 50 ? 'bg-amber-100 text-amber-700' :
                                        'bg-gray-100 text-gray-700'
                                }`}>
                                <span className="text-2xl font-bold">{matchScore}%</span>
                                <span className="font-medium">Match Score</span>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                            {project.skills.map(skill => (
                                <Badge key={skill} variant="skill">{skill}</Badge>
                            ))}
                        </div>
                    </Card>

                    {/* Description */}
                    <Card>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">About This Project</h2>
                        <p className="text-gray-600 whitespace-pre-line">{project.description}</p>
                    </Card>

                    {/* Deliverables */}
                    <Card>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Deliverables</h2>
                        <ul className="space-y-3">
                            {project.deliverables.map((deliverable, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-primary-600">{i + 1}</span>
                                    </div>
                                    <span className="text-gray-700">{deliverable}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Mentorship */}
                    <Card className="bg-verify-50 border border-verify-100">
                        <h2 className="text-lg font-bold text-verify-900 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            What You'll Learn
                        </h2>
                        <p className="text-verify-800">{project.mentorshipOffer}</p>
                    </Card>

                    {/* Milestones Preview */}
                    <Card>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Project Milestones</h2>
                        <div className="space-y-4">
                            {project.milestones.map((milestone, i) => (
                                <div key={milestone.id} className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-bold text-gray-600">{i + 1}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                                        <p className="text-sm text-gray-600">{milestone.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Apply Card */}
                    <Card>
                        {isStudent ? (
                            hasApplied ? (
                                <div className="text-center py-4">
                                    <div className="w-12 h-12 bg-verify-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-verify-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-900">Application Submitted!</h3>
                                    <p className="text-sm text-gray-500 mt-1">We'll notify you when the startup reviews your application.</p>
                                </div>
                            ) : (
                                <>
                                    <Button className="w-full mb-3" onClick={() => setShowApplyModal(true)}>
                                        Apply for This Project
                                    </Button>
                                    <p className="text-xs text-gray-500 text-center">
                                        Include a video pitch to stand out from other applicants
                                    </p>
                                </>
                            )
                        ) : isAuthenticated ? (
                            <div className="text-center py-4">
                                <p className="text-sm text-gray-500">
                                    You're logged in as a startup. Students can apply to this project.
                                </p>
                            </div>
                        ) : (
                            <>
                                <Link to="/signup?type=student">
                                    <Button className="w-full mb-3">Sign Up to Apply</Button>
                                </Link>
                                <p className="text-xs text-gray-500 text-center">
                                    Already have an account? <Link to="/login" className="text-primary-600 hover:underline">Log in</Link>
                                </p>
                            </>
                        )}
                    </Card>

                    {/* Startup Info */}
                    <Card>
                        <h3 className="font-semibold text-gray-900 mb-4">Posted By</h3>
                        <div className="flex items-center gap-3 mb-4">
                            <Avatar src={startup.avatar} name={startup.companyName} size="lg" verified={startup.verificationLevel === 2} />
                            <div>
                                <h4 className="font-semibold text-gray-900">{startup.companyName}</h4>
                                <p className="text-sm text-gray-500">{startup.industry}</p>
                            </div>
                        </div>
                        <TrustScore score={startup.trustScore} className="mb-4" />
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Team Size</span>
                                <span className="font-medium">{startup.teamSize}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Projects Posted</span>
                                <span className="font-medium">{startup.projectsPosted}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Hires Made</span>
                                <span className="font-medium">{startup.hiresMade}</span>
                            </div>
                        </div>

                        {startup.mentorshipPhilosophy && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <p className="text-xs text-gray-500 mb-1">Mentorship Philosophy</p>
                                <p className="text-sm text-gray-700">{startup.mentorshipPhilosophy}</p>
                            </div>
                        )}
                    </Card>

                    {/* Project Details */}
                    <Card>
                        <h3 className="font-semibold text-gray-900 mb-4">Project Details</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Duration</span>
                                <span className="font-medium">{project.duration}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Compensation</span>
                                <span className="font-medium text-primary-600">${project.compensation}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Milestones</span>
                                <span className="font-medium">{project.milestones.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Applicants</span>
                                <span className="font-medium">{project.applicants.length}</span>
                            </div>
                            {project.deadline && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Deadline</span>
                                    <span className="font-medium">{new Date(project.deadline).toLocaleDateString()}</span>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Apply Modal */}
            <Modal isOpen={showApplyModal} onClose={() => setShowApplyModal(false)} title="Apply for Project" size="lg">
                <div className="space-y-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Cover Letter</h4>
                        <Textarea
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Tell the startup why you're a great fit for this project. Mention relevant skills, experience, and what you hope to learn..."
                            rows={6}
                        />
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Video Pitch (Recommended)
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                            Record a 60-second video pitch to stand out. Introduce yourself and explain why you're excited about this project.
                        </p>
                        <Button variant="secondary" size="sm">
                            Record Video Pitch
                        </Button>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button variant="ghost" onClick={() => setShowApplyModal(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleApply}
                            loading={applying}
                            disabled={!coverLetter.trim()}
                            className="flex-1"
                        >
                            Submit Application
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
