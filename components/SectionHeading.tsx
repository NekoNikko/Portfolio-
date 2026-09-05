export default function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-3">
        {kicker}
      </p>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-muted leading-relaxed">{description}</p>
      )}
    </div>
  );
}