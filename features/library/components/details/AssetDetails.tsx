import type { Asset } from "../../data";
import { DataVizDetails } from "./DataVizDetails";
import { KpiDetails } from "./KpiDetails";
import { LayoutDetails } from "./LayoutDetails";
import { StoryboardDetails } from "./StoryboardDetails";

export function AssetDetails({
  asset,
  onRequest,
}: {
  asset: Asset;
  onRequest: () => void;
}) {
  switch (asset.kind) {
    case "KPI":
      return <KpiDetails asset={asset} />;
    case "Data viz":
      return <DataVizDetails asset={asset} />;
    case "Layout":
      return <LayoutDetails asset={asset} />;
    case "Storyboard":
      return <StoryboardDetails asset={asset} onRequest={onRequest} />;
  }
}
