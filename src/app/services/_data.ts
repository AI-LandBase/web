export type PlanVariant = "standard" | "professional" | "server";

export type PlanData = {
  id: string;
  variant: PlanVariant;
  name: string;
  shortName: string;
  priceLabel: string;
  priceNote?: string;
  description: string;
  features: readonly string[];
  targetIndustry: string;
  subject: string;
  useCases?: readonly string[];
  note?: string;
  externalLink?: { label: string; href: string };
  comparison: {
    format: string;
    audience: string;
    aiSuite: string;
    support: string;
  };
};

export const PLANS: readonly PlanData[] = [
  {
    id: "standard",
    variant: "standard",
    name: "スタンダードプラン",
    shortName: "スタンダード",
    priceLabel: "月額 5 万円",
    description:
      "LandBase AI Suite を活用しながら、毎月のオンライン面談で経営の数字を一緒に振り返り、改善策を考えるプランです。AI ツールの導入だけでなく、データの読み方や活かし方まで伴走します。まずは小さく始めたい方におすすめです。",
    features: [
      "LandBase AI Suite の利用（10 ツール）",
      "デジタルマーケティング支援（SNS 運用・Web 集客のアドバイス）",
      "競合・市場分析レポート",
      "月次オンライン面談（1 回 / 月）",
    ],
    targetIndustry: "宿泊施設 / 飲食店 / ツアー・アクティビティ会社",
    subject: "[AI.LandBase] スタンダードプランに関するお問い合わせ",
    comparison: {
      format: "月額制（サブスクリプション）",
      audience: "AI ツールを試してみたい方",
      aiSuite: "ソフト利用",
      support: "月次オンライン面談",
    },
  },
  {
    id: "professional",
    variant: "professional",
    name: "プロフェッショナルプラン",
    shortName: "プロフェッショナル",
    priceLabel: "個別見積",
    description:
      "スタンダードプランの内容に加え、現地での経営指導やカスタム AI 開発を含む包括的なプランです。「AI ツールだけでなく、経営全体を一緒に見直したい」という方に向いています。",
    features: [
      "LandBase AI Suite の利用（10 ツール）",
      "包括的な経営改善コンサルティング",
      "AI を活用した予約・業務管理の仕組みづくり",
      "現地での経営指導・オペレーション改善",
      "カスタム AI ツールの開発",
      "オンライン + 対面でのサポート",
    ],
    targetIndustry: "宿泊施設 / 飲食店 / ツアー・アクティビティ会社",
    subject: "[AI.LandBase] プロフェッショナルプランに関するお問い合わせ",
    comparison: {
      format: "個別見積（法人・団体向け）",
      audience: "経営全体の改善に取り組みたい方",
      aiSuite: "ソフト利用 + カスタム開発",
      support: "現地指導 + オンライン",
    },
  },
  {
    id: "server",
    variant: "server",
    name: "AI Suite Server プラン",
    shortName: "AI Suite Server",
    priceLabel: "¥1,965,000",
    priceNote: "（税別・一式）",
    description:
      "LandBase AI Suite と導入に必要な機器を一式にした、買い切りのオールインワンパッケージです。月額費用をかけずに、自社の設備で AI ツールを完結して運用できます。",
    features: [
      "LandBase AI Suite（10 ツール）",
      "MacBook（運用端末）",
      "iPad（フロント・客室管理端末）",
      "Square 決済端末",
      "導入サポート（初期設定・使い方のご説明）",
    ],
    targetIndustry: "宿泊施設",
    subject: "[AI.LandBase] AI Suite Server プランに関するお問い合わせ",
    useCases: ["宿泊税対応", "客室管理・収益最適化", "経理自動化"],
    note: "沖縄県の補助金制度を活用できる場合があります。補助金活用時の費用シミュレーションや宿泊税対応の詳しい情報は、下記の専用ページをご覧ください。",
    externalLink: {
      label: "宿泊税対応の詳細はこちら →",
      href: "https://lodging-tax.ai-landbase.jp/lp/okinawa-lodging-tax/",
    },
    comparison: {
      format: "買い切り（オンプレミス）",
      audience: "自社設備で AI を完結運用したい方",
      aiSuite: "ソフト + 導入機器一式",
      support: "導入サポート",
    },
  },
];

export const AI_SUITE_TOOLS = [
  {
    number: 1,
    name: "AnalyticsAI",
    tagline: "経営データの見える化",
    tags: ["共通"],
    description:
      "予約数・売上・稼働率をわかりやすいグラフで表示。経営レポートの自動作成や、将来の傾向予測で経営判断をサポートします。",
  },
  {
    number: 2,
    name: "OptimaPriceAI",
    tagline: "料金の最適化",
    tags: ["宿泊"],
    description:
      "需要予測をもとに客室料金をリアルタイムで調整。競合の価格動向もモニタリングし、収益を最大化します。",
  },
  {
    number: 3,
    name: "ConciergeAI",
    tagline: "多言語の自動応答",
    tags: ["共通"],
    description:
      "17 言語に対応した自動応答で、ゲストからの問い合わせに 24 時間対応。周辺の観光スポットや飲食店の案内もおまかせください。",
  },
  {
    number: 4,
    name: "PersonalizeAI",
    tagline: "リピーター育成",
    tags: ["共通"],
    description:
      "ゲストの利用履歴をもとにプロファイルを作成し、一人ひとりに合った特典やおすすめを自動で提案。リピーターの獲得につなげます。",
  },
  {
    number: 5,
    name: "ReputationAI",
    tagline: "口コミ管理",
    tags: ["共通"],
    description:
      "複数の予約サイトやレビューサイトから口コミを一括収集。感情分析で傾向を把握し、返信文のたたき台も自動生成します。",
  },
  {
    number: 6,
    name: "MarketingAI",
    tagline: "集客の最適化",
    tags: ["共通"],
    description:
      "顧客セグメントの分析や、OTA（予約サイト）と自社サイトの使い分け戦略を提案。どこに注力すべきかが見えてきます。",
  },
  {
    number: 7,
    name: "OperationAI",
    tagline: "業務の自動化",
    tags: ["共通"],
    description:
      "スタッフのシフト調整、清掃スケジュールの作成、備品の在庫管理など、日々のオペレーション業務を効率化します。",
  },
  {
    number: 8,
    name: "AccountingAI",
    tagline: "経理の自動化",
    tags: ["飲食", "共通"],
    description:
      "レシートや請求書を読み取り、仕訳データを自動作成。freee やマネーフォワードとの連携で、手入力の手間を大幅に減らします。",
  },
  {
    number: 9,
    name: "InventoryAI",
    tagline: "在庫の最適管理",
    tags: ["飲食", "共通"],
    description:
      "消耗品の使用量を予測し、不足する前に発注を提案。食材ロスの削減にも役立ちます。",
  },
  {
    number: 10,
    name: "StaffEduAI",
    tagline: "スタッフ教育",
    tags: ["共通"],
    description:
      "オンライン学習コンテンツの提供、サービス品質の評価、シミュレーション研修で、スタッフの成長を支援します。",
  },
] as const;
