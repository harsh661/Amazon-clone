import { useState, createContext } from "react";

export const CartContext = createContext([])

export function CartContextProvider({children}) {
    const[cartItems, setCartItems] = useState([])
    const[user, setUser] = useState(null)
    const[total, setTotal] = useState(0)
    const[data, setData] = useState(null)

    return (
        <CartContext.Provider value={{cartItems, setCartItems, user, setUser, total, setTotal}}>
            {children}
        </CartContext.Provider>
    )
}