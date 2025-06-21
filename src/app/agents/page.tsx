import LoadingState from '@/components/LoadingState'
import AgentsView, { AgentsViewError, AgentsViewLoading } from '@/modules/agents/ui/views/AgentsView'
import AgentsListHeader from '@/modules/agents/ui/views/AgentsListHeader'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import React, { Suspense } from 'react'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

type Props = {}

async function page({ }: Props) {

    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        redirect('/sign-in')
    }
    return (
        <>
            <AgentsListHeader />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<AgentsViewLoading />}>
                    <ErrorBoundary errorComponent={AgentsViewError}>
                        <AgentsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default page