import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronRightIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type Props = {
    agentId: string;
    agentName: string;
    onEdit: () => void
    onRemove: () => void

}

function AgentIdViewHeader({ agentId, agentName, onEdit, onRemove }: Props) {
    return (
        <div className='flex items-center justify-between'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className='font-medium text-xl'>
                            <Link href={`/agents`}>
                                My Agents
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='text-foreground text-xl font-medium [&svg]:size-4'>
                        <ChevronRightIcon />
                    </BreadcrumbSeparator>

                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className='font-medium text-xl text-foreground'>
                            <Link href={`/agents/${agentId}`}>
                                {agentName}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="ml-2 p-2 rounded-full hover:bg-muted transition-colors"
                        aria-label="More actions"
                    >
                        <MoreVerticalIcon className="size-5 text-muted-foreground" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="w-40 rounded-lg shadow-lg border bg-popover p-1"
                >
                    <DropdownMenuItem
                        onClick={onEdit}
                        className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-accent transition-colors"
                    >
                        <PencilIcon className="size-4 text-primary" />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onRemove}
                        className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-destructive/10 text-destructive transition-colors"
                    >
                        <TrashIcon className="size-4" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default AgentIdViewHeader