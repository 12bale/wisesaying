// store/useQuoteStore.ts
import { create } from "zustand";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
interface Quote {
  id: number;
  text: string;
  author: string;
}

type State = {
  favorites: Quote[];
  addFavorite: (quote: Quote) => void;
  removeFavorite: (quote: Quote) => void;
  isFavorite: (quote: Quote) => boolean;
};

export const useQuoteStore = create<State>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (quote) => {
        const current = get().favorites;
        if (!current.find((q) => q.id === quote.id)) {
          set({ favorites: [...current, quote] });
        }
      },
      removeFavorite: (quote) => {
        const filtered = get().favorites.filter((q) => q.id !== quote.id);
        set({ favorites: filtered });
      },
      isFavorite: (quote) => {
        return get().favorites.some((q) => q.id === quote.id);
      },
    }),
    {
      name: "quote-storage", // AsyncStorage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
