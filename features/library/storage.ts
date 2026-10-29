const RECENT_KEY = "library-recent-searches";
const FAVORITES_KEY = "library-favorites";
const REQUESTS_KEY = "library-requests";

export type SavedRequest = {
  assetId: string | null;
  reason: string;
  createdAt: string;
};

function readList<T>(key: string, isItem: (value: unknown) => value is T): T[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(value) ? value.filter(isItem) : [];
  } catch {
    return [];
  }
}

const isString = (value: unknown): value is string => typeof value === "string";
const isSavedRequest = (value: unknown): value is SavedRequest =>
  typeof value === "object" &&
  value !== null &&
  "reason" in value &&
  typeof value.reason === "string" &&
  "createdAt" in value &&
  typeof value.createdAt === "string" &&
  "assetId" in value &&
  (value.assetId === null || typeof value.assetId === "string");

export const libraryStorage = {
  recent: {
    read: () => readList(RECENT_KEY, isString),
    write: (values: string[]) =>
      localStorage.setItem(RECENT_KEY, JSON.stringify(values)),
    clear: () => localStorage.removeItem(RECENT_KEY),
  },
  favorites: {
    read: () => readList(FAVORITES_KEY, isString),
    write: (values: string[]) =>
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(values)),
  },
  requests: {
    save: (request: SavedRequest) => {
      const existing = readList(REQUESTS_KEY, isSavedRequest);
      localStorage.setItem(
        REQUESTS_KEY,
        JSON.stringify([...existing, request]),
      );
    },
  },
};
