import type { LucideIcon } from "lucide-react";

type IconCardProps = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export function IconCard({ icon: Icon, title, body }: IconCardProps) {
  return (
    <li className="flex gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ink-100">
        <Icon size={28} strokeWidth={1.5} className="text-ink-800" aria-hidden="true" />
      </div>
      <div className="md:mt-4">
        <h3 className="text-base font-bold leading-snug">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-600 md:mt-2">
          {body}
        </p>
      </div>
    </li>
  );
}
