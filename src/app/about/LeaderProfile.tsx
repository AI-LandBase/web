export function LeaderProfile() {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col gap-8 md:flex-row md:items-start">
      <div className="mx-auto h-40 w-40 shrink-0 rounded-full bg-gradient-to-br from-paper-sky to-ink-100 md:mx-0" />
      <div>
        <h3 className="text-xl font-bold">末永壽蔵</h3>
        <p className="mt-1 text-sm text-ink-500">
          すえなが としぞう / 代表取締役
        </p>
        <div className="mt-4 space-y-3 text-base leading-relaxed text-ink-600">
          <p>
            AI.LandBase
            代表。沖縄県今帰仁村を拠点に、地域の観光業事業者が AI
            テクノロジーを身近に活用できる環境づくりに取り組んでいます。
          </p>
          <p>
            自らも宿泊施設「Ikigai
            Stay」を運営し、AI Suite
            を使った経営の実践者でもあります。テクノロジーと現場の距離を縮め、沖縄北部の観光業を次のステージへ導くことを目指しています。
          </p>
        </div>
      </div>
    </div>
  );
}
