import { Activity, ArrowRight } from "lucide-react";
import type { DataVizAsset } from "../../data";
import { DetailSection, DetailStack } from "./DetailPrimitives";
import { PreviewChart } from "./PreviewChart";

export function DataVizDetails({ asset }: { asset: DataVizAsset }) {
  return (
    <DetailStack>
      <PreviewChart asset={asset} />
      <DetailSection title="Applicable KPI favorites">
        <div className="overflow-hidden rounded-lg border border-[#e9eee8] dark:border-stroke">
          {asset.kpis.map((kpi) => (
            <div
              className="flex items-center gap-2.25 border-b border-[#e9eee8] dark:border-stroke px-3.25 py-2.75 text-caption text-[#587460] dark:text-text-subtle last:border-b-0"
              key={kpi}
            >
              <Activity size={16} />
              <span>{kpi}</span>
              <ArrowRight
                size={15}
                className="ml-auto text-[#a6b4a7] dark:text-text-subtle"
              />
            </div>
          ))}
        </div>
      </DetailSection>
      <DetailSection title="Asset context">
        <p className="text-caption leading-relaxed text-[#718874] dark:text-text-subtle">
          Use this chart to compare performance across channels and spot where
          the trend changes. Select a time range above to explore the data.
        </p>
      </DetailSection>
    </DetailStack>
  );
}
