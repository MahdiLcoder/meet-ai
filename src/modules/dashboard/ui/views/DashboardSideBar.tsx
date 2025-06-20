'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { BotIcon, StarIcon, VideoIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "@/assets/logo.svg"
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import DashboardUserButton from './DashboardUserButton'

type Props = {}

const firstSection = [
    {
        icon: VideoIcon,
        label: "Meatings",
        href: "/meatings"
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents"
    },
]
const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade"
    },
]
/**
 * Renders the sidebar navigation for the dashboard, including logo, navigation links, and user controls.
 *
 * The sidebar displays grouped navigation items with active state highlighting based on the current route, and includes a footer with user-related actions.
 */
function DashboardSideBar({ }: Props) {

    const pathName = usePathname()
    return (
        <Sidebar>
            <SidebarHeader className='text-sidebar-accent-foreground'>
                <Link href={`/`} className='flex items-center gap-2 px-2 pt-2'>
                    <Image src={logo} width={36} height={36} alt='logo' />
                    <p className="text-2xl font-semibold">Meet.AI</p>
                </Link>
            </SidebarHeader>
            <Separator className='opcity-10 text-[#5D6B68]' />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50", pathName === item.href && 'bg-linear-to-r/oklch border-[#5D6B68]/10 ')} asChild
                                        isActive={pathName === item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className='size-5' />
                                            <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <Separator className='opcity-10 text-[#5D6B68]' />

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50", pathName === item.href && 'bg-linear-to-r/oklch border-[#5D6B68]/10 ')} asChild
                                        isActive={pathName === item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className='size-5' />
                                            <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className='text-white'>
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    )
}

export default DashboardSideBar