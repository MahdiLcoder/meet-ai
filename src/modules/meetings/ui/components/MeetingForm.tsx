'use client'

import { useTRPC } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MeetingtGetOne } from '@/modules/agents/types';
import { meetingsInsertSchema } from '../../schemas';
import { useState } from 'react';
import CommandSelect from '@/components/CommandSelect';
import GeneratedAvatar from '@/components/GeneratedAvatar';
import NewAgentDialog from '@/modules/agents/ui/views/NewAgentDialog';

type Props = {
    onSucces?: (id: string) => void;
    onCancel?: () => void;
    initialValue?: MeetingtGetOne
}

function MeetingForm({ initialValue, onCancel, onSucces }: Props) {

    const [agentSearch, setAgentSearch] = useState("")
    const [openNewAgentDialog, seOpenNewAgentDialog] = useState(false)
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const agents = useQuery(trpc.agents.getMany.queryOptions({
        pageSize: 100,
        search: agentSearch
    }))
    const router = useRouter()
    const createMeeting = useMutation(trpc.meetings.create.mutationOptions({
        onSuccess: async (data) => {
            await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))

            onSucces?.(data.id)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }))

    const updateMeeting = useMutation(trpc.meetings.update.mutationOptions({
        onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
            if (initialValue?.id) {
                await queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({ id: initialValue.id }))
                router.push('/meetings')
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }))
    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
        defaultValues: {
            name: initialValue?.name ?? "",
            agentId: initialValue?.agentId ?? ""
        }
    })

    const isEdit = !!initialValue?.id;
    const isPending = createMeeting.isPending || updateMeeting.isPending

    const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
        if (isEdit) {
            updateMeeting.mutate({ ...values, id: initialValue.id })
        } else {
            createMeeting.mutate(values);
        }
    }
    return (
        <>
            <NewAgentDialog open={openNewAgentDialog} onOpenChange={seOpenNewAgentDialog} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='e.g. Math tuto' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}

                    />

                    <FormField
                        control={form.control}
                        name='agentId'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agent</FormLabel>
                                <FormControl>
                                    <CommandSelect
                                        options={(agents.data?.items ?? []).map((agent) => ({
                                            id: agent.id,
                                            value: agent.id,
                                            children: (
                                                <div className='flex items-center gap-x-2'>
                                                    <GeneratedAvatar seed={agent.name} variant='botttsNeutral' className='border size-6' />
                                                    <span>{agent.name}</span>
                                                </div>
                                            )
                                        }))}
                                        onSelect={field.onChange}
                                        onSearch={setAgentSearch}
                                        value={field.value}
                                        placeholder='Select an agent'
                                    />
                                </FormControl>
                                <FormDescription>
                                    Not found what you're looking for
                                    <Button type='button' variant={'outline'} className='text-primary border-0 hover:underline' onClick={() => seOpenNewAgentDialog(true)}>
                                        Create new Agent
                                    </Button>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}

                    />

                    <div className='flex justify-between gap-x-2'>
                        {onCancel && (
                            <Button
                                variant="ghost"
                                disabled={isPending}
                                type='button'
                                onClick={() => onCancel()}
                            >Cancel</Button>
                        )}

                        <Button
                            disabled={isPending}
                            type='submit'
                        >
                            {isEdit ? "Update" : "Create"}
                        </Button>

                    </div>
                </form>
            </Form>
        </>
    )
}

export default MeetingForm