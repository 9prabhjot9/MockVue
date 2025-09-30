'use client'

import { useConvex } from 'convex/react'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { api } from '@/convex/_generated/api'


function StartInterview() {

    const {interviewId} = useParams()
    const convex = useConvex()

    useEffect(() => {
        GetInterviewQuestions
    },[interviewId])    

    const GetInterviewQuestions = async() => {
        const result = await convex.query(api.Interview.GetInterviewQuestions,{
            //@ts-ignore
            interviewRecordId: interviewId
        })
        
    }
    
    return (
    <div>
      StartInterview
    </div>
  )
}

export default StartInterview
