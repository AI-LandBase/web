import { Container } from "@/components/primitives/Container";
import { MailtoButton } from "./MailtoButton";

type CTASectionProps = {
  heading?: string;
  subheading?: string;
};

export function CTASection({
  heading = "まずは、ご相談からはじめませんか",
  subheading = "どんなご相談でもお気軽にご連絡ください。",
}: CTASectionProps) {
  return (
    <section className="bg-ink-900 py-16 md:py-20 lg:py-24">
      <Container className="text-center">
        <h2 className="text-[1.875rem] font-bold leading-[1.3] text-paper-pure md:text-[2.25rem]">
          {heading}
        </h2>
        <p className="mt-4 text-ink-200">{subheading}</p>
        <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <MailtoButton
            variant="onDark"
            size="lg"
            subject="[AI.LandBase] サービスに関するお問い合わせ"
          >
            サービスについて相談したい
          </MailtoButton>
          <MailtoButton
            variant="onDark"
            size="lg"
            subject="[AI.LandBase] 宿泊税対応についてのお問い合わせ"
          >
            宿泊税対応について聞きたい
          </MailtoButton>
          <MailtoButton
            variant="onDark"
            size="lg"
            subject="[AI.LandBase] その他のお問い合わせ"
          >
            その他のお問い合わせ
          </MailtoButton>
        </div>
      </Container>
    </section>
  );
}
