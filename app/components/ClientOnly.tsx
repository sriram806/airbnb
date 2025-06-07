'use client';

import  { useEffect, useState } from 'react'

interface childrenProps {
    children: React.ReactNode;
}

function ClientOnly({ children }: childrenProps) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(()=>{
        setHasMounted(true);
    }, [])

    if (!hasMounted){
        return null;
    }

  return (
    <div>
        {children}
    </div>
  )
}

export default ClientOnly