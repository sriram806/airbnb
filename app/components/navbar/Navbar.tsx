import React from 'react'
import Container from '../Container'
import Logo from './Logo'

function Navbar() {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className='py-4 border-b-[1px] border-white'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                    <Logo />
                    <div className='flex flex-row items-center gap-4'>
                        <div className='text-gray-500 hover:text-gray-800 cursor-pointer'>Login</div>
                        <div className='text-gray-500 hover:text-gray-800 cursor-pointer'>Sign Up</div>
                    </div>
                </div>
            </Container>
        </div>
    </div>
  )
}

export default Navbar