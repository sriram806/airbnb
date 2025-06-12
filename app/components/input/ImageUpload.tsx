'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onChange(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        maxFiles: 1
    });

    return (
        <div
            className="w-full"
        >
            <div
                {...getRootProps()}
                className={`
                    w-full
                    relative
                    cursor-pointer
                    hover:opacity-70
                    transition
                    border-dashed
                    border-2
                    p-20
                    border-neutral-300
                    flex
                    flex-col
                    justify-center
                    items-center
                    gap-4
                    text-neutral-600
                    ${isDragActive ? 'border-rose-500' : ''}
                `}
            >
                <input {...getInputProps()} />
                <TbPhotoPlus size={50} />
                <div className="font-semibold text-lg">
                    Click to upload or drag and drop
                </div>
                {value && (
                    <div
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            fill
                            style={{ objectFit: 'cover' }}
                            src={value}
                            alt="Upload"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImageUpload; 