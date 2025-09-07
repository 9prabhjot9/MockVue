'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import React, { useState } from 'react'
import EmptyState from './EmptyState'

function Dashboard() {
    const {user} = useUser()
    const [interviewList, setInterviewList] = useState([])
  return (
    <div className='py-20 px-10 md:px-28 lg:px-44 xl:px-56'>
        <div className='flex justify-between items-center'>
            <div>
                <h2 className='tex-lg text-gray-600'>My Dashboard</h2>
                <h2 className='text-3xl font-bold'>Welcome, {user?.fullName} </h2>
            </div>
            <Button size={'lg'}> + Create Interview</Button>
        </div>
        <div>
            {interviewList.length == 0 &&
                 <EmptyState />
            }
        </div>

    </div>

  )
}

export default Dashboard
