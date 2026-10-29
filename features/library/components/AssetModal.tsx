import { useEffect, useRef } from "react";
import { Bookmark, Copy, LockKeyhole, X } from "lucide-react";
import { uniqueTags, type Asset } from "../data";
import { KindIcon } from "./AssetVisual";
import { AssetDetails } from "./details/AssetDetails";
import { Button } from "./Button";
import { ModalBackdrop } from "./ModalBackdrop";
import { ChipRow } from "./details/DetailPrimitives";

type Props = {
  asset: Asset;
  isFavorite: boolean;
  onClose: () => void;
  onFavorite: () => void;
  onRequest: () => void;
  onToast: (message: string) => void;
};

export function AssetModal({
  asset,
  isFavorite,
  onClose,
  onFavorite,
  onRequest,
  onToast,
}: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => closeButtonRef.current?.focus(), []);

  const copyLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("asset", asset.id);
    try {
      await navigator.clipboard.writeText(url.toString());
      onToast("Link copied to clipboard");
    } catch {
      onToast("Unable to copy link");
    }
  };

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        className="flex h-full w-full max-w-detail-panel flex-col bg-surface shadow-[-20px_0_50px_rgba(14,39,26,0.15)] animate-[slideIn_0.25s_ease-out] max-compact:w-screen"
        role="dialog"
        aria-modal="true"
        aria-labelledby="asset-modal-title"
      >
        <div className="flex min-h-17.5 items-center justify-between border-b border-[#edf0eb] dark:border-stroke px-7 max-mobile:px-5">
          <div className="flex items-center gap-2.5">
            <span
              className={`grid h-9 w-9 place-items-center rounded-lg tone-${asset.tone}`}
            >
              <KindIcon kind={asset.kind} size={20} />
            </span>
            <span className="text-xs font-extrabold text-[#4b6656] dark:text-text-strong">
              {asset.kind}{" "}
              <span className="mx-1.25 text-[#bdc9be] dark:text-text-subtle">
                /
              </span>{" "}
              {asset.category}
            </span>
          </div>
          <Button
            variant="icon"
            ref={closeButtonRef}
            className="!text-[#8d9d91] dark:!text-text-subtle"
            onClick={onClose}
            aria-label="Close details"
          >
            <X size={20} />
          </Button>
        </div>
        <div className="flex-1 overflow-auto px-8.5 pt-7.75 pb-9.5 max-mobile:px-5.25 max-mobile:pt-6">
          <div className="modal-intro">
            <h2
              id="asset-modal-title"
              className="mb-2.25 text-3xl tracking-tight text-[#233d32] dark:text-text-strong"
            >
              {asset.title}
            </h2>
            <p className="mb-3.75 max-w-117.5 text-body-sm leading-relaxed text-[#7e9182] dark:text-text-subtle">
              {asset.description}
            </p>
            <ChipRow>
              {uniqueTags(asset.tags).map((tag) => (
                <span
                  className="rounded-md bg-[#f0f5ef] dark:bg-surface-muted px-2 py-1.25 text-2xs font-bold text-[#749078] dark:text-text-subtle"
                  key={tag.toLowerCase()}
                >
                  #{tag.replaceAll(" ", "")}
                </span>
              ))}
            </ChipRow>
          </div>
          <AssetDetails asset={asset} onRequest={onRequest} />
          <div className="mt-7.75 flex items-center gap-2.5 border-t border-[#e9efea] dark:border-stroke pt-5.25">
            <span className="grid h-7.75 w-7.75 place-items-center rounded-full bg-[#e7f0e5] dark:bg-surface-soft text-2xs font-extrabold text-[#548165] dark:text-link">
              {asset.owner
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")}
            </span>
            <span>
              <strong className="block text-2xs text-[#4e6655] dark:text-text-strong">
                Created by {asset.owner}
              </strong>
              <small className="mt-0.75 block text-2xs text-[#a4b3a4] dark:text-text-subtle">
                Updated {asset.updated}
              </small>
            </span>
          </div>
        </div>
        <div className="flex min-h-18 items-center justify-between gap-3 border-t border-[#edf0eb] dark:border-stroke px-7.5 py-3.5 max-mobile:px-5 max-mobile:py-3.25">
          <Button variant="secondary" onClick={copyLink}>
            <Copy size={16} /> Copy link
          </Button>
          {asset.locked ? (
            <Button variant="primary" onClick={onRequest}>
              <LockKeyhole size={16} /> Request access
            </Button>
          ) : (
            <Button variant="primary" onClick={onFavorite}>
              <Bookmark size={16} fill={isFavorite ? "currentColor" : "none"} />{" "}
              {isFavorite ? "Favorited" : "Favorite item"}
            </Button>
          )}
        </div>
      </div>
    </ModalBackdrop>
  );
}
