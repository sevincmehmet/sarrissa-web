import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CartContext = createContext();

export function CardProvider({ children }) {
  const [cardItems, setCardItems] = useState([]);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <CartContext.Provider
      value={{
        cardItems,
        setCardItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCardData() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("error card");
  }
  return context;
}
