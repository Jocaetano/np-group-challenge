import {
  ArrowRight,
  Bookmark,
  ChevronDown,
  Filter,
  Grid2X2,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import type { Asset, Category } from "../data";
import { AssetGrid, AssetSection } from "./AssetSection";
import { Button } from "./Button";

type Props = {
  allAssets: Asset[];
  category: Category;
  query: string;
  showFavorites: boolean;
  showMore: boolean;
  filtered: Asset[];
  featured: Asset[];
  trending: Asset[];
  favorites: string[];
  onShowMoreChange: (value: boolean) => void;
  onCategoryChange: (category: Category) => void;
  onClearFilters: () => void;
  onResetView: () => void;
  onFocusSearch: () => void;
  onOpenAsset: (asset: Asset) => void;
  onFavorite: (id: string) => void;
};

export function LibrarySections(props: Props) {
  const {
    allAssets,
    category,
    query,
    showFavorites,
    showMore,
    filtered,
    featured,
    trending,
    favorites,
    onShowMoreChange,
    onCategoryChange,
    onClearFilters,
    onResetView,
    onFocusSearch,
    onOpenAsset,
    onFavorite,
  } = props;
  const sectionProps = { favorites, onOpen: onOpenAsset, onFavorite };
  const isFilteredView =
    category !== "Featured" || Boolean(query.trim()) || showFavorites;

  if (isFilteredView) {
    const title = showFavorites
      ? "Your favorites"
      : query
        ? `Results for “${query}”`
        : category === "KPI"
          ? "Metrics & visuals"
          : category;
    return (
      <section className="mb-12.5 min-h-112.5 max-mobile:mb-9.5">
        <div className="mb-5.25 flex items-center justify-between gap-3.75">
          <div className="flex items-center gap-3">
            <span className="section-icon-featured grid h-9.5 w-9.5 place-items-center rounded-xl">
              {showFavorites ? <Bookmark size={19} /> : <Filter size={19} />}
            </span>
            <div>
              <h2 className="mb-1 text-lg font-bold tracking-tight text-heading max-compact:text-lg">
                {title}
              </h2>
              <p className="text-caption text-[#9cae9e] dark:text-text-subtle">
                {filtered.length} {filtered.length === 1 ? "asset" : "assets"}{" "}
                to explore
              </p>
            </div>
          </div>
          {(query || showFavorites) && (
            <Button variant="text" onClick={onClearFilters}>
              Clear filters <X size={15} />
            </Button>
          )}
        </div>
        {filtered.length ? (
          <AssetGrid
            items={filtered}
            favorites={favorites}
            onOpen={onOpenAsset}
            onFavorite={onFavorite}
          />
        ) : (
          <div className="flex min-h-87.5 flex-col items-center justify-center rounded-xl border border-dashed border-[#d9e7db] dark:border-stroke bg-[#fbfdfb] dark:bg-surface-muted text-center">
            <span className="grid h-14.5 w-14.5 place-items-center rounded-2xl bg-[#edf6ec] dark:bg-surface-muted text-[#6e9d71] dark:text-link">
              <Search size={28} />
            </span>
            <h3 className="mt-5 mb-1.25 text-xl">Nothing here yet</h3>
            <p className="mb-5 text-xs text-[#91a194] dark:text-text-subtle">
              {showFavorites
                ? "Explore the Library and save assets you want to revisit."
                : "Try another search or explore a different category."}
            </p>
            <Button variant="secondary" onClick={onResetView}>
              Explore all assets <ArrowRight size={16} />
            </Button>
          </div>
        )}
      </section>
    );
  }

  return (
    <>
      <AssetSection
        title="Featured"
        subtitle="Curated picks from this week"
        icon={<Sparkles size={19} />}
        items={featured}
        action={
          <span className="rounded-md bg-[#f4f8f1] dark:bg-surface-muted px-2.25 py-1.75 text-3xs font-extrabold tracking-widest text-[#8aab85] dark:text-link max-mobile:hidden">
            EDITOR’S PICKS
          </span>
        }
        {...sectionProps}
      />
      <AssetSection
        title="Trending now"
        subtitle="What the community is exploring"
        icon={<TrendingUp size={19} />}
        iconClassName="section-icon-trending"
        className="mt-2.5"
        items={trending}
        action={
          <Button variant="text" onClick={() => onCategoryChange("KPI")}>
            Browse KPIs <ArrowRight size={16} />
          </Button>
        }
        {...sectionProps}
      />
      {showMore && (
        <AssetSection
          title="More to explore"
          subtitle="Additional assets from the Library"
          icon={<Grid2X2 size={19} />}
          items={allAssets.filter(
            (asset) => !asset.featured && !asset.trending,
          )}
          className="mt-1.5"
          {...sectionProps}
        >
          <div className="mt-4.5 flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-[#d8e7d8] dark:border-stroke bg-[#fafdfa] dark:bg-surface-muted p-4.25 text-caption text-[#8da28e] dark:text-text-subtle">
            Not seeing what you need?{" "}
            <button
              className="inline-flex items-center gap-0.75 font-extrabold text-[#368357] dark:text-text-strong"
              type="button"
              onClick={onFocusSearch}
            >
              Try search <ArrowRight size={14} />
            </button>
          </div>
        </AssetSection>
      )}
      <div className="-mt-4.75 mb-9 flex justify-center">
        <Button
          variant="secondary"
          className="min-w-40"
          onClick={() => onShowMoreChange(!showMore)}
        >
          {showMore ? "Show fewer assets" : "Show more assets"}{" "}
          <ChevronDown size={16} className={showMore ? "rotate-180" : ""} />
        </Button>
      </div>
    </>
  );
}
