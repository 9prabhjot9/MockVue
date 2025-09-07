import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'


const MenueOption=[
    {
        name: 'Dashboard',
        path: '/dashboard'
    },
    {
        name: 'Upgrade',
        path: '/upgrade'
    },
    {
        name: 'How it works?',
        path: '/how-it-works'
    }

]

function AppHeader() {
  return (

    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <Image src={'/logo.svg'} alt="logo" width={30} height={30} />
        {/* <h1 className="text-base font-bold md:text-2xl">MockVue</h1> */}
      </div>
        <div>
            <ul className='flex gap-7 '>
                {MenueOption.map((option,index) => (
                    <li 
                    className='text-xl hover:scale-110 transition-all hover:cursor-pointer'
                    key={index}>
                        {option.name}
                    </li>
                ))}
            </ul>
        </div>
        <UserButton />     
    </nav>

  )
}

export default AppHeader
