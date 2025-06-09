'use client';

import { useState, useCallback } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModel from '@/app/hooks/useLoginModel';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

function UserMenu({ currentUser }: UserMenuProps) {
    const registerModel = useRegisterModal();
    const loginModel = useLoginModel();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className='relative '>
            <div className="flex flex-row items-center gap-3">
                <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Airbnb your home
                </div>
                <div onClick={toggleMenu} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full hover:shadow-md transition cursor-pointer">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute right-0 top-12 w-[40vw] md:w-3/4 bg-white rounded-lg shadow-md overflow-hidden text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() => { }}
                                    label="My Trips"
                                />
                                <MenuItem
                                    onClick={() => { }}
                                    label="My Favourites"
                                />
                                <MenuItem
                                    onClick={() => { }}
                                    label="My Reservations"
                                />
                                <MenuItem
                                    onClick={() => { }}
                                    label="My Properties"
                                />
                                <MenuItem
                                    onClick={() => { }}
                                    label="Airbnb my Home"
                                />
                                <hr />
                                <MenuItem
                                    onClick={() => signOut()}
                                    label="Logout"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={() => { loginModel.onOpen() }}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={() => { registerModel.onOpen() }}
                                    label="Sign Up"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu