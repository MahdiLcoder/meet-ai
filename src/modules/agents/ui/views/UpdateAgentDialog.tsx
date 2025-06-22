import ResponsiveDialog from '@/components/ResponsiveDialog';
import React from 'react'
import AgentForm from './AgentForm';
import { AgentGetOne } from '../../types';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AgentGetOne
}

function UpdateAgentDialog({ open, onOpenChange, initialValues }: Props) {
    return (
        <ResponsiveDialog title='Edit Agent' description='Edit the agent details' open={open} onOpenChange={onOpenChange}>
            <AgentForm onSucces={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} initialValue={initialValues} />
        </ResponsiveDialog>
    )
}

export default UpdateAgentDialog