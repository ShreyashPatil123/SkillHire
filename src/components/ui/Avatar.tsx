
interface AvatarProps {
    src?: string;
    name: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    verified?: boolean;
    className?: string;
}

export default function Avatar({ src, name, size = 'md', verified = false, className = '' }: AvatarProps) {
    const sizes = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-14 h-14 text-lg',
        xl: 'w-20 h-20 text-2xl',
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className={`relative inline-flex ${className}`}>
            {src ? (
                <img
                    src={src}
                    alt={name}
                    className={`${sizes[size]} rounded-full object-cover bg-gray-100`}
                />
            ) : (
                <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold`}>
                    {getInitials(name)}
                </div>
            )}
            {verified && (
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-verify-500 rounded-full flex items-center justify-center border-2 border-white">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </div>
    );
}

interface AvatarGroupProps {
    users: { name: string; avatar?: string }[];
    max?: number;
    size?: 'sm' | 'md';
}

export function AvatarGroup({ users, max = 3, size = 'md' }: AvatarGroupProps) {
    const displayUsers = users.slice(0, max);
    const remaining = users.length - max;

    return (
        <div className="flex -space-x-2">
            {displayUsers.map((user, i) => (
                <Avatar
                    key={i}
                    src={user.avatar}
                    name={user.name}
                    size={size}
                    className="ring-2 ring-white"
                />
            ))}
            {remaining > 0 && (
                <div className={`${size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'} rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium ring-2 ring-white`}>
                    +{remaining}
                </div>
            )}
        </div>
    );
}
