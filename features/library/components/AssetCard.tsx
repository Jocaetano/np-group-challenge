import { ArrowRight, Bookmark, Clock3 } from "lucide-react";
import type { Asset } from "../data";
import { AssetVisual, KindIcon } from "./AssetVisual";
import { Button } from "./Button";

export function AssetCard({
  asset,
  isFavorite,
  onOpen,
  onFavorite,
}: {
  asset: Asset;
  isFavorite: boolean;
  onOpen: () => void;
  onFavorite: () => void;
}) {
  return (
    <article className="group min-w-0 overflow-hidden rounded-xl border border-[#e6ede7] dark:border-stroke bg-surface shadow-asset-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.75 hover:border-[#c8deca] dark:hover:border-stroke hover:shadow-asset-card-hover">
      <button
        className="block w-full bg-transparent px-2 pt-2 text-left text-inherit"
        type="button"
        onClick={onOpen}
        aria-label={`Explore ${asset.title}`}
      >
        <AssetVisual asset={asset} />
        <span className="block px-2 pt-3.75 pb-3.5 max-mobile:px-1.5 max-mobile:py-3">
          <span className="mb-2.25 flex items-center gap-1.5 text-2xs font-bold text-[#8ca093] dark:text-text-subtle">
            <span className="flex items-center gap-1.25 text-[#539167] dark:text-link">
              <KindIcon kind={asset.kind} size={15} /> {asset.kind}
            </span>
            <span className="text-[#c1cbc1] dark:text-text-subtle">·</span>
            {asset.category}
          </span>
          <span className="flex items-center justify-between gap-1">
            <strong className="truncate text-sm text-[#263e32] dark:text-text-strong">
              {asset.title}
            </strong>
            <ArrowRight
              size={18}
              className="shrink-0 text-[#a7b8aa] dark:text-text-subtle transition-transform duration-200 group-hover:translate-x-0.75 group-hover:text-[#4b9567]"
            />
          </span>
          <span className="mt-1.75 min-h-8.25 overflow-hidden text-caption leading-normal text-[#8a9b8e] dark:text-text-subtle line-clamp-2 max-mobile:min-h-12 max-mobile:line-clamp-3 max-compact:min-h-0">
            {asset.description}
          </span>
        </span>
      </button>
      <div className="mx-4 flex min-h-9 items-center justify-between border-t border-[#edf1ed] dark:border-stroke max-mobile:mx-3.5">
        <span className="flex items-center gap-1.25 text-2xs text-[#a3b1a5] dark:text-text-subtle">
          <Clock3 size={13} /> Updated {asset.updated}
        </span>
        <Button
          variant="icon"
          className={`h-6.5 w-6.5 ${isFavorite ? "!text-favorite" : ""}`}
          onClick={onFavorite}
          aria-label={
            isFavorite
              ? `Remove ${asset.title} from favorites`
              : `Favorite ${asset.title}`
          }
          title={isFavorite ? "Remove favorite" : "Add to favorites"}
        >
          <Bookmark size={17} fill={isFavorite ? "currentColor" : "none"} />
        </Button>
      </div>
    </article>
  );
}
