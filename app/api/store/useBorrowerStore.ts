import { create } from "zustand";

type Borrower = {
  id: string;
  name: string;
  loan_type: string;
  amount: number;
  status: string;
};

type Store = {
  activeBorrower: Borrower | null;
  setActiveBorrower: (borrower: Borrower) => void;
};

export const useBorrowerStore = create<Store>((set) => ({
  activeBorrower: null,
  setActiveBorrower: (borrower) => set({ activeBorrower: borrower }),
}));
