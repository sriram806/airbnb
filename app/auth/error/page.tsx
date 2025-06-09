'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import Button from '@/app/components/button';

const ErrorPage = () => {
    const searchParams = useSearchParams();
    const error = searchParams?.get('error');

    const handleSignIn = useCallback((provider: string) => {
        signIn(provider, { callbackUrl: '/' });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
                <p className="text-gray-600 mb-6">
                    {error === 'OAuthAccountNotLinked'
                        ? 'To confirm your identity, sign in with the same account you used originally.'
                        : 'An error occurred during authentication. Please try again.'}
                </p>
                <div className="flex flex-col gap-4">
                    <Button
                        outline
                        label="Continue with Google"
                        icon={FcGoogle}
                        onClick={() => handleSignIn('google')}
                    />
                    <Button
                        outline
                        label="Continue with Github"
                        icon={AiFillGithub}
                        onClick={() => handleSignIn('github')}
                    />
                </div>
            </div>
        </div>
    );
};

export default ErrorPage; 