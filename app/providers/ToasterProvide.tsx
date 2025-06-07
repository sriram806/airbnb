'use client';

import { Toaster} from 'react-hot-toast';

function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        className: '',
        style: {
          background: '#fff',
          color: '#000',
        },
      }}
    />
  );
}

export default ToasterProvider;