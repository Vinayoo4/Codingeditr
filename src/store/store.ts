import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GearItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: number;
  url?: string;
  imageUrl?: string;
}

export interface Setup {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  gearIds: string[]; // references GearItem.id
  tags: string[];
}

export interface User {
  id: string;
  role: 'visitor' | 'admin';
  favoriteSetupIds: string[];
  wishlistGearIds: string[];
}

interface AppState {
  setups: Setup[];
  gearItems: GearItem[];
  currentUser: User;

  // Actions
  addSetup: (setup: Setup) => void;
  updateSetup: (setup: Setup) => void;
  deleteSetup: (id: string) => void;

  addGearItem: (item: GearItem) => void;
  updateGearItem: (item: GearItem) => void;
  deleteGearItem: (id: string) => void;

  toggleFavoriteSetup: (setupId: string) => void;
  toggleWishlistGear: (gearId: string) => void;
  setRole: (role: 'visitor' | 'admin') => void;

  setSeedData: (setups: Setup[], gearItems: GearItem[]) => void;
}

const initialUser: User = {
  id: 'user-1',
  role: 'visitor',
  favoriteSetupIds: [],
  wishlistGearIds: [],
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      setups: [],
      gearItems: [],
      currentUser: initialUser,

      addSetup: (setup) => set((state) => ({ setups: [...state.setups, setup] })),
      updateSetup: (updatedSetup) => set((state) => ({
        setups: state.setups.map((s) => s.id === updatedSetup.id ? updatedSetup : s)
      })),
      deleteSetup: (id) => set((state) => ({
        setups: state.setups.filter((s) => s.id !== id),
        currentUser: {
          ...state.currentUser,
          favoriteSetupIds: state.currentUser.favoriteSetupIds.filter(favId => favId !== id)
        }
      })),

      addGearItem: (item) => set((state) => ({ gearItems: [...state.gearItems, item] })),
      updateGearItem: (updatedItem) => set((state) => ({
        gearItems: state.gearItems.map((g) => g.id === updatedItem.id ? updatedItem : g)
      })),
      deleteGearItem: (id) => set((state) => ({
        gearItems: state.gearItems.filter((g) => g.id !== id),
        setups: state.setups.map(s => ({...s, gearIds: s.gearIds.filter(gid => gid !== id)})),
        currentUser: {
          ...state.currentUser,
          wishlistGearIds: state.currentUser.wishlistGearIds.filter(wid => wid !== id)
        }
      })),

      toggleFavoriteSetup: (setupId) => set((state) => {
        const isFavorite = state.currentUser.favoriteSetupIds.includes(setupId);
        return {
          currentUser: {
            ...state.currentUser,
            favoriteSetupIds: isFavorite
              ? state.currentUser.favoriteSetupIds.filter((id) => id !== setupId)
              : [...state.currentUser.favoriteSetupIds, setupId],
          },
        };
      }),

      toggleWishlistGear: (gearId) => set((state) => {
        const inWishlist = state.currentUser.wishlistGearIds.includes(gearId);
        return {
          currentUser: {
            ...state.currentUser,
            wishlistGearIds: inWishlist
              ? state.currentUser.wishlistGearIds.filter((id) => id !== gearId)
              : [...state.currentUser.wishlistGearIds, gearId],
          },
        };
      }),

      setRole: (role) => set((state) => ({
        currentUser: { ...state.currentUser, role }
      })),

      setSeedData: (setups, gearItems) => set(() => ({
        setups,
        gearItems
      })),
    }),
    {
      name: 'code-space-storage',
    }
  )
);
