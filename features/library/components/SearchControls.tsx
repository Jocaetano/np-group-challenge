import type { RefObject } from "react";
import { ArrowRight, Bookmark, Clock3, Search, X } from "lucide-react";
import { categories, type Category } from "../data";

type Props = {
  category: Category;
  query: string;
  searchFocused: boolean;
  recentSearches: string[];
  showFavorites: boolean;
  assetCount: number;
  searchRef: RefObject<HTMLInputElement | null>;
  onCategoryChange: (category: Category) => void;
  onQueryChange: (value: string) => void;
  onSearchFocusChange: (focused: boolean) => void;
  onCommitSearch: (value: string) => void;
  onClearRecent: () => void;
  onToggleFavorites: () => void;
};

export function SearchControls({
  category,
  query,
  searchFocused,
  recentSearches,
  showFavorites,
  assetCount,
  searchRef,
  onCategoryChange,
  onQueryChange,
  onSearchFocusChange,
  onCommitSearch,
  onClearRecent,
  onToggleFavorites,
}: Props) {
  return (
    <>
      <div className="relative mb-6.75 flex gap-3 max-compact:gap-2">
        <div className="flex h-13 flex-1 items-center gap-3 rounded-xl border border-border-soft bg-surface px-4.25 shadow-[0_5px_16px_rgba(28,58,36,0.03)] transition-[border-color,box-shadow] duration-200 focus-within:border-[#8fc495] dark:focus-within:border-stroke focus-within:shadow-[0_0_0_4px_#eaf6e9] max-mobile:h-12">
          <Search size={21} className="text-[#8eaa96] dark:text-text-subtle" />
          <input
            className="min-w-0 flex-1 border-0 bg-transparent text-body-sm text-[#243e34] dark:text-text-strong outline-none placeholder:text-[#a8b7ad] dark:placeholder:text-text-subtle"
            ref={searchRef}
            value={query}
            onChange={(event) => {
              onQueryChange(event.target.value);
              onSearchFocusChange(true);
            }}
            onFocus={() => onSearchFocusChange(true)}
            onBlur={() =>
              window.setTimeout(() => onSearchFocusChange(false), 150)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") onCommitSearch(query);
            }}
            placeholder="Search metrics, layouts, storyboards..."
            aria-label="Search assets"
          />
          {query ? (
            <button
              className="grid h-6 w-6 place-items-center rounded-md bg-[#f1f5f1] dark:bg-surface-muted text-[#819685] dark:text-text-subtle"
              type="button"
              onClick={() => {
                onQueryChange("");
                searchRef.current?.focus();
              }}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          ) : (
            <span className="rounded-md border border-[#e6ece5] dark:border-stroke px-1.75 py-1 text-2xs text-[#9aaa9d] dark:text-text-subtle">
              Ctrl K
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label={showFavorites ? "Show all assets" : "Show favorites only"}
          aria-pressed={showFavorites}
          className={`flex min-w-28.75 items-center justify-center gap-2.25 rounded-lg border text-xs font-bold max-mobile:w-12 max-mobile:min-w-12 ${showFavorites ? "border-[#c8e3c9] dark:border-stroke bg-[#eff7ee] dark:bg-surface-muted text-[#506a5b] dark:text-text-strong" : "border-border-soft bg-surface text-[#506a5b] dark:text-text-strong hover:border-[#c8e3c9] dark:hover:border-stroke hover:bg-[#eff7ee] dark:hover:bg-surface-muted"}`}
          onClick={onToggleFavorites}
        >
          <Bookmark size={18} fill={showFavorites ? "currentColor" : "none"} />
          <span className="max-mobile:hidden">Favorites</span>
        </button>
        {searchFocused && recentSearches.length > 0 && (
          <div className="absolute top-14.75 left-0 z-20 w-full max-w-120 rounded-xl border border-[#e3ebe4] dark:border-stroke bg-surface p-2.5 shadow-[0_15px_35px_rgba(20,47,31,0.12)]">
            <div className="flex justify-between px-2.25 pt-2 pb-1.75 text-3xs font-extrabold tracking-widest text-[#9bac9f] dark:text-text-subtle">
              <span>RECENT SEARCHES</span>
              <button
                className="text-2xs font-bold tracking-normal text-[#42865e] dark:text-link"
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={onClearRecent}
              >
                Clear all
              </button>
            </div>
            {recentSearches.map((term) => (
              <button
                className="flex w-full items-center gap-2.5 rounded-lg bg-surface p-2.25 text-left text-xs text-[#4d6756] dark:text-text-strong hover:bg-[#f1f7f1] dark:hover:bg-surface-muted [&_svg:last-child]:ml-auto"
                type="button"
                key={term}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onCommitSearch(term)}
              >
                <Clock3 size={15} /> {term}
                <ArrowRight size={14} />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="mb-9.5 flex items-center justify-between border-b border-[#e9efea] dark:border-stroke">
        <div
          className="flex items-center gap-7.25 max-mobile:gap-5 max-mobile:overflow-x-auto"
          role="tablist"
          aria-label="Asset categories"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              className={`border-b-2 bg-transparent px-px pb-4 text-xs font-bold hover:text-[#24573f] dark:hover:text-text-strong max-mobile:text-caption max-mobile:whitespace-nowrap ${category === item ? "border-[#419364] text-[#24573f] dark:text-text-strong" : "border-transparent text-[#899a8e] dark:text-text-subtle"}`}
              onClick={() => onCategoryChange(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="pb-4 text-caption text-[#9aab9e] dark:text-text-subtle max-mobile:hidden">
          {assetCount} assets
        </span>
      </div>
    </>
  );
}
