import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type Bookmarks = {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
};

const BookmarksContext = createContext<Bookmarks | null>(null);

/**
 * Moments the person has bookmarked from the player.
 * Kept in memory for now, so saved moments reset when the app restarts.
 */
export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const value = useMemo(
    () => ({
      savedIds,
      isSaved: (id: string) => savedIds.includes(id),
      toggleSaved: (id: string) =>
        setSavedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [id, ...ids])),
    }),
    [savedIds],
  );
  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export function useBookmarks() {
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error('useBookmarks must be used inside BookmarksProvider');
  return ctx;
}
