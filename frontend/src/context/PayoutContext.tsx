"use client";
import { createContext, ReactNode, useContext, useState } from "react";

export interface Payout {
  accountName: string;
  accountNumber: string;
  bank: string;
  bvn: string;
}

interface PayoutContextType {
  payouts: Payout[];
  addPayout: (data: Payout) => void;
  deletePayout: (accountNumber: string) => void;
}

export const PayoutContext = createContext<PayoutContextType | null>(null);

export const PayoutProvider = ({ children }: { children: ReactNode }) => {
  const [payouts, setPayouts] = useState<Payout[]>([]);

  const addPayout = (data: Payout) => {
    setPayouts([...payouts, data]);
  };

  const deletePayout = (accountNumber: string) => {
    setPayouts(payouts.filter((p) => p.accountNumber !== accountNumber));
  };

  return (
    <PayoutContext.Provider value={{ payouts, addPayout, deletePayout }}>
      {children}
    </PayoutContext.Provider>
  );
};

export const usePayoutContext = () => {
  const context = useContext(PayoutContext);
  if (!context) {
    throw new Error("usePayoutContext must be used within a PayoutProvider");
  }
  return context;
};
