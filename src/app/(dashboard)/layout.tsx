import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardNavbar from '@/modules/dashboard/ui/views/DashboardNavbar'
import DashboardSideBar from '@/modules/dashboard/ui/views/DashboardSideBar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

function layout({ children }: Props) {
    return (
        <SidebarProvider>
            <DashboardSideBar />
            <main className='flex flex-col h-screen w-screen bg-muted'>
                <DashboardNavbar />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default layout