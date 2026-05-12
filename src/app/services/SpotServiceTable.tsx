const ROWS = [
  { service: "清掃代行", price: "4,500 円 / 時間" },
  { service: "リネン管理", price: "625 円 / ベッド" },
  { service: "緊急顧客対応", price: "5,000 円 / 回" },
  { service: "カスタム AI 開発", price: "別途見積" },
] as const;

export function SpotServiceTable() {
  return (
    <div>
      <table className="w-full text-sm">
        <caption className="sr-only">スポット発注 料金表</caption>
        <thead>
          <tr className="border-b border-ink-200">
            <th scope="col" className="py-3 text-left font-bold text-ink-700">
              サービス内容
            </th>
            <th scope="col" className="py-3 text-right font-bold text-ink-700">
              料金
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.service} className="border-b border-ink-100">
              <td className="py-3 text-ink-900">{row.service}</td>
              <td className="py-3 text-right text-ink-900 num">{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-ink-600">
        ※上記は宿泊業向けの料金です。飲食・ツアー向けのスポット対応についてはお問い合わせください。
      </p>
    </div>
  );
}
