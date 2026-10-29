import type { ReactNode } from "react";
import type { Asset } from "../data";
import { AssetCard } from "./AssetCard";

type Props = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  items: Asset[];
  favorites: string[];
  onOpen: (asset: Asset) => void;
  onFavorite: (id: string) => void;
  action?: ReactNode;
  className?: string;
  iconClassName?: string;
  children?: ReactNode;
};

export function AssetSection({
  title,
  subtitle,
  icon,
  items,
  favorites,
  onOpen,
  onFavorite,
  action,
  className = "",
  iconClassName = "section-icon-featured",
  children,
}: Props) {
  return (
    <section className={`mb-12.5 max-mobile:mb-9.5 ${className}`}>
      <div className="mb-5.25 flex items-center justify-between gap-3.75">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-9.5 w-9.5 place-items-center rounded-xl ${iconClassName}`}
          >
            {icon}
          </span>
          <div>
            <h2 className="mb-1 text-lg font-bold tracking-tight text-heading max-compact:text-lg">
              {title}
            </h2>
            <p className="text-caption text-[#9cae9e] dark:text-text-subtle">
              {subtitle}
            </p>
          </div>
        </div>
        {action}
      </div>
      <AssetGrid
        items={items}
        favorites={favorites}
        onOpen={onOpen}
        onFavorite={onFavorite}
      />
      {children}
    </section>
  );
}

export function AssetGrid({
  items,
  favorites,
  onOpen,
  onFavorite,
}: Pick<Props, "items" | "favorites" | "onOpen" | "onFavorite">) {
  return (
    <div className="grid grid-cols-4 gap-4.25 max-wide:grid-cols-3 max-tablet:grid-cols-2 max-mobile:gap-3 max-compact:grid-cols-1">
      {items.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          isFavorite={favorites.includes(asset.id)}
          onOpen={() => onOpen(asset)}
          onFavorite={() => onFavorite(asset.id)}
        />
      ))}
    </div>
  );
}
