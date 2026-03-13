import { RouterGuardState } from "@/types/type";
import { create } from "zustand";

export const routerGuard = create<RouterGuardState>((set) => ({
  accessUserDetails: false,
  enableAccessUserDetails: () => set({ accessUserDetails: true }),
  disableAccessUserDetails: () => set({ accessUserDetails: false }),
}));
