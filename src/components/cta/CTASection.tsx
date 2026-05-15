import { Container } from "@/components/primitives/Container";
import { MailtoButton } from "./MailtoButton";

type CTAButton = {
  label: string;
  subject: string;
};

const DEFAULT_BUTTONS: CTAButton[] = [
  { label: "サービスについて相談したい", subject: "[AI.LandBase] サービスに関するお問い合わせ" },
  { label: "宿泊税対応について聞きたい", subject: "[AI.LandBase] 宿泊税対応についてのお問い合わせ" },
  { label: "その他のお問い合わせ", subject: "[AI.LandBase] その他のお問い合わせ" },
];

type CTASectionProps = {
  heading?: string;
  subheading?: string;
  buttons?: CTAButton[];
};

export function CTASection({
  heading = "まずは、ご相談からはじめませんか",
  subheading = "どんなご相談でもお気軽にご連絡ください。",
  buttons = DEFAULT_BUTTONS,
}: CTASectionProps) {
  return (
    <section className="bg-ink-900 py-8 md:py-12 lg:py-14">
      <Container className="text-center">
        <h2 className="text-[1.875rem] font-bold leading-[1.3] text-paper-pure md:text-[2.25rem]">
          {heading}
        </h2>
        <p className="mt-4 text-ink-200">{subheading}</p>
        <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-center">
          {buttons.map((btn, index) => (
            <MailtoButton
              key={btn.subject}
              variant="onDark"
              size="lg"
              subject={btn.subject}
              ctaId={`cta-section-${index}`}
            >
              {btn.label}
            </MailtoButton>
          ))}
        </div>
      </Container>
    </section>
  );
}
