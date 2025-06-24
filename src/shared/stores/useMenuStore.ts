import { create } from "zustand";

type MenuState = {
  selectedDepth1: number | null;
  selectedDepth2: number;
  setSelectedDepth1: (depth1: number | null) => void;
  setSelectedDepth2: (depth2: number) => void;
  resetMenu: () => void;
};

export const useMenuStore = create<MenuState>((set) => ({
  selectedDepth1: null,
  selectedDepth2: 0,
  setSelectedDepth1: (depth1) =>
    set((state) => ({
      selectedDepth1: state.selectedDepth1 === depth1 ? null : depth1,
      selectedDepth2: 0, // depth1 바뀌면 depth2 초기화
    })),
  setSelectedDepth2: (depth2) => set({ selectedDepth2: depth2 }),
  resetMenu: () => set({ selectedDepth1: null, selectedDepth2: 0 }),
}));
