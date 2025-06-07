'use client';
import React from 'react'
import { IconType } from 'react-icons/lib';

interface ButtonProps{
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    shadow?: boolean;
}

function Button({ label, onClick, disabled, outline, small, icon:Icon, shadow }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-md transition w-full
      ${outline ? 'bg-white border-black text-black border-2' : 'bg-rose-500 border-rose-500 text-white hover:opacity-80'} ${small ? 'text-sm font-semibold py-2' : 'text-sm font-semibold py-2 border-2'} ${shadow ? 'shadow-sm' : ''}`}   
    >
      {Icon && (
        <Icon size={24} className="absolute left-4 top-1/2 transform -translate-y-1/2" />
      )}
      {label}
    </button>
  )
}

export default Button