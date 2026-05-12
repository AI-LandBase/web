type AISuiteToolTileProps = {
  number: number;
  name: string;
  tagline: string;
  tags: readonly string[];
  description: string;
};

export function AISuiteToolTile({
  number,
  name,
  tagline,
  tags,
  description,
}: AISuiteToolTileProps) {
  return (
    <div className="rounded-lg border border-ink-200 bg-paper-pure p-4">
      <p className="text-xs font-bold text-ink-600">
        {String(number).padStart(2, "0")}
      </p>
      <h3 className="mt-1 text-sm font-bold leading-snug text-ink-900">
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
