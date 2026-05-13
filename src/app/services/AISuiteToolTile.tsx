import {
  BarChart3,
  BadgeJapaneseYen,
  MessageCircle,
  Heart,
  Star,
  Megaphone,
  Settings,
  Receipt,
  Package,
  GraduationCap,
} from "lucide-react";
import type { AISuiteToolIcon } from "./_data";

const ICON_MAP = {
  BarChart3,
  BadgeJapaneseYen,
  MessageCircle,
  Heart,
  Star,
  Megaphone,
  Settings,
  Receipt,
  Package,
  GraduationCap,
} as const satisfies Record<AISuiteToolIcon, React.ComponentType<{ size?: number; className?: string }>>;

type AISuiteToolTileProps = {
  number: number;
  name: string;
  tagline: string;
  icon: AISuiteToolIcon;
  tags: readonly string[];
  description: string;
};

export function AISuiteToolTile({
  number,
  name,
  tagline,
  icon,
  tags,
  description,
}: AISuiteToolTileProps) {
  const Icon = ICON_MAP[icon];

  return (
    <div className="rounded-lg border border-ink-200 bg-paper-pure p-4">
      <div className="flex items-center gap-2">
        <Icon size={28} className="shrink-0 text-sea-600" aria-hidden="true" />
        <p className="text-xs font-bold text-ink-600">
          {String(number).padStart(2, "0")}
        </p>
      </div>
      <h3 className="mt-2 text-sm font-bold leading-snug text-ink-900">
        {name}
      </h3>
      <p className="mt-0.5 text-xs text-ink-600">{tagline}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-medium text-ink-600"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-ink-600">{description}</p>
    </div>
  );
}
