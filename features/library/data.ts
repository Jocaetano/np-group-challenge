export const categories = [
  "Featured",
  "KPI",
  "Layouts",
  "Storyboards",
] as const;
export type Category = (typeof categories)[number];
export type Tone = "mint" | "peach" | "violet" | "blue";
export type AssetDomain =
  | "Finance"
  | "Customer"
  | "Operations"
  | "Sales"
  | "Marketing"
  | "Executive"
  | "Strategy";

type AssetBase = {
  id: string;
  title: string;
  description: string;
  category: AssetDomain;
  owner: string;
  updated: string;
  usage: string;
  tone: Tone;
  featured: boolean;
  trending: boolean;
  locked: boolean;
  tags: string[];
  questions: string[];
  chartValues: number[];
  previewValue: string;
  trendValue: string;
  affiliates: string[];
};

export type KpiAsset = AssetBase & {
  kind: "KPI";
  metricIds: string[];
  calculation: string;
  visuals: string[];
};

export type DataVizAsset = AssetBase & {
  kind: "Data viz";
  kpis: string[];
};

export type LayoutAsset = AssetBase & {
  kind: "Layout";
  pages: number;
  kpis: string[];
};

export type StoryboardAsset = AssetBase & {
  kind: "Storyboard";
  kpis: string[];
};

export type Asset = KpiAsset | DataVizAsset | LayoutAsset | StoryboardAsset;
export type AssetKind = Asset["kind"];

type AssetTemplate = {
  description: string;
  questions: string[];
};

// One template per asset type; the date and sequence make each demo record distinct.
const templates = {
  KPI: {
    description: "An example metric for monitoring business performance.",
    questions: [
      "How is this metric changing over time?",
      "Which groups are contributing to the result?",
    ],
    calculation: "Current value ÷ comparison value × 100",
  },
  "Data viz": {
    description: "An example visualization for exploring metric trends.",
    questions: [
      "What pattern does the visualization show?",
      "Where should we investigate further?",
    ],
  },
  Layout: {
    description: "An example dashboard layout combining related metrics.",
    questions: [
      "What is the overall performance picture?",
      "Which metrics need attention?",
    ],
  },
  Storyboard: {
    description: "An example presentation that tells a data story.",
    questions: ["What changed during this period?", "What should happen next?"],
  },
} satisfies Record<
  AssetKind,
  AssetTemplate | (AssetTemplate & { calculation: string })
>;

const domains: readonly [AssetDomain, ...AssetDomain[]] = [
  "Finance",
  "Customer",
  "Operations",
  "Sales",
  "Marketing",
  "Executive",
  "Strategy",
];

const owners: Record<AssetDomain, string> = {
  Finance: "Revenue Operations",
  Customer: "Customer Success",
  Operations: "Business Operations",
  Sales: "Sales Analytics",
  Marketing: "Growth Analytics",
  Executive: "Strategy & Insights",
  Strategy: "Market Intelligence",
};
const affiliates = ["North America", "EMEA", "APAC"];
const tones = ["mint", "peach", "violet", "blue"] as const satisfies readonly [
  Tone,
  ...Tone[],
];
const visualOptions = [
  "Line chart",
  "Bar chart",
  "KPI tile",
  "Waterfall chart",
  "Cohort heatmap",
];

// A seed makes the server-run catalog reproducible for debugging and stable for every client.
function createRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateAssets(seed: number, now = new Date()): Asset[] {
  const random = createRandom(seed);
  const between = (min: number, max: number) =>
    Math.floor(random() * (max - min + 1)) + min;
  const pick = <T>(items: readonly [T, ...T[]]): T =>
    items[between(0, items.length - 1)]!;
  const sample = <T>(items: T[], count: number) => {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index--) {
      const target = between(0, index);
      const current = shuffled[index]!;
      shuffled[index] = shuffled[target]!;
      shuffled[target] = current;
    }
    return shuffled.slice(0, count);
  };
  const updated = () => {
    const date = new Date(now.getTime() - between(1, 30) * 86400000);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  };
  const chartValues = () => {
    let value = between(30, 55);
    return Array.from({ length: 18 }, () => {
      value = Math.max(20, Math.min(94, value + between(-12, 15)));
      return value;
    });
  };
  const dateCode = [
    String(now.getUTCFullYear()).slice(-2),
    String(now.getUTCMonth() + 1).padStart(2, "0"),
    String(now.getUTCDate()).padStart(2, "0"),
  ].join("");
  const displayKind: Record<AssetKind, string> = {
    KPI: "KPI",
    "Data viz": "Data Viz",
    Layout: "Layout",
    Storyboard: "Storyboard",
  };

  const baseAsset = (kind: AssetKind, index: number): AssetBase => {
    const category = pick(domains);
    const title = `Example ${displayKind[kind]}-${dateCode}-${index + 1}`;
    return {
      id: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
      title,
      description: templates[kind].description,
      category,
      owner: owners[category],
      updated: updated(),
      usage: `${(between(500, 3600) / 1000).toFixed(1)}k`,
      tone: pick(tones),
      featured: index === 0,
      trending: index === 1,
      locked: kind === "Storyboard" && index === 1,
      tags: [category, displayKind[kind], dateCode],
      questions: templates[kind].questions,
      chartValues: chartValues(),
      previewValue: `${between(8, 96)}.${between(0, 9)}%`,
      trendValue: `+${between(1, 8)}.${between(0, 9)}%`,
      affiliates: sample(affiliates, between(2, 3)),
    };
  };

  const kpis = Array.from({ length: 8 }, (_, index): KpiAsset => ({
    ...baseAsset("KPI", index),
    kind: "KPI",
    metricIds: [`KPI-${dateCode}-${index + 1}`],
    calculation: templates.KPI.calculation,
    visuals: sample(visualOptions, 3),
  }));
  const kpiTitles = kpis.map((asset) => asset.title);
  const dataViz = Array.from({ length: 6 }, (_, index): DataVizAsset => ({
    ...baseAsset("Data viz", index),
    kind: "Data viz",
    kpis: sample(kpiTitles, 2),
  }));
  const layouts = Array.from({ length: 5 }, (_, index): LayoutAsset => ({
    ...baseAsset("Layout", index),
    kind: "Layout",
    pages: between(3, 8),
    kpis: sample(kpiTitles, 3),
  }));
  const storyboards = Array.from(
    { length: 5 },
    (_, index): StoryboardAsset => ({
      ...baseAsset("Storyboard", index),
      kind: "Storyboard",
      kpis: sample(kpiTitles, 2),
    }),
  );

  return [...kpis, ...dataViz, ...layouts, ...storyboards];
}

export function uniqueTags(tags: string[]): string[] {
  const seen = new Set<string>();
  return tags.filter((tag) => {
    const key = tag.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function matchesCategory(asset: Asset, category: Category) {
  if (category === "Featured") return true;
  if (category === "KPI")
    return asset.kind === "KPI" || asset.kind === "Data viz";
  if (category === "Layouts") return asset.kind === "Layout";
  return asset.kind === "Storyboard";
}
