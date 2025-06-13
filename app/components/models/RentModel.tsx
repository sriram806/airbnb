'use client';

import useRentModal from '@/app/hooks/useRent'
import Modal from './Modal'
import { useMemo, useState } from 'react';
import Heading from '../Heading';
import { categories } from '../navbar/Catagories';
import CategoryInput from '../input/CategoryInput';
import { FieldValues, useForm, Path } from 'react-hook-form';
import CountrySelect from '../input/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../input/Counter';
import ImageUpload from '../input/ImageUpload';
import Input from '../input/Input';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

interface FormData extends FieldValues {
    category: string;
    location: any;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    imageSrc: string;
    price: number;
    title: string;
    description: string;
}

function RentModal() {
    const router = useRouter();
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
        trigger
    } = useForm<FormData>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');
    const title = watch('title');
    const description = watch('description');
    const price = watch('price');

    const setCustomValue = (id: keyof FormData, value: any) => {
        setValue(id as Path<FormData>, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    };

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = async () => {
        const isValid = await trigger();
        if (!isValid) {
            toast.error('Please fill in all required fields');
            return;
        }
        setStep((value) => value + 1);
    };

    const onSubmit = async (data: FormData) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        try {
            await axios.post('/api/listings', data);
            toast.success('Listing created successfully!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        } catch (error) {
            toast.error('Failed to create listing. Please try again.');
            console.error('Error creating listing:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title='Which of these best describes your place?'
                subtitle='Pick a category'
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                {categories.map((item) => (
                    <div key={item.label} className='col-span-1'>
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Where is your place located?'
                    subtitle='Help guests find you!'
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map 
                    center={location?.latlng} 
                    zoom={location ? 13 : 2}
                    scrollWheelZoom={true}
                    className='h-[35vh] rounded-lg border-2'
                />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Share some basics about your place'
                    subtitle='What amenities do you have?'
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr className='border-neutral-300' />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr className='border-neutral-300' />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        );
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Add a photo of your place'
                    subtitle='Show guests what your place looks like!'
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        );
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='How would you describe your place?'
                    subtitle='Short and sweet works best!'
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    value={title}
                    onChange={(value) => setCustomValue('title', value)}
                    errors={errors}
                    required
                />
                <hr className='border-neutral-300' />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    value={description}
                    onChange={(value) => setCustomValue('description', value)}
                    errors={errors}
                    required
                />
            </div>
        );
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Now, set your price'
                    subtitle='How much do you charge per night?'
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    value={price.toString()}
                    onChange={(value) => setCustomValue('price', parseInt(value))}
                    errors={errors}
                    required
                />
            </div>
        );
    }

    return (
        <Modal
            disabled={isLoading}
            isOpen={rentModal.isOpen}
            title="Airbnb your home!"
            actionLabel={actionLabel}
            onSubmit={handleSubmit(onSubmit)}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            onClose={rentModal.onClose}
            body={bodyContent}
        />
    );
}

export default RentModal;