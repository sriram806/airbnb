'use client';

import useRentModel from '@/app/hooks/useRent'
import Modal from './Modal'
import { useMemo, useState } from 'react';
import Heading from '../Heading';
import { categories } from '../navbar/Catagories';
import CategoryInput from '../input/CategoryInput';
import { Field, FieldValues, useForm } from 'react-hook-form';
import { title } from 'process';
import next from 'next';
import CountrySelect from '../input/CountrySelect';
import dynamic from 'next/dynamic';

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

function RentModel() {
    const RentModel = useRentModel();
    const [step, setStep] = useState(STEPS.CATEGORY);

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }

        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }

        return 'Back'
    }, [step]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
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
    })

    const category = watch('category');
    const location = watch('location');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title='Which of the best describe your place?'
                subtitle='Pick a Category'
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                {categories.map((item) => (
                    <div key={item.label} className='col-span-1'>
                        <CategoryInput
                            onClick={(category) =>
                                setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

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
        )
    }

    return (
        <div>
            <Modal
                isOpen={RentModel.isOpen}
                onClose={RentModel.onClose}
                onSubmit={onNext}
                actionLabel={actionLabel}
                secondaryActionLabel={secondaryActionLabel}
                secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
                title='Airbnb your home'
                body={bodyContent}
            />
        </div>
    )
}

export default RentModel