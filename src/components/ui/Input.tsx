import React, { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    helperText,
    icon,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={`
            w-full px-4 py-3 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 
            transition-all duration-200 focus:outline-none focus:ring-4
            ${icon ? 'pl-11' : ''}
            ${error
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                            : 'border-gray-200 focus:border-primary-500 focus:ring-primary-100'}
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
            {helperText && !error && <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>}
        </div>
    );
});

Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
    label,
    error,
    helperText,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <textarea
                ref={ref}
                className={`
          w-full px-4 py-3 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 
          transition-all duration-200 focus:outline-none focus:ring-4 resize-none
          ${error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                        : 'border-gray-200 focus:border-primary-500 focus:ring-primary-100'}
          ${className}
        `}
                {...props}
            />
            {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
            {helperText && !error && <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>}
        </div>
    );
});

Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    error,
    options,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <select
                ref={ref}
                className={`
          w-full px-4 py-3 bg-white border-2 rounded-xl text-gray-900 
          transition-all duration-200 focus:outline-none focus:ring-4
          ${error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                        : 'border-gray-200 focus:border-primary-500 focus:ring-primary-100'}
          ${className}
        `}
                {...props}
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
        </div>
    );
});

Select.displayName = 'Select';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
    label,
    className = '',
    ...props
}, ref) => {
    return (
        <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
            <input
                ref={ref}
                type="checkbox"
                className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                {...props}
            />
            <span className="text-sm text-gray-700">{label}</span>
        </label>
    );
});

Checkbox.displayName = 'Checkbox';
