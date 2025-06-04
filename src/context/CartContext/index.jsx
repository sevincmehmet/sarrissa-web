import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CardProvider({ children }) {
    const [cardItems, setCardItems] = useState([]);
    return (
        <CartContext.Provider
            value={{
                cardItems,
                setCardItems
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCardData() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("error card");
    }
    return context;
}
