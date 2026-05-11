type MissionBlockProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function MissionBlock({ eyebrow, title, body }: MissionBlockProps) {
  return (
    <div className="mx-auto max-w-[720px]">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-ink-500">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-xl font-bold leading-snug md:text-2xl">
        {title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-ink-600">{body}</p>
    </div>
  );
}
