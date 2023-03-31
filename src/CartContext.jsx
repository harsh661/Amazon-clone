import { useState, createContext } from "react";

export const CartContext = createContext([])

export function CartContextProvider({children}) {
    const[cartItems, setCartItems] = useState([])
    const[user, setUser] = useState(null)
    const[total, setTotal] = useState(0)
    const [address, setAddress] = useState(null)

    return (
        <CartContext.Provider value={{cartItems, setCartItems, user, setUser, total, setTotal, address, setAddress}}>
            {children}
        </CartContext.Provider>
    )
}