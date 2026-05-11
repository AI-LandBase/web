import { cn } from "@/lib/cn";

type ContainerProps = {
  variant?: "default" | "narrow";
  className?: string;
  children: React.ReactNode;
};

export function Container({
  variant = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        variant === "default" && "max-w-[1200px]",
        variant === "narrow" && "max-w-[720px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
