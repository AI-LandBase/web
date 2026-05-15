import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import { MailtoButton } from "@/components/cta/MailtoButton";

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
            className="object-cover brightness-110 contrast-105 saturate-125"
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-ink-800 to-ink-950"
            role="presentation"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
        <Container className="relative flex min-h-[540px] items-center md:min-h-[640px]">
          <div className="max-w-[28rem] py-16 md:max-w-[36rem] md:py-20">
            <h1 className="text-4xl font-bold leading-[1.3] text-ink-900 md:text-5xl">
              {headline}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-700">
              {lead}
            </p>
            {cta && (
              <div className="mt-8">
                <MailtoButton
                  variant="primary"
                  size="lg"
                  subject={cta.subject}
                  ctaId="hero"
                >
                  {cta.label}
                </MailtoButton>
                {cta.caption && (
                  <p className="mt-3 text-sm text-ink-500">
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
    <section className="bg-ink-100 py-16 md:py-20 lg:py-24">
      <Container>
        <div className="max-w-[48rem]">
          <h1 className="text-4xl font-bold leading-[1.3] text-ink-900 md:text-5xl">
            {headline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-700">{lead}</p>
        </div>
      </Container>
    </section>
  );
}
