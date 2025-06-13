'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { CldUploadWidget, CloudinaryUploadWidgetResults, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';
import { toast } from 'react-hot-toast';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = useCallback(
    (result: CloudinaryUploadWidgetResults) => {
      if (result.event === 'success') {
        const info = result.info as CloudinaryUploadWidgetInfo;
        if (info.secure_url) {
          onChange(info.secure_url);
          toast.success('Image uploaded successfully!');
        } else {
          toast.error('Failed to get image URL. Please try again.');
        }
        setIsUploading(false);
      } else if (result.event === 'error') {
        toast.error('Failed to upload image. Please try again.');
        setIsUploading(false);
      }
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          toast.error('File size too large. Please upload an image under 5MB.');
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            onChange(e.target.result as string);
          }
        };
        reader.onerror = () => {
          toast.error('Failed to read file. Please try again.');
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!uploadPreset) {
    console.warn('⚠️ NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is not defined in environment variables.');
  }

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset || ''}
      options={{
        maxFiles: 1,
        resourceType: 'image',
        sources: ['local', 'url', 'camera'],
        showAdvancedOptions: false,
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#90A0B3',
            tabIcon: '#0078FF',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#0E2F5A',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#E4EBF1',
          },
        },
      }}
    >
      {({ open }) => (
        <div
          {...getRootProps()}
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            if (!isUploading) {
              setIsUploading(true);
              if (typeof open === 'function') open();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (!isUploading) {
                setIsUploading(true);
                if (typeof open === 'function') open();
              }
            }
          }}
          className={`
            relative cursor-pointer rounded-xl border-2 border-dashed p-10 transition duration-200 
            flex flex-col items-center justify-center gap-4
            ${isDragActive ? 'border-blue-400 bg-blue-50 text-blue-600' : 'border-neutral-300'}
            ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-neutral-400'}
          `}
        >
          <input {...getInputProps()} disabled={isUploading} />
          <TbPhotoPlus size={50} className={isDragActive ? 'text-blue-500' : 'text-neutral-400'} />
          <div className="font-semibold text-lg">
            {isUploading ? 'Uploading...' : 'Click to upload'}
          </div>
          {value && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                fill
                style={{ objectFit: 'cover' }}
                src={value}
                alt="Uploaded image"
                className="rounded-xl"
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
