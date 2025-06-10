'use client';

import useRentModel from '@/app/hooks/useRent'
import Modal from './Modal'

function RentModel() {
    const RentModel = useRentModel();
  return (
    <div>
        <Modal 
        isOpen={RentModel.isOpen}
        onClose={RentModel.onClose}
        onSubmit={RentModel.onClose}
        actionLabel='Submit'
        title='Airbnb your home'
        
        />
    </div>
  )
}

export default RentModel