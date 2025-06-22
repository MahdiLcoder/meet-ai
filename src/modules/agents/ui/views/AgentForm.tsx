'use client'

import { AgentGetOne } from '../../types';
import { useTRPC } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { agentsInsertSchema } from '../../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import GeneratedAvatar from '@/components/GeneratedAvatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Props = {
    onSucces?: () => void;
    onCancel?: () => void;
    initialValue?: AgentGetOne
}

function AgentForm({ initialValue, onCancel, onSucces }: Props) {

    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const router = useRouter()
    const createAgent = useMutation(trpc.agents.create.mutationOptions({
        onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}))
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }))

    const updateAgent = useMutation(trpc.agents.update.mutationOptions({
        onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}))
            if (initialValue?.id) {
                await queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: initialValue.id }))
                router.push('/agents')
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }))
    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValue?.name ?? "",
            instructions: initialValue?.instuctions ?? ""
        }
    })

    const isEdit = !!initialValue?.id;
    const isPending = createAgent.isPending || updateAgent.isPending

    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
        if (isEdit) {
            updateAgent.mutate({ ...values, id: initialValue.id })
        } else {
            createAgent.mutate(values, {
                onSuccess: () => {
                    if (onSucces) onSucces();
                }
            });
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <GeneratedAvatar seed={form.watch("name")} variant='botttsNeutral' className='border size-16' />
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
                    name='instructions'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder='You are helpful math assistant that can answer questions and help with assingments' />
                            </FormControl>
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
    )
}

export default AgentForm