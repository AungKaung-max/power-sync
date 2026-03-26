import { encryptStorage } from "@/utils/encryptStore";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Hub = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  power: number;
  price: number;
  status: string;
  total_slots: number;
  available_slots: number;
  wifi: string | null;
  distance: number;
};

type HubStore = {
  hub: Hub | null;
  setHub: (hub: Hub | null) => void;
};

export const useHubStore = create<HubStore>()(
  persist(
    (set) => ({
      hub: null,
      setHub: (hub) => set({ hub }),
    }),
    {
      name: "hub-storage",
      storage: createJSONStorage(() => encryptStorage),
    }
  )
);