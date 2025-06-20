import React from 'react'
import { SignInView } from '@/modules/auth/ui/views/SignInView'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

async function page() {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!!session) {
        redirect('/')
    }
    return (
        <SignInView />
    )
}

export default page