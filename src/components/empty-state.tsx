import Image from "next/image";

interface Props {
  title: string;
  description: string;
  image?: string;
}

export const EmptyState = ({
  title,
  description,
  image = "/empty.svg",
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 fade-in">
      <div className="mb-6 rounded-2xl bg-muted/50 p-8 backdrop-blur-sm border border-border/50">
        <Image
          src={image}
          alt="Empty"
          width={240}
          height={240}
          className="opacity-90"
        />
      </div>
      <div className="flex flex-col gap-3 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
