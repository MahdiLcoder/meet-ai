"use client";

import { useState } from "react";
import { PlusIcon, XCircleIcon } from "lucide-react";

import { DEFAULT_PAGE } from "@/constants";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { NewAgentDialog } from "./new-agent-dialog";
import { AgentsSearchFilter } from "./agents-search-filter";
import { useAgentsFilters } from "../../hooks/use-agents-filters";

export const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex flex-col gap-6 fade-in">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              My Agents
            </h1>
            <p className="text-muted-foreground text-sm">
              Create and manage your AI agents for meetings
            </p>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold h-11 px-6"
          >
            <PlusIcon className="size-5" />
            New Agent
          </Button>
        </div>
        <ScrollArea className="w-full rounded-lg border border-border/50 bg-card/50 p-3">
          <div className="flex items-center gap-3">
            <AgentsSearchFilter />
            {isAnyFilterModified && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="ml-auto"
              >
                <XCircleIcon className="size-4" />
                Clear filters
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
