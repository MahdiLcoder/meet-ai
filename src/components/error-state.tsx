import { AlertCircleIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="py-12 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-card to-card/50 rounded-2xl p-12 shadow-lg border border-destructive/20 fade-in max-w-md">
        <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
          <AlertCircleIcon className="size-8 text-destructive" />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
