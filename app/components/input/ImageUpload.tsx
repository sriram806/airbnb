'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => onChange(e.target?.result as string);
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
  });

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="airbnb"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => (
        <div
          {...getRootProps()}
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            open?.();
          }}
          className={`relative cursor-pointer rounded-xl border-2 border-dashed p-10 transition duration-200 flex flex-col items-center justify-center gap-4 ${
            isDragActive
              ? 'border-blue-400 bg-blue-50 text-blue-600'
              : 'border-neutral-300 bg-muted/20 text-neutral-600'
          } hover:opacity-80`}
        >
          <input {...getInputProps()} />
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">Click or Drag to Upload</div>
          {value && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                alt="Uploaded Image"
                src={value}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
