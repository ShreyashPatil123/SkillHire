import React from 'react';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'hover' | 'glass';
    className?: string;
    onClick?: () => void;
}

export default function Card({ children, variant = 'default', className = '', onClick }: CardProps) {
    const variants = {
        default: 'bg-white rounded-2xl shadow-card p-6 transition-all duration-300',
        hover: 'bg-white rounded-2xl shadow-card p-6 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer',
        glass: 'bg-white/80 backdrop-blur-lg rounded-2xl shadow-glass p-6 border border-white/20',
    };

    return (
        <div className={`${variants[variant]} ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
    return <div className={`mb-4 ${className}`}>{children}</div>;
}

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
    return <h3 className={`text-xl font-bold text-gray-900 ${className}`}>{children}</h3>;
}

interface CardDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
    return <p className={`text-gray-600 mt-1 ${className}`}>{children}</p>;
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
    return <div className={className}>{children}</div>;
}

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
    return <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>{children}</div>;
}
