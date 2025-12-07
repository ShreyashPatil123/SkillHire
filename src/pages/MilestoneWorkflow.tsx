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
import { mockStudents, mockStartups } from '../data/mockUsers';

export default function MilestoneWorkflow() {
    const { projectId } = useParams();
    const { isStudent, isStartup } = useAuth();
    const { getProject, submitMilestone, approveMilestone, generateCertificate } = useApp();

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
    const [submission, setSubmission] = useState('');
    const [feedback, setFeedback] = useState({ rating: 5 as 1 | 2 | 3 | 4 | 5, comment: '' });
    const [loading, setLoading] = useState(false);

    const project = getProject(projectId || '');

    if (!project) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h1>
                <Link to="/dashboard">
                    <Button>Back to Dashboard</Button>
                </Link>
            </div>
        );
    }

    const student = mockStudents.find(s => s.id === project.selectedStudentId);
    const startup = mockStartups.find(s => s.id === project.startupId);

    const completedCount = project.milestones.filter(m => m.status === 'completed').length;
    const progress = (completedCount / project.milestones.length) * 100;

    const handleSubmit = async () => {
        if (!selectedMilestone) return;
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        submitMilestone(project.id, selectedMilestone, submission);
        setLoading(false);
        setShowSubmitModal(false);
        setSubmission('');
        setSelectedMilestone(null);
    };

    const handleApprove = async () => {
        if (!selectedMilestone) return;
        if (feedback.comment.length < 50) {
            alert('Please provide detailed feedback (at least 50 characters)');
            return;
        }
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        approveMilestone(project.id, selectedMilestone, feedback);

        // Check if this was the last milestone
        const milestone = project.milestones.find(m => m.id === selectedMilestone);
        const isLast = milestone && project.milestones.indexOf(milestone) === project.milestones.length - 1;
        if (isLast) {
            generateCertificate(project.id);
        }

        setLoading(false);
        setShowFeedbackModal(false);
        setFeedback({ rating: 5, comment: '' });
        setSelectedMilestone(null);
    };

    const getMilestoneIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return (
                    <div className="w-10 h-10 bg-verify-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'in-progress':
                return (
                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                );
            case 'submitted':
                return (
                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-gray-400 rounded-full" />
                    </div>
                );
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Link to="/dashboard" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
                    <p className="text-gray-500">{project.type === 'micro-internship' ? 'Micro-Internship' : 'Project Gig'} • ${project.compensation}</p>
                </div>
            </div>

            {/* Progress Bar */}
            <Card className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Project Progress</h3>
                    <span className="text-sm font-medium text-primary-600">{Math.round(progress)}% Complete</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary-500 to-verify-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Kickoff</span>
                    <span>Mid-Check</span>
                    <span>Complete</span>
                </div>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Milestones */}
                <div className="lg:col-span-2 space-y-6">
                    {project.milestones.map((milestone) => (
                        <Card key={milestone.id} className={milestone.status === 'in-progress' ? 'ring-2 ring-primary-500' : ''}>
                            <div className="flex items-start gap-4">
                                {getMilestoneIcon(milestone.status)}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                                            <p className="text-sm text-gray-600">{milestone.description}</p>
                                        </div>
                                        <Badge
                                            variant={
                                                milestone.status === 'completed' ? 'verified' :
                                                    milestone.status === 'submitted' ? 'pending' :
                                                        milestone.status === 'in-progress' ? 'skill' :
                                                            'level'
                                            }
                                        >
                                            {milestone.status === 'in-progress' ? 'In Progress' :
                                                milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                                        </Badge>
                                    </div>

                                    {/* Submission Preview */}
                                    {milestone.submission && (
                                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-600">{milestone.submission}</p>
                                        </div>
                                    )}

                                    {/* Feedback */}
                                    {milestone.feedback && (
                                        <div className="mt-3 p-3 bg-verify-50 rounded-lg border border-verify-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <svg
                                                            key={star}
                                                            className={`w-4 h-4 ${star <= milestone.feedback!.rating ? 'text-amber-400' : 'text-gray-300'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="text-sm font-medium text-verify-700">Feedback received</span>
                                            </div>
                                            <p className="text-sm text-verify-800">{milestone.feedback.comment}</p>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="mt-4 flex gap-2">
                                        {milestone.status === 'in-progress' && isStudent && (
                                            <Button
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedMilestone(milestone.id);
                                                    setShowSubmitModal(true);
                                                }}
                                            >
                                                Submit Work
                                            </Button>
                                        )}
                                        {milestone.status === 'submitted' && isStartup && (
                                            <Button
                                                size="sm"
                                                variant="verify"
                                                onClick={() => {
                                                    setSelectedMilestone(milestone.id);
                                                    setShowFeedbackModal(true);
                                                }}
                                            >
                                                Review & Approve
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}

                    {/* Completion Card */}
                    {project.status === 'completed' && (
                        <Card className="bg-gradient-to-br from-verify-50 to-primary-50 border-2 border-verify-200">
                            <div className="text-center py-6">
                                <div className="w-16 h-16 bg-verify-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Project Completed! 🎉</h3>
                                <p className="text-gray-600 mb-4">
                                    Congratulations! Payment has been released and a certificate has been generated.
                                </p>
                                <Button variant="verify">Download Certificate</Button>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Participants */}
                    <Card>
                        <h3 className="font-semibold text-gray-900 mb-4">Participants</h3>

                        {student && (
                            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                                <Avatar src={student.avatar} name={student.name} verified={student.verificationLevel === 2} />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{student.name}</p>
                                    <p className="text-xs text-gray-500">Student</p>
                                </div>
                                <TrustScore score={student.trustScore} size="sm" showLabel={false} />
                            </div>
                        )}

                        {startup && (
                            <div className="flex items-center gap-3">
                                <Avatar src={startup.avatar} name={startup.companyName} verified={startup.verificationLevel === 2} />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{startup.companyName}</p>
                                    <p className="text-xs text-gray-500">Startup</p>
                                </div>
                                <TrustScore score={startup.trustScore} size="sm" showLabel={false} />
                            </div>
                        )}
                    </Card>

                    {/* Escrow Status */}
                    <Card>
                        <h3 className="font-semibold text-gray-900 mb-4">Payment Status</h3>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 bg-verify-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-verify-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">${project.compensation}</p>
                                <p className="text-xs text-gray-500">
                                    {project.status === 'completed' ? 'Released to student' : 'Held in escrow'}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <Button variant="secondary" size="sm" className="w-full justify-start">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Message
                            </Button>
                            <Button variant="secondary" size="sm" className="w-full justify-start">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                View Contract
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Submit Modal */}
            <Modal isOpen={showSubmitModal} onClose={() => setShowSubmitModal(false)} title="Submit Work" size="lg">
                <div className="space-y-4">
                    <p className="text-gray-600 text-sm">
                        Describe what you've completed for this milestone. Include links to any deliverables.
                    </p>
                    <Textarea
                        value={submission}
                        onChange={(e) => setSubmission(e.target.value)}
                        placeholder="I've completed the following work..."
                        rows={6}
                    />
                    <div className="flex gap-3 pt-4">
                        <Button variant="ghost" onClick={() => setShowSubmitModal(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} loading={loading} disabled={!submission.trim()} className="flex-1">
                            Submit for Review
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Feedback Modal */}
            <Modal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} title="Review & Approve" size="lg">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    onClick={() => setFeedback(f => ({ ...f, rating: star as 1 | 2 | 3 | 4 | 5 }))}
                                    className="p-1"
                                >
                                    <svg
                                        className={`w-8 h-8 transition-colors ${star <= feedback.rating ? 'text-amber-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                    <Textarea
                        label="Detailed Feedback (Required)"
                        value={feedback.comment}
                        onChange={(e) => setFeedback(f => ({ ...f, comment: e.target.value }))}
                        placeholder="Provide detailed feedback on the work submitted. What was done well? What could be improved? (Minimum 50 characters)"
                        rows={5}
                        helperText={`${feedback.comment.length}/50 characters minimum`}
                    />
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                        ⚠️ Detailed feedback is required to approve milestones. This ensures students receive valuable mentorship.
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button variant="ghost" onClick={() => setShowFeedbackModal(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button
                            variant="verify"
                            onClick={handleApprove}
                            loading={loading}
                            disabled={feedback.comment.length < 50}
                            className="flex-1"
                        >
                            Approve Milestone
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
