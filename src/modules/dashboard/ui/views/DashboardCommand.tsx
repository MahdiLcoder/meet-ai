import { CommandDialog, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

function DashboardCommand({ open, setOpen }: Props) {
    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder='Find a meeting or agent' />
            <CommandList>
                <CommandItem>
                    Test 1
                </CommandItem>
                <CommandItem>
                    Test 2
                </CommandItem>
            </CommandList>
        </CommandDialog>
    )
}

export default DashboardCommand