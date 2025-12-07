import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'verified' | 'pending' | 'skill' | 'level' | 'pro' | 'danger';
    size?: 'sm' | 'md';
    icon?: React.ReactNode;
    className?: string;
}

export default function Badge({ children, variant = 'default', size = 'md', icon, className = '' }: BadgeProps) {
    const variants = {
        default: 'bg-gray-100 text-gray-700',
        verified: 'bg-verify-100 text-verify-700',
        pending: 'bg-amber-100 text-amber-700',
        skill: 'bg-primary-100 text-primary-700',
        level: 'bg-gray-100 text-gray-600',
        pro: 'bg-gradient-to-r from-amber-400 to-amber-500 text-white',
        danger: 'bg-red-100 text-red-700',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-xs',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
            {icon}
            {children}
        </span>
    );
}

// Specialized badges
export function VerificationBadge({ level, verified }: { level: 1 | 2; verified: boolean }) {
    if (!verified) {
        return (
            <Badge variant="pending" icon={
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            }>
                Pending
            </Badge>
        );
    }

    return (
        <Badge variant="verified" icon={
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        }>
            Level {level} Verified
        </Badge>
    );
}

export function SkillBadge({ name, verified, score }: { name: string; verified: boolean; score?: number }) {
    return (
        <Badge
            variant={verified ? 'verified' : 'skill'}
            icon={verified ? (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            ) : null}
        >
            {name}
            {score && <span className="ml-1 opacity-70">{score}%</span>}
        </Badge>
    );
}

export function ProBadge() {
    return (
        <Badge variant="pro" icon={
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        }>
            PRO
        </Badge>
    );
}
