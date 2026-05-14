import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";

type AsymmetricMediaSectionProps = {
  heading: string;
  body: string[];
  linkLabel: string;
  linkHref: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function AsymmetricMediaSection({
  heading,
  body,
  linkLabel,
  linkHref,
  imageSrc,
  imageAlt = "",
}: AsymmetricMediaSectionProps) {
  return (
    <section className="overflow-hidden py-12 md:py-16 lg:py-20">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          <div className="md:w-2/5">
            <h2 className="text-2xl font-bold leading-[1.3] md:text-3xl">
              {heading}
            </h2>
            <div className="mt-4 space-y-4">
              {body.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-ink-600"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              href={linkHref}
              className="mt-6 inline-block text-sm font-medium text-ink-800 hover:text-ink-900 hover:underline"
            >
              {linkLabel}
            </Link>
          </div>
          <div className="md:w-3/5">
            {imageSrc ? (
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg md:rounded-xl">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                className="aspect-[3/2] rounded-lg bg-gradient-to-br from-paper-sky to-ink-100 md:rounded-xl"
                role="presentation"
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
