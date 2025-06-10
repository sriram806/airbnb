'use client';

import { IconType } from 'react-icons/lib';

interface CategoryInputProps{
    icon:IconType;
    label: string;
    selected: boolean;
    onClick: (value: string)=> void;
}
function CategoryInput({icon:Icon,label,selected,onClick}:CategoryInputProps) {
  return (
    <div onClick={()=> onClick(label)} className={`rounded border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${selected ? 'border-black': 'border-neutral-200'}`}>
        <Icon size={30} />
        <div className='font-semibold'>{label}</div>
    </div>
  )
}

export default CategoryInput