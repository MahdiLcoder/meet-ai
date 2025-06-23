import EmptyState from "@/components/EmptyState"


function ProcessingState() {
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center
justify-center">
            <EmptyState
                image="/prcessing.svg"
                title="Meeting cancelled"
                description="this meeting was completed, a summary will appear soon"
            />
        </div>
    )
}

export default ProcessingState