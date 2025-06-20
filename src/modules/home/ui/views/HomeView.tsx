'use client'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

function HomeView({ }: Props) {

    const router = useRouter()
    const { data: session } = authClient.useSession()

    if (!session) {
        return <p>Loading...</p>
    }
    return (
        <Button onClick={() => {
            authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push('/sign-in')
                    }
                }
            })
        }}>
            Sign out
        </Button>
    )
}

export default HomeView