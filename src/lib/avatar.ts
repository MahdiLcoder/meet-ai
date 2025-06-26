import { createAvatar } from "@dicebear/core"
import { botttsNeutral, initials } from "@dicebear/collection"

type Props = {
    seed: string;
    className?: string;
    variant: "botttsNeutral" | "initials"
}

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
    return avatar.toDataUri()
}

export default GeneratedAvatar

