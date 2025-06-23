'use client'

import React from 'react';

import ErrorState from '@/components/ErrorState';
import LoadingState from '@/components/LoadingState';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/modules/agents/ui/views/DataTable';
import { columns } from '../components/colums';
import EmptyState from '@/components/EmptyState';

type Props = {}

function MeetingsView({ }: Props) {

    const trpc = useTRPC()
    const { data } = useQuery(trpc.meetings.getMany.queryOptions({}))
    return (
        <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4'>
            <DataTable data={data?.items ?? []} columns={columns} />
            {data?.items.length === 0 && (
                <EmptyState title="Create your first meeting" description="create your agent to join our your meetings" />
            )}
        </div>
    )
}

export default MeetingsView


export const MeetingsViewLoading = () => {

    return (
        <LoadingState title="Loading Meetings" description="This may take a few seconds" />
    )
}

export const MeetingsViewError = () => {

    return (
        <ErrorState title="Error Loading Meetings" description="Something went wrong" />
    )
}