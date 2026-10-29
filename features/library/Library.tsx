"use client";

import { ArrowDownRight } from "lucide-react";
import { AssetModal } from "./components/AssetModal";
import { LibraryHeading, LibraryTopbar } from "./components/LibraryHeader";
import { LibrarySections } from "./components/LibrarySections";
import { LibrarySidebar } from "./components/LibrarySidebar";
import { LibraryToast } from "./components/LibraryToast";
import { RequestModal } from "./components/RequestModal";
import { SearchControls } from "./components/SearchControls";
import { useLibrary } from "./hooks/useLibrary";
import type { Asset } from "./data";

export function Library({ assets }: { assets: Asset[] }) {
  const library = useLibrary(assets);
  const selectedAsset = library.selectedAsset;

  return (
    <div className="flex min-h-screen bg-surface">
      <LibrarySidebar
        open={library.mobileNavOpen}
        category={library.category}
        showFavorites={library.showFavorites}
        favoriteCount={library.favorites.length}
        onShowLibrary={library.showLibrary}
        onShowFavorites={library.showFavoritesView}
        onShowCategory={library.showCategory}
        onRequest={() => library.openRequest()}
        onMockAction={library.setToast}
      />

      <main className="min-w-0 flex-1 max-mobile:w-full">
        <LibraryTopbar
          mobileNavOpen={library.mobileNavOpen}
          onToggleNav={() => library.setMobileNavOpen(!library.mobileNavOpen)}
          onNotification={() => library.setToast("You’re all caught up")}
          onMockAction={library.setToast}
        />
        <div className="mx-auto max-w-page-max px-11.5 pt-14.5 pb-5.5 max-wide:px-8.5 max-tablet:pt-10.5 max-mobile:px-5 max-mobile:pt-9.25 max-mobile:pb-4.5">
          <LibraryHeading onRequest={() => library.openRequest()} />
          <SearchControls
            category={library.category}
            query={library.query}
            searchFocused={library.searchFocused}
            recentSearches={library.recentSearches}
            showFavorites={library.showFavorites}
            assetCount={library.filtered.length}
            searchRef={library.searchRef}
            onCategoryChange={library.setCategory}
            onQueryChange={library.setQuery}
            onSearchFocusChange={library.setSearchFocused}
            onCommitSearch={library.commitSearch}
            onClearRecent={library.clearRecentSearches}
            onToggleFavorites={() =>
              library.setShowFavorites(!library.showFavorites)
            }
          />
          <LibrarySections
            allAssets={assets}
            category={library.category}
            query={library.query}
            showFavorites={library.showFavorites}
            showMore={library.showMore}
            filtered={library.filtered}
            featured={library.featured}
            trending={library.trending}
            favorites={library.favorites}
            onShowMoreChange={library.setShowMore}
            onCategoryChange={library.setCategory}
            onClearFilters={library.clearFilters}
            onResetView={library.resetView}
            onFocusSearch={library.focusSearch}
            onOpenAsset={library.openAsset}
            onFavorite={library.toggleFavorite}
          />
          <footer className="flex justify-between border-t border-[#edf1ed] dark:border-stroke pt-5.25 text-2xs text-[#a2b0a4] dark:text-text-subtle max-mobile:gap-3">
            <span>© 2026 Northstar Analytics</span>
            <span className="flex items-center gap-0.75">
              Made for clearer decisions <ArrowDownRight size={14} />
            </span>
          </footer>
        </div>
      </main>

      {selectedAsset && library.requestFor === undefined && (
        <AssetModal
          asset={selectedAsset}
          isFavorite={library.favorites.includes(selectedAsset.id)}
          onClose={library.closeAsset}
          onFavorite={() => library.toggleFavorite(selectedAsset.id)}
          onRequest={() => library.openRequest(selectedAsset)}
          onToast={library.setToast}
        />
      )}
      {library.requestFor !== undefined && (
        <RequestModal
          asset={library.requestFor}
          onClose={library.closeRequest}
          onSubmit={library.handleRequest}
        />
      )}
      <LibraryToast
        message={library.toast}
        onDismiss={() => library.setToast("")}
      />
    </div>
  );
}
