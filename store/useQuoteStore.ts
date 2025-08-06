// store/useQuoteStore.ts
import { create } from "zustand";

interface Quote {
  id: number;
  text: string;
  author: string;
}

interface QuoteStore {
  favorites: Quote[];
  addFavorite: (quote: Quote) => void;
}

export const useQuoteStore = create<QuoteStore>((set) => ({
  favorites: [],
  addFavorite: (quote) =>
    set((state) => ({
      favorites: [...state.favorites, quote],
    })),
}));
