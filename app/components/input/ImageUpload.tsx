'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

function ImageUpload({
    onChange,
    value
}: ImageUploadProps) {
    const handleUpload = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onChange(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [onChange]);

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleUpload,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        }
    });

    return (
        <div
            {...getRootProps({
                className: 'w-full p-4 text-center border-2 border-dashed rounded-md hover:opacity-80 transition cursor-pointer'
            })}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-4">
                <TbPhotoPlus
                    size={50}
                    className="text-neutral-600"
                />
                <div className="font-semibold text-lg">
                    Click to upload
                </div>
            </div>
            {value && (
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        fill
                        style={{ objectFit: 'cover' }}
                        src={value}
                        alt="House"
                    />
                </div>
            )}
        </div>
    );
}

export default ImageUpload; 