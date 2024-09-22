import { create } from "zustand";

interface CollapseProps {
  isCollapsed: boolean;
  setIsCollapsed: () => void;
}

export const useCollapse = create<CollapseProps>()((set) => ({
  isCollapsed: false,
  setIsCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
