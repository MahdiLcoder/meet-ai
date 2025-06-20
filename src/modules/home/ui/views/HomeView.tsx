
'use client'

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

function HomeView() {

    const trpc = useTRPC();
    const greeting = useQuery(trpc.hello.queryOptions({ text: 'hhhh' }));
    if (!greeting.data) return <div>Loading...</div>;
    return <div>{greeting.data.greeting}</div>;
}


export default HomeView