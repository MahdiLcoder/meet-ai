import ResponsiveDialog from '@/components/ResponsiveDialog';
import React from 'react'
import AgentForm from './AgentForm';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void
}

function NewAgentDialog({ open, onOpenChange }: Props) {
    return (
        <ResponsiveDialog title='New Agent' description='Create a new Agent' open={open} onOpenChange={onOpenChange}>
            <AgentForm onSucces={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} />
        </ResponsiveDialog>
    )
}

export default NewAgentDialog