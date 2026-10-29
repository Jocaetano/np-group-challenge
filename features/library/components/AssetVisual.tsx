import {
  Activity,
  BarChart3,
  LayoutDashboard,
  Presentation,
  TrendingUp,
} from "lucide-react";
import type { Asset, AssetKind } from "../data";

export function KindIcon({
  kind,
  size = 19,
}: {
  kind: AssetKind;
  size?: number;
}) {
  const props = { size, strokeWidth: 1.8 };
  if (kind === "KPI") return <Activity {...props} />;
  if (kind === "Data viz") return <BarChart3 {...props} />;
  if (kind === "Layout") return <LayoutDashboard {...props} />;
  return <Presentation {...props} />;
}

export function AssetVisual({
  asset,
  large = false,
}: {
  asset: Asset;
  large?: boolean;
}) {
  const bars = asset.chartValues.slice(0, 7);
  return (
    <div
      className={`asset-visual tone-${asset.tone} ${large ? "asset-visual-large" : ""}`}
      aria-hidden="true"
    >
      <div className="visual-grid" />
      <div className="visual-topline">
        <span className="visual-dot" />
        <span className="visual-dot" />
        <span className="visual-dot" />
        <span className="visual-line" />
      </div>
      {asset.kind === "Layout" ? (
        <div className="visual-layout">
          <div className="visual-layout-main">
            <span className="visual-micro-label">Overview</span>
            <div className="visual-wave">
              <svg viewBox="0 0 240 88" preserveAspectRatio="none">
                <path
                  d="M0 72 C25 58 32 75 56 52 S90 68 114 40 S150 57 174 24 S207 42 240 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="visual-layout-side">
            <span />
            <span />
            <span />
          </div>
        </div>
      ) : asset.kind === "KPI" ? (
        <div className="visual-kpi">
          <span className="visual-micro-label">PERFORMANCE</span>
          <strong>{asset.previewValue}</strong>
          <span className="visual-trend">
            <TrendingUp size={13} /> {asset.trendValue} this period
          </span>
          <div className="visual-wave">
            <svg viewBox="0 0 240 88" preserveAspectRatio="none">
              <path
                d="M0 73 C24 70 35 55 53 62 S83 45 105 51 S143 36 161 43 S197 22 215 27 S232 18 240 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className="visual-bars">
          <div className="visual-bars-heading">
            <span className="visual-micro-label">
              {asset.kind === "Storyboard"
                ? "MARKET OUTLOOK"
                : "CONVERSION BY CHANNEL"}
            </span>
            <span>2026</span>
          </div>
          <div className="bars">
            {bars.map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="visual-axis">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      )}
    </div>
  );
}
