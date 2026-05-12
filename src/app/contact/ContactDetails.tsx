import { EmailText } from "@/components/layout/EmailText";

export function ContactDetails() {
  return (
    <div className="mx-auto grid max-w-[720px] gap-8 md:grid-cols-2">
      {/* Email */}
      <div>
        <h3 className="text-sm font-bold text-ink-700">メールアドレス</h3>
        <EmailText as="p" className="mt-2 text-base text-ink-900" />
        <p className="mt-2 text-xs text-ink-500">
          件名で内容を判別して、担当が確認します。
        </p>
      </div>

      {/* Location */}
      <div>
        <h3 className="text-sm font-bold text-ink-700">所在地</h3>
        <p className="mt-2 text-base leading-relaxed text-ink-900">
          〒905-0412
          <br />
          沖縄県国頭郡今帰仁村湧川 852-2
        </p>
        <p className="mt-2 text-xs text-ink-500">
          沖縄北部・Ikigai Stay（ブルーゾーン）が拠点です。
        </p>
      </div>
    </div>
  );
}
