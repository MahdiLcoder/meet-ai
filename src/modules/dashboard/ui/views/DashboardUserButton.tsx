'use client'

import GeneratedAvatar from '@/components/GeneratedAvatar'
import { AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon, CreditCardIcon, LogOutIcon, UserIcon, SettingsIcon } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

/**
 * Displays a user avatar button with a dropdown menu for user actions in the dashboard.
 *
 * Shows the current user's avatar, name, and email. The dropdown menu provides options for billing and signing out. If the user signs out, they are redirected to the sign-in page. Renders nothing while session data is loading or unavailable.
 */
function DashboardUserButton() {

    const { data, isPending } = authClient.useSession()
    const router = useRouter()

    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/sign-in')
                }
            }
        })
    }

    if (isPending || !data) {
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={
                cn(
                    "w-full rounded-lg p-3 flex items-center gap-3",
                    "border border-border/20 hover:border-border/40",
                    "bg-background/80 hover:bg-background/90",
                    "transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50"
                )
            }>
                {data.user.image ? (
                    <Avatar className="w-9 h-9 rounded-lg overflow-hidden border border-border/20">
                        <AvatarImage src={data.user.image} className="object-cover" />
                        <AvatarFallback className="bg-muted/50 flex items-center justify-center">
                            <UserIcon className="w-4 h-4 text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                ) : (
                    <GeneratedAvatar
                        seed={data.user.name}
                        variant='initials'
                        className='size-9 rounded-lg border border-border/20'
                    />
                )}

                <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium truncate text-foreground">
                        {data.user.name}
                    </p>
                    <p className="text-xs truncate text-muted-foreground">
                        {data.user.email}
                    </p>
                </div>

                <ChevronDownIcon className='w-4 h-4 shrink-0 text-muted-foreground' />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align='end'
                side='top'
                className={
                    cn(
                        "w-64 rounded-lg p-2 mt-1",
                        "border border-border/20 bg-background/95 backdrop-blur-sm",
                        "shadow-lg shadow-black/10",
                        "animate-in fade-in-80 zoom-in-95"
                    )
                }
            >
                <DropdownMenuLabel className="px-2 py-1.5">
                    <div className="flex flex-col">
                        <span className='font-medium text-foreground truncate'>
                            {data.user.name}
                        </span>
                        <span className='text-xs text-muted-foreground truncate'>
                            {data.user.email}
                        </span>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="h-px bg-border/20 my-1" />

                <DropdownMenuItem className={
                    cn(
                        "flex items-center gap-2 px-2 py-2 rounded-md",
                        "text-sm text-foreground",
                        "hover:bg-accent/50 hover:text-accent-foreground",
                        "focus:bg-accent/50 focus:text-accent-foreground",
                        "cursor-pointer transition-colors"
                    )
                }>
                    <CreditCardIcon className="w-4 h-4" />
                    Billing
                </DropdownMenuItem>

                <DropdownMenuSeparator className="h-px bg-border/20 my-1" />

                <DropdownMenuItem onClick={onLogout} className={
                    cn(
                        "flex items-center gap-2 px-2 py-2 rounded-md",
                        "text-sm text-rose-600",
                        "hover:bg-rose-500/10 hover:text-rose-600",
                        "focus:bg-rose-500/10 focus:text-rose-600",
                        "cursor-pointer transition-colors"
                    )
                }>
                    <LogOutIcon className="w-4 h-4" />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DashboardUserButton