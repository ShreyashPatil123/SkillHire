import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import TrustScore from '../ui/TrustScore';

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = isAuthenticated ? [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/projects', label: 'Projects' },
        { to: '/profile', label: 'Profile' },
    ] : [];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-sm">SH</span>
                        </div>
                        <span className="font-display font-bold text-xl text-gray-900">
                            Skill<span className="text-primary-600">Hire</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`font-medium transition-colors ${isActive(link.to)
                                        ? 'text-primary-600'
                                        : 'text-gray-600 hover:text-primary-600'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* User Menu / Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated && user ? (
                            <div className="flex items-center gap-4">
                                <TrustScore score={user.trustScore} size="sm" showLabel={false} />
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        src={user.avatar}
                                        name={user.name}
                                        size="sm"
                                        verified={user.verificationLevel === 2}
                                    />
                                    <div className="text-sm">
                                        <p className="font-medium text-gray-900">{user.name}</p>
                                        <p className="text-gray-500 text-xs capitalize">{user.userType}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={logout}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">Log in</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button size="sm">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100">
                        {isAuthenticated && user && (
                            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
                                <Avatar
                                    src={user.avatar}
                                    name={user.name}
                                    size="lg"
                                    verified={user.verificationLevel === 2}
                                />
                                <div>
                                    <p className="font-medium text-gray-900">{user.name}</p>
                                    <p className="text-gray-500 text-sm capitalize">{user.userType}</p>
                                    <TrustScore score={user.trustScore} size="sm" className="mt-1" />
                                </div>
                            </div>
                        )}
                        <div className="space-y-2">
                            {navLinks.map(link => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`block py-2 px-4 rounded-lg font-medium transition-colors ${isActive(link.to)
                                            ? 'bg-primary-50 text-primary-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {isAuthenticated ? (
                                <button
                                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                                    className="w-full text-left py-2 px-4 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    Log out
                                </button>
                            ) : (
                                <div className="space-y-2 pt-2">
                                    <Link to="/login" className="block">
                                        <Button variant="secondary" className="w-full">Log in</Button>
                                    </Link>
                                    <Link to="/signup" className="block">
                                        <Button className="w-full">Get Started</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
