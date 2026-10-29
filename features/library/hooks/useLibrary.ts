import { useEffect, useMemo, useRef, useState } from "react";
import { matchesCategory, type Asset, type Category } from "../data";
import { libraryStorage } from "../storage";

export function useLibrary(assets: Asset[]) {
  const [category, setCategory] = useState<Category>("Featured");
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [requestFor, setRequestFor] = useState<Asset | null | undefined>();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [toast, setToast] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRecentSearches(libraryStorage.recent.read());
    const savedFavorites = libraryStorage.favorites
      .read()
      .filter((id) => assets.some((asset) => asset.id === id));
    setFavorites(savedFavorites);
    libraryStorage.favorites.write(savedFavorites);
  }, [assets]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = assets.find((asset) => asset.id === params.get("asset"));
    if (fromUrl) setSelectedAsset(fromUrl);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedAsset(null);
        setRequestFor(undefined);
        setSearchFocused(false);
        window.history.replaceState(null, "", window.location.pathname);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [assets]);

  useEffect(() => {
    document.body.style.overflow =
      selectedAsset || requestFor !== undefined ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedAsset, requestFor]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return assets.filter((asset) => {
      const searchable =
        `${asset.title} ${asset.description} ${asset.kind} ${asset.category} ${asset.tags.join(" ")} ${asset.owner}`.toLowerCase();
      return (
        matchesCategory(asset, category) &&
        (!showFavorites || favorites.includes(asset.id)) &&
        (!term || searchable.includes(term))
      );
    });
  }, [assets, category, query, showFavorites, favorites]);

  const featured = filtered.filter((asset) => asset.featured);
  const trending = filtered.filter((asset) => asset.trending);

  const commitSearch = (value: string) => {
    const clean = value.trim();
    setQuery(clean);
    setSearchFocused(false);
    if (!clean) return;
    const next = [
      clean,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== clean.toLowerCase(),
      ),
    ].slice(0, 5);
    setRecentSearches(next);
    libraryStorage.recent.write(next);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    libraryStorage.recent.clear();
  };

  const toggleFavorite = (id: string) => {
    const wasFavorite = favorites.includes(id);
    const next = wasFavorite
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];
    setFavorites(next);
    libraryStorage.favorites.write(next);
    setToast(wasFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const openAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    window.history.replaceState(null, "", `?asset=${asset.id}`);
  };

  const closeAsset = () => {
    setSelectedAsset(null);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const openRequest = (asset: Asset | null = null) => {
    setRequestFor(asset);
    setMobileNavOpen(false);
  };

  const handleRequest = (reason: string) => {
    libraryStorage.requests.save({
      assetId: requestFor?.id ?? null,
      reason,
      createdAt: new Date().toISOString(),
    });
    setRequestFor(undefined);
    setSelectedAsset(null);
    window.history.replaceState(null, "", window.location.pathname);
    setToast("Request saved locally in this demo.");
  };

  const showLibrary = () => {
    setShowFavorites(false);
    setCategory("Featured");
    setMobileNavOpen(false);
  };

  const showFavoritesView = () => {
    setShowFavorites(true);
    setMobileNavOpen(false);
  };

  const showCategory = (next: Category) => {
    setCategory(next);
    setShowFavorites(false);
    setMobileNavOpen(false);
  };

  const clearFilters = () => {
    setQuery("");
    setShowFavorites(false);
  };

  const resetView = () => {
    clearFilters();
    setCategory("Featured");
  };

  const focusSearch = () => {
    searchRef.current?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    category,
    setCategory,
    query,
    setQuery,
    searchFocused,
    setSearchFocused,
    recentSearches,
    favorites,
    selectedAsset,
    requestFor,
    showFavorites,
    setShowFavorites,
    showMore,
    setShowMore,
    toast,
    setToast,
    mobileNavOpen,
    setMobileNavOpen,
    searchRef,
    filtered,
    featured,
    trending,
    commitSearch,
    clearRecentSearches,
    toggleFavorite,
    openAsset,
    closeAsset,
    openRequest,
    handleRequest,
    showLibrary,
    showFavoritesView,
    showCategory,
    clearFilters,
    resetView,
    focusSearch,
    closeRequest: () => setRequestFor(undefined),
  };
}
