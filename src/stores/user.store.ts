import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserInfo = {
  birthday: string;
  code: string;
  fullName: string;
  gender: string;
  msg: string;
  msisdn: string;
  nonce_str: string;
  openid: string;
  result: string;
  sign: string;
  sign_type: string;
  userId: string;
};

export type ResultItem = {
  fullName: string;
  isRegesterd: number;
  kpayId: string;
  phone: string;
  registerId: string;
  userInfo: UserInfo;
};

type UserStore = {
  users: ResultItem[];
  setUsers: (results: ResultItem[]) => void;
  clearUsers: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [],
      setUsers: (users) => set({ users}),
      clearUsers: () => set({users: [] }),
    }),
    {
      name: "user-storage", // key in storage
      storage: createJSONStorage(() => localStorage), // or your encryptStorage
    }
  )
);