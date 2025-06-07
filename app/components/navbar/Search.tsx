import React from 'react'
import { BiSearch } from 'react-icons/bi'

function Search() {
    return (
        <div className='border-[1px] border-amber-50 w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>
            <div className='flex flex-row items-center justify-between'>
                <div className='text-sm font-semibold px-6'>
                    Anywhere
                </div>
                <div className='hidden text-sm sm:block font-semibold px-6 border-x-[1px] border-amber-50 flex-1 text-center'>
                    Any Week
                </div>
                <div className='text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3'>
                    <div className='hidden sm:block'>Add Guests</div>
                    <div className='p-2 bg-rose-500 rounded-full text-white'>
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search