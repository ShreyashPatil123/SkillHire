
interface TrustScoreProps {
    score: number;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    showBreakdown?: boolean;
    className?: string;
}

export default function TrustScore({
    score,
    size = 'md',
    showLabel = true,
    className = ''
}: TrustScoreProps) {
    const getScoreColor = (score: number) => {
        if (score >= 70) return 'text-verify-600 bg-verify-100';
        if (score >= 40) return 'text-amber-600 bg-amber-100';
        return 'text-red-600 bg-red-100';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'Excellent';
        if (score >= 70) return 'Good';
        if (score >= 50) return 'Fair';
        if (score >= 40) return 'Needs Work';
        return 'At Risk';
    };

    const sizes = {
        sm: 'w-10 h-10 text-sm',
        md: 'w-14 h-14 text-lg',
        lg: 'w-20 h-20 text-2xl',
    };

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className={`${sizes[size]} ${getScoreColor(score)} rounded-full flex items-center justify-center font-bold`}>
                {score}
            </div>
            {showLabel && (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">Trust Score</span>
                    <span className={`text-xs ${score >= 70 ? 'text-verify-600' : score >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
                        {getScoreLabel(score)}
                    </span>
                </div>
            )}
        </div>
    );
}

interface TrustScoreProgressProps {
    score: number;
    className?: string;
}

export function TrustScoreProgress({ score, className = '' }: TrustScoreProgressProps) {
    const getProgressColor = (score: number) => {
        if (score >= 70) return 'bg-verify-500';
        if (score >= 40) return 'bg-amber-500';
        return 'bg-red-500';
    };

    return (
        <div className={`w-full ${className}`}>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Trust Score</span>
                <span className={`text-sm font-bold ${score >= 70 ? 'text-verify-600' : score >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
                    {score}/100
                </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full ${getProgressColor(score)} rounded-full transition-all duration-500`}
                    style={{ width: `${score}%` }}
                />
            </div>
        </div>
    );
}

interface TrustScoreBreakdownProps {
    breakdown: {
        category: string;
        points: number;
        maxPoints: number;
    }[];
    className?: string;
}

export function TrustScoreBreakdown({ breakdown, className = '' }: TrustScoreBreakdownProps) {
    return (
        <div className={`space-y-3 ${className}`}>
            <h4 className="font-semibold text-gray-900">Score Breakdown</h4>
            {breakdown.map(item => (
                <div key={item.category}>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{item.category}</span>
                        <span className="font-medium text-gray-900">{item.points}/{item.maxPoints}</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${(item.points / item.maxPoints) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
