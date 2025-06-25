"use client";

import {
  createContext,
  useState,
  ReactNode,
  useContext,
} from "react";

import {Order} from "@/utils/api/Order";

interface OrderContextType {
  orderContext: Order | null;
  setOrderContext: (order: Order) => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orderContext, setOrderD] = useState<Order | null>(null);

  const setOrderContext= (order: Order) => {
    setOrderD(order);
  };

  return (
    <OrderContext.Provider value={{ orderContext, setOrderContext }}>
      {children}
    </OrderContext.Provider>
  );
};


export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrderId must be used within OrderIdProvider");
  return context;
};
