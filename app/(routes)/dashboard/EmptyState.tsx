import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
function EmptyState() {
  return (
    <div className='mt-14 flex flex-col items-center gap-5 bg-slate-50 rounded-2xl border-dashed p-10 border-4'>
        <Image src={'/interview.png'} alt='emptyState' width={200} height={200} />

        <h2 className='mt-2 text-lg text-gray-500'>You do not have an interview</h2>
        <Button>+ Create</Button>
    </div>

  )
}

export default EmptyState
