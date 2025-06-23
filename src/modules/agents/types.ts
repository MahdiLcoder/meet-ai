import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app"

export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"]
export type AgentGetMany = inferRouterOutputs<AppRouter>["agents"]["getMany"]["items"]
export type MeetingtGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"]
export type MeetingGetMany = inferRouterOutputs<AppRouter>["meetings"]["getMany"]