import React from 'react'
import { useRouter } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <div>
      <button onClick={handleBack} className="mr-4 p-2 shadow-md rounded-full">
        <FaChevronRight className="text-xl " />
      </button>
    </div>
  )
}


//last modified by Omar Marei 2/8/2024