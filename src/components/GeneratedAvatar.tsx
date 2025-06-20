import React from 'react'
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createAvatar } from "@dicebear/core"
import { botttsNeutral, initials } from "@dicebear/collection"

type Props = {
    seed: string;
    className?: string;
    variant: "botttsNeutral" | "initials"
}

/**
 * Renders an avatar image generated from a seed string using the specified style variant.
 *
 * Depending on the `variant` prop, the avatar is generated using either the "botttsNeutral" or "initials" style from the Dicebear library. If the image fails to load, the component displays the capitalized first character of the seed as a fallback.
 *
 * @param seed - The string used to generate a unique avatar image
 * @param variant - The avatar style variant, either "botttsNeutral" or "initials"
 * @param className - Optional additional CSS classes for the avatar container
 * @returns A React element displaying the generated avatar image or a fallback character
 */
function GeneratedAvatar({ seed, variant, className }: Props) {

    let avatar;
    if (variant === "botttsNeutral") {
        avatar = createAvatar(botttsNeutral, {
            seed
        })
    } else {
        avatar = createAvatar(initials, {
            seed,
            fontWeight: 500,
            fontSize: 42
        })
    }
    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt='avatar' />
            <AvatarFallback>
                {seed.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}

export default GeneratedAvatar

