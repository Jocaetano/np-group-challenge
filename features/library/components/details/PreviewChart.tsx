import { useState } from "react";
import type { DataVizAsset } from "../../data";

const periods = ["6M", "12M", "ALL"] as const;
type Period = (typeof periods)[number];

export function PreviewChart({ asset }: { asset: DataVizAsset }) {
  const [period, setPeriod] = useState<Period>("12M");
  const values =
    period === "6M"
      ? asset.chartValues.slice(-6)
      : period === "12M"
        ? asset.chartValues.slice(-12)
        : asset.chartValues;
  return (
    <div className="rounded-xl border border-[#e8eee7] dark:border-stroke bg-[#fcfdfb] dark:bg-surface-muted p-4.75">
      <div className="flex items-start justify-between gap-2.5">
        <div>
          <span className="eyebrow">INTERACTIVE PREVIEW</span>
          <h4 className="mt-1.75 text-sm">Performance over time</h4>
        </div>
        <div
          className="flex rounded-md bg-[#eef4ed] dark:bg-surface-soft p-0.75"
          aria-label="Chart period"
        >
          {periods.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPeriod(item)}
              className={`rounded px-1.75 py-1 text-3xs font-extrabold ${period === item ? "bg-surface text-[#2f6947] dark:text-text-strong shadow-[0_1px_4px_rgba(0,0,0,0.06)]" : "text-[#8ca18f] dark:text-text-subtle"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="relative mt-4.75 flex h-37.5">
        <div className="absolute inset-0 flex flex-col justify-between text-3xs text-[#a9b7a9] dark:text-text-subtle">
          {[100, 75, 50, 25].map((tick) => (
            <span
              className="block h-px border-b border-dashed border-[#e8eee8] dark:border-stroke leading-none"
              key={tick}
            >
              {tick}
            </span>
          ))}
        </div>
        <div className="relative ml-6.75 flex h-full min-w-0 flex-1 items-end gap-1.5">
          {values.map((value, index) => (
            <div
              className="flex h-full flex-1 items-end"
              key={`${period}-${index}`}
            >
              <span
                className={`w-full rounded-t transition-[height] duration-300 ${index % 3 === 2 ? "bg-[linear-gradient(0deg,#c8e7c3,#7faf89)]" : "bg-[linear-gradient(0deg,#a5d3b0,#468e69)]"}`}
                style={{ height: `${value}%` }}
                title={`${value}%`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-between pl-7 text-3xs text-[#a3b0a4] dark:text-text-subtle">
        {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
}
