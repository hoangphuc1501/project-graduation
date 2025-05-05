
// import React, { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const [cartItems, setCartItems] = useState([]);

//     useEffect(() => {
//         const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
//         setCartItems(storedCart);
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     }, [cartItems]);
//     console.log("Cart items:", cartItems);
//     return (
//         <CartContext.Provider value={{ cartItems, setCartItems }}>
//             {children}
//         </CartContext.Provider>
//     );
// };
