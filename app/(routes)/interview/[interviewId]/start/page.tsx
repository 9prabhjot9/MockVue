'use client'

import { useConvex } from 'convex/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { api } from '@/convex/_generated/api'


type InterviewData={
    JobDescription?: string | null
    jobTitle?: string | null
    interviewQuestions: Question[]
}

type Question={
  answer: string
  question: string
}

function StartInterview() {

    const {interviewId} = useParams()
    const convex = useConvex()
    const[interviewData, setInterviewData] = useState<InterviewData>()
    useEffect(() => {
        GetInterviewQuestions()
    },[interviewId])    

    const GetInterviewQuestions = async() => {
        const result = await convex.query(api.Interview.GetInterviewQuestions,{
            //@ts-ignore
            interviewRecordId: interviewId
        })
        console.log(result)
        setInterviewData(result)   
    }
    
    return (
    <div>
      StartInterview
    </div>
  )
}

export default StartInterview
