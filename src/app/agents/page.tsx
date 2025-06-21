import LoadingState from '@/components/LoadingState'
import AgentsView, { AgentsViewError, AgentsViewLoading } from '@/modules/agents/ui/views/AgentsView'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import React, { Suspense } from 'react'

type Props = {}

async function page({ }: Props) {

    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())
    return (

        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsViewLoading />}>
                <ErrorBoundary errorComponent={AgentsViewError}>
                    <AgentsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default page