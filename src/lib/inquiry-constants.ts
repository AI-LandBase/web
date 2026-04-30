export const FACILITY_TYPES = [
  "minpaku",
  "simple_lodging",
  "ryokan",
  "hotel",
  "other",
] as const;

export const HAS_PC_OPTIONS = ["mac", "windows", "other_pc", "no"] as const;

export const FACILITY_TYPE_LABELS: Record<string, string> = {
  minpaku: "民泊（住宅宿泊事業）",
  simple_lodging: "簡易宿所",
  ryokan: "旅館",
  hotel: "ホテル",
  other: "その他",
};

export const HAS_PC_LABELS: Record<string, string> = {
  mac: "はい（Mac）",
  windows: "はい（Windows）",
  other_pc: "はい（その他）",
  no: "いいえ",
};
