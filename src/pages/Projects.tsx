import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Input, Select } from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';
import { mockStartups } from '../data/mockUsers';

export default function Projects() {
    const { user, isStudent, isAuthenticated } = useAuth();
    const { getOpenProjects, getMatchScore } = useApp();

    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [skillFilter, setSkillFilter] = useState('all');

    const openProjects = getOpenProjects();

    const filteredProjects = openProjects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
            project.description.toLowerCase().includes(search.toLowerCase());
        const matchesType = typeFilter === 'all' || project.type === typeFilter;
        const matchesSkill = skillFilter === 'all' || project.skills.some(s =>
            s.toLowerCase().includes(skillFilter.toLowerCase())
        );
        return matchesSearch && matchesType && matchesSkill;
    });

    const allSkills = [...new Set(openProjects.flatMap(p => p.skills))];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-900">Browse Projects</h1>
                    <p className="text-gray-600 mt-1">Find your next opportunity to learn and earn</p>
                </div>
                {isAuthenticated && !isStudent && (
                    <Link to="/projects/new">
                        <Button>
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Post Project
                        </Button>
                    </Link>
                )}
            </div>

            {/* Filters */}
            <Card className="mb-8">
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <Input
                            placeholder="Search projects..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            icon={
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            }
                        />
                    </div>
                    <Select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        options={[
                            { value: 'all', label: 'All Types' },
                            { value: 'micro-internship', label: 'Micro-Internships' },
                            { value: 'project-gig', label: 'Project Gigs' },
                        ]}
                    />
                    <Select
                        value={skillFilter}
                        onChange={(e) => setSkillFilter(e.target.value)}
                        options={[
                            { value: 'all', label: 'All Skills' },
                            ...allSkills.map(s => ({ value: s.toLowerCase(), label: s })),
                        ]}
                    />
                </div>
            </Card>

            {/* Results */}
            <div className="mb-4 text-sm text-gray-500">
                Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </div>

            {/* Project List */}
            <div className="space-y-6">
                {filteredProjects.map(project => {
                    const startup = mockStartups.find(s => s.id === project.startupId);
                    const matchScore = isStudent && user ? getMatchScore(user.id, project.id) : null;

                    return (
                        <Card key={project.id} variant="hover">
                            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                {/* Match Score (for students) */}
                                {matchScore !== null && (
                                    <div className="flex-shrink-0">
                                        <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold ${matchScore >= 70 ? 'bg-verify-100 text-verify-600' :
                                                matchScore >= 50 ? 'bg-amber-100 text-amber-600' :
                                                    'bg-gray-100 text-gray-600'
                                            }`}>
                                            <span className="text-xl">{matchScore}%</span>
                                            <span className="text-xs font-normal">match</span>
                                        </div>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant={project.type === 'micro-internship' ? 'skill' : 'level'}>
                                                    {project.type === 'micro-internship' ? 'Micro-Internship' : 'Project Gig'}
                                                </Badge>
                                                {project.escrowFunded && (
                                                    <Badge variant="verified" size="sm">Funded</Badge>
                                                )}
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-primary-600">${project.compensation}</p>
                                            <p className="text-sm text-gray-500">{project.duration}</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.skills.map(skill => (
                                            <Badge key={skill} variant="skill">{skill}</Badge>
                                        ))}
                                    </div>

                                    {/* Mentorship Offer */}
                                    <div className="bg-verify-50 rounded-xl p-4 mb-4">
                                        <div className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-verify-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                            <div>
                                                <p className="text-sm font-medium text-verify-800">What you'll learn:</p>
                                                <p className="text-sm text-verify-700">{project.mentorshipOffer}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        {startup && (
                                            <div className="flex items-center gap-3">
                                                <Avatar src={startup.avatar} name={startup.companyName} size="sm" verified={startup.verificationLevel === 2} />
                                                <div>
                                                    <p className="font-medium text-gray-900">{startup.companyName}</p>
                                                    <p className="text-sm text-gray-500">{startup.industry}</p>
                                                </div>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${startup.trustScore >= 70 ? 'bg-verify-100 text-verify-600' :
                                                        startup.trustScore >= 50 ? 'bg-amber-100 text-amber-600' :
                                                            'bg-red-100 text-red-600'
                                                    }`}>
                                                    {startup.trustScore}
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex gap-2">
                                            <Link to={`/projects/${project.id}`}>
                                                <Button variant="secondary">View Details</Button>
                                            </Link>
                                            {isStudent && (
                                                <Link to={`/projects/${project.id}`}>
                                                    <Button>Apply Now</Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {filteredProjects.length === 0 && (
                <Card className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">No projects found</h3>
                    <p className="text-gray-500 text-sm">Try adjusting your filters or search terms</p>
                </Card>
            )}
        </div>
    );
}
