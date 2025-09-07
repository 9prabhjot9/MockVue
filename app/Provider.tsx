"use client"

import React, { createContext, useEffect, useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from '@/context/UserDetailContext'

const Provider = ({children}:any) => {

    const {user} = useUser()
    const CreateUser = useMutation(api.users.CreateNewUser)
    const [userDetail, setUserDetail] = useState<any>()

    useEffect(()=> {
        user&&CreateNewUser()
    },[user])

    const CreateNewUser = async() => {
        if(user){
            const result = await CreateUser({
                email: user?.primaryEmailAddress?.emailAddress??'',
                name: user?.fullName??'',
                imageUrl: user?.imageUrl
            }) 
            console.log(result)
            setUserDetail(result)
        }
    }

  return (
   
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
        <div>
            {children}
        </div>
    </UserDetailContext.Provider>
    
  )
}

export default Provider

export const useUserDetailContext=() => {
    return createContext(UserDetailContext)
}
