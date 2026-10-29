import { ArrowRight, LockKeyhole } from "lucide-react";
import type { StoryboardAsset } from "../../data";
import { ChipList, DetailSection, DetailStack } from "./DetailPrimitives";

const barHeights = ["h-1/2", "h-[72%]", "h-[60%]", "h-[91%]", "h-[78%]"];

export function StoryboardDetails({
  asset,
  onRequest,
}: {
  asset: StoryboardAsset;
  onRequest: () => void;
}) {
  return (
    <DetailStack>
      <div className="h-52.5 rounded-lg bg-[#eff2f0] dark:bg-surface-soft p-4.25">
        <div className="relative h-full w-full rounded-md bg-[#244b3c] px-5.5 py-5 text-white shadow-[0_8px_20px_rgba(25,62,37,0.15)]">
          <span className="eyebrow !text-4xs !text-[#b8dda9] dark:!text-text-subtle">
            STORYBOARD / 01
          </span>
          <h3 className="mt-3.25 mb-1.25 text-xl tracking-tighter">
            {asset.title}
          </h3>
          <p className="max-w-sidebar-narrow text-3xs leading-relaxed text-[#c1d2c4] dark:text-text-subtle">
            {asset.description}
          </p>
          <div className="absolute right-5.75 bottom-5.25 flex h-18.75 w-25 items-end gap-1.25">
            {barHeights.map((height, index) => (
              <i
                className={`flex-1 rounded-t-xs bg-[#a8d5a6] ${height}`}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      <DetailSection title="Coupled KPIs and filters">
        <ChipList values={asset.kpis} />
      </DetailSection>
      <DetailSection title="Applicable affiliates">
        <ChipList values={asset.affiliates} />
      </DetailSection>
      {asset.locked && (
        <button
          type="button"
          className="flex items-center gap-3 rounded-lg border border-[#e9d9bc] dark:border-stroke bg-[#fff9ec] dark:bg-surface-muted p-3.25 text-left text-[#a37837] dark:text-text-subtle"
          onClick={onRequest}
        >
          <LockKeyhole size={19} />
          <span className="flex-1">
            <strong className="block text-caption">Access required</strong>
            <small className="mt-1 block text-2xs text-[#a18a62] dark:text-text-subtle">
              Request access to add this storyboard to your layouts.
            </small>
          </span>
          <ArrowRight size={18} />
        </button>
      )}
    </DetailStack>
  );
}
