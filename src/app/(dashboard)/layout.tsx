import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardSideBar from '@/modules/dashboard/ui/views/DashboardSideBar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

/**
 * Provides a dashboard layout with a sidebar and main content area.
 *
 * Wraps the given children in a layout that includes a sidebar and a flexbox-styled main section occupying the full viewport.
 *
 * @param children - The content to display within the main area of the dashboard layout
 * @returns The composed dashboard layout with sidebar and main content
 */
function layout({ children }: Props) {
    return (
        <SidebarProvider>
            <DashboardSideBar />
            <main className='flex flex-col h-screen w-screen bg-muted'>
                {children}
            </main>
        </SidebarProvider>
    )
}

export default layout