'use client';

import { IconType } from 'react-icons';

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    errors?: string[];
    icon?: IconType;
    value: string;
    onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = 'text',
    disabled,
    formatPrice,
    required,
    errors = [],
    icon: Icon,
    value,
    onChange
}) => {
    const hasErrors = errors.length > 0;

    return (
        <div
            className="w-full relative"
        >
            {formatPrice && (
                <span className="absolute left-4 top-5 text-neutral-700">$</span>
            )}
            <input
                id={id}
                disabled={disabled}
                placeholder=" "
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`
                    peer
                    w-full
                    p-4
                    pt-6
                    font-light
                    bg-white
                    border-2
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${formatPrice ? 'pl-9' : 'pl-4'}
                    ${Icon ? 'pl-11' : ''}
                    ${hasErrors ? 'border-rose-500' : 'border-neutral-300'}
                    ${hasErrors ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
            />
            {Icon && (
                <Icon
                    size={24}
                    className="absolute left-4 top-5 text-neutral-700"
                />
            )}
            <label
                className={`
                    absolute
                    text-md
                    duration-150
                    transform
                    -translate-y-3
                    top-5
                    z-10
                    origin-[0]
                    ${formatPrice ? 'left-9' : 'left-4'}
                    ${Icon ? 'left-11' : ''}
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-4
                    ${hasErrors ? 'text-rose-500' : 'text-zinc-400'}
                `}
            >
                {label}
            </label>
            {hasErrors && (
                <div
                    className="text-rose-500 text-sm mt-1"
                >
                    {errors[0]}
                </div>
            )}
        </div>
    );
}

export default Input;
