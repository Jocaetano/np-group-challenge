import type { KpiAsset } from "../../data";
import {
  ChipList,
  DetailSection,
  DetailStack,
  QuestionList,
} from "./DetailPrimitives";

export function KpiDetails({ asset }: { asset: KpiAsset }) {
  return (
    <DetailStack>
      <DetailSection title="Business questions">
        <QuestionList questions={asset.questions} />
      </DetailSection>
      <div className="grid grid-cols-2 gap-4.5 max-compact:grid-cols-1">
        <DetailSection title="Metric IDs">
          <ChipList values={asset.metricIds} variant="code" />
        </DetailSection>
        <DetailSection title="Visuals available">
          <ChipList values={asset.visuals} />
        </DetailSection>
      </div>
      <DetailSection title="Calculation">
        <div className="rounded-lg border border-[#e7eee7] dark:border-stroke bg-[#f7faf7] dark:bg-surface-muted p-3.5 font-mono text-caption leading-relaxed text-[#55705b] dark:text-text-strong">
          {asset.calculation}
        </div>
      </DetailSection>
      <DetailSection title="Affiliate applicability">
        <ChipList values={asset.affiliates} checked />
      </DetailSection>
    </DetailStack>
  );
}
