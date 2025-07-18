import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types'
import Catagories from './Catagories'

interface NavbarProps {
  currentUser?: SafeUser | null;
}

function Navbar({currentUser}:NavbarProps) {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className='py-4 border-b-[1px] border-white'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                    <Logo />
                    <Search />
                    <UserMenu currentUser={currentUser} />
                </div>
            </Container>
        </div>
        <Catagories />
    </div>
  )
}

export default Navbar