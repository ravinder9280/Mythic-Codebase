import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { SidebarProvider } from '~/components/ui/sidebar'
import {AppSidebar} from './app-sidebar'
import { cookies } from 'next/headers'

type Props = {
    children:React.ReactNode
}

const SlidebarLayout= async({children}: Props) => {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "false"
 

  return (
    <SidebarProvider 
    defaultOpen={defaultOpen}
    
    >
        <AppSidebar  />

        {/* Approuter */}
        <main className='w-full m-2'>
            <div className="flex items-center gap-2 border-sidebar bg-sidebar  shadow rounded-m p-2 px-4">
            {/* searchbar */}
            <div className="ml-auto"></div>
            <UserButton/>
            </div>
            <div className="h-4"></div>
            {/* main content
             */}
             <div className="border-sidebar-border bg-sidebar  shadow rounded-md overflow-y-scroll h-[calc(100vh-6rem)] p-4">
                {children}
             </div>

        </main>
             
    </SidebarProvider>
  )
}

export default SlidebarLayout 