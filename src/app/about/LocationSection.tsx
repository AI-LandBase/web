import Image from "next/image";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";

export function LocationSection() {
  return (
    <Section>
      <SectionHeading title="拠点紹介 — Ikigai Stay" />
      <div className="mx-auto max-w-[720px]">
        <div className="space-y-4 text-base leading-relaxed text-ink-600">
          <p>
            AI.LandBase の拠点「Ikigai Stay」は、沖縄県今帰仁村にある宿泊施設です。世界有数の長寿地域として知られる「ブルーゾーン」に位置し、自然に囲まれた環境の中で営業しています。
          </p>
          <p>
            この施設では、LandBase AI Suite の全 10 ツールを日常的に運用しています。客室の価格調整から清掃スケジュール管理、経理処理まで——自分たちが毎日使いながら改善を重ねることで、現場で本当に役立つツールを育てています。
          </p>
          <p>
            お客様にご提案するサービスは、すべてこの Ikigai Stay での実体験に裏付けられています。
          </p>
        </div>
        <div className="mt-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src="/images/ikigai-stay.jpg"
              alt="Ikigai Stay — 沖縄県今帰仁村の自社宿泊施設"
              fill
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-sm text-ink-600">
            〒905-0412 沖縄県国頭郡今帰仁村湧川 852-2
          </p>
        </div>
      </div>
    </Section>
  );
}
