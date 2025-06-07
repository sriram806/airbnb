'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps{
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  formatPrice?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

function Input({id, label, type = 'text', disabled, required, formatPrice, register, errors}: InputProps) {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute left-2 top-5 text-neutral-700"
        />
      )}
      <input
      id={id}
      disabled={disabled}
      {...register(id, { required })}
      type={type}
      className={`peer w-full p-2 pt-4 font-light bg-white border-2 rounded-sm outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${formatPrice ? 'pl-9' : 'pl-4'} ${errors[id] ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-neutral-500 focus:shadow-md'}`}
      />
      <label
      className={`absolute text-sm duration-150 transform -translate-y-2 top-3 z-10 origin-[0] ${formatPrice ? 'left-9' : 'left-4'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75 ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}`}
      htmlFor={id}
      >
        {label}
      </label>
    </div>
  )
}

export default Input
