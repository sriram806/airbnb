'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import {signIn} from 'next-auth/react';

import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import useLoginModel from '@/app/hooks/useLoginModel';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../input/Input';
import toast from 'react-hot-toast';
import Button from '../button';
import { useRouter } from 'next/navigation';

function LoginModel() {
    const router = useRouter();
    const loginModel = useLoginModel();
    const registerModel = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback)=>{
            setIsLoading(false);

            if(callback ?.ok){
                toast.success("Logged In");
                router.refresh();
                loginModel.onClose();
            }

            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome back Airbnb' subtitle='Login to your account' center />
            <Input 
            id='email'
            label='Email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
            <Input 
            id='password'
            label='Password'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr className='border-1 border-neutral-200' />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => {}} />
            <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => {}} />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <p>Already have an account? 
                    <span 
                        onClick={loginModel.onClose} 
                        className='text-neutral-800 cursor-pointer hover:underline'
                    >
                        Log in
                    </span>
                </p>
            </div>
        </div>
    )

    return (
        <Modal
            disabled= {isLoading}
            isOpen={loginModel.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModel.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModel;
