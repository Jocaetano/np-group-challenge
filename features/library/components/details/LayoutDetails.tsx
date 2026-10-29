import { useState } from "react";
import { Eye, X } from "lucide-react";
import type { LayoutAsset } from "../../data";
import { AssetVisual } from "../AssetVisual";
import {
  ChipList,
  DetailSection,
  DetailStack,
  QuestionList,
} from "./DetailPrimitives";

export function LayoutDetails({ asset }: { asset: LayoutAsset }) {
  const [previewExpanded, setPreviewExpanded] = useState(false);
  return (
    <DetailStack>
      <div className="grid grid-cols-4 rounded-lg border border-[#e8eee8] dark:border-stroke py-3.75 max-compact:grid-cols-2 max-compact:gap-3">
        <StatCell value={asset.usage} label="Used" />
        <StatCell value="Universal" label="Type" mobileRowEnd />
        <StatCell value={asset.pages} label="Pages" />
        <StatCell value={asset.updated} label="Last updated" last />
      </div>
      <div
        className={`rounded-lg border border-[#e8eee8] dark:border-stroke bg-[#f5f7f5] dark:bg-surface-muted p-3.5 ${previewExpanded ? "layout-preview-expanded" : ""}`}
      >
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((index) => (
            <span className="h-1 w-1 rounded-full bg-[#b9c9bb]" key={index} />
          ))}
          <button
            type="button"
            className="ml-auto inline-flex items-center gap-1.25 px-0.75 py-0.5 text-2xs font-extrabold text-[#5f8a6c] dark:text-link hover:text-[#2a6644] dark:hover:text-text-strong"
            aria-expanded={previewExpanded}
            onClick={() => setPreviewExpanded(!previewExpanded)}
          >
            {previewExpanded ? <X size={14} /> : <Eye size={14} />}
            {previewExpanded ? "Close preview" : "Preview layout"}
          </button>
        </div>
        <div
          className={`mt-2.75 grid gap-2 ${previewExpanded ? "h-78.75 grid-cols-[3fr_1fr]" : "h-48.75 grid-cols-[2fr_1fr]"}`}
        >
          <div className="layout-preview-main overflow-hidden rounded-md border border-[#edf0eb] dark:border-stroke bg-surface p-1.75">
            <AssetVisual asset={asset} large />
          </div>
          <div className="grid gap-2">
            {[0, 1].map((index) => (
              <span
                className="preview-mini-tile relative overflow-hidden rounded-md border border-[#edf0eb] dark:border-stroke bg-[linear-gradient(125deg,#f8faf8,#e7eee8)]"
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      <DetailSection title="KPIs being used">
        <ChipList values={asset.kpis} />
      </DetailSection>
      <DetailSection title="Business questions">
        <QuestionList questions={asset.questions} />
      </DetailSection>
    </DetailStack>
  );
}

function StatCell({
  value,
  label,
  mobileRowEnd = false,
  last = false,
}: {
  value: string | number;
  label: string;
  mobileRowEnd?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`grid gap-1.25 px-3.25 max-mobile:px-2 ${last ? "" : "border-r border-[#e7ede7] dark:border-stroke"} ${mobileRowEnd ? "max-compact:border-r-0" : ""}`}
    >
      <strong className="whitespace-nowrap text-caption text-[#344f3d] dark:text-text-strong max-mobile:text-3xs">
        {value}
      </strong>
      <span className="text-3xs text-[#9eafa1] dark:text-text-subtle">
        {label}
      </span>
    </div>
  );
}
