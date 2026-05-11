import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import { MailtoButton } from "@/components/cta/MailtoButton";
import { cn } from "@/lib/cn";

type HeroProps = {
  variant: "media" | "soft";
  headline: string;
  lead: string;
  imageSrc?: string;
  cta?: {
    label: string;
    subject: string;
    caption?: string;
  };
};

export function Hero({ variant, headline, lead, imageSrc, cta }: HeroProps) {
  if (variant === "media") {
    return (
      <section className="relative">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt=""
            role="presentation"
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-ink-800 to-ink-950"
            role="presentation"
          />
        )}
        <div className="absolute inset-0 bg-black/24" />
        <Container className="relative flex min-h-[540px] items-center md:min-h-[640px]">
          <div className="max-w-[28rem] py-16 md:max-w-[36rem] md:py-20">
            <h1 className="text-4xl font-bold leading-[1.3] text-paper-pure md:text-5xl">
              {headline}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-paper-pure/90">
              {lead}
            </p>
            {cta && (
              <div className="mt-8">
                <MailtoButton variant="onDark" size="lg" subject={cta.subject}>
                  {cta.label}
                </MailtoButton>
                {cta.caption && (
                  <p className="mt-3 text-sm text-paper-pure/70">
                    {cta.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "bg-gradient-to-br from-paper-mist to-paper-sky",
        "py-16 md:py-20 lg:py-24",
      )}
    >
      <Container>
        <div className="max-w-[36rem]">
          <h1 className="text-4xl font-bold leading-[1.3] md:text-5xl">
            {headline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-700">{lead}</p>
        </div>
      </Container>
    </section>
  );
}
