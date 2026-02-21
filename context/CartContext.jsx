import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = useCallback((product) => {
        setCartItems(prev => [...prev, { ...product, id: Date.now().toString() + Math.random().toString(36).substr(2, 9) }]);
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    }, []);

    const updateCartItemQuantity = useCallback((productId, newQuantity) => {
        setCartItems(prev => prev.map(item =>
            item.id === productId ? { ...item, productQuantity: Math.max(1, newQuantity) } : item
        ));
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const cartTotal = useMemo(() => {
        return cartItems.reduce((total, item) => {
            const priceStr = String(item.productPrice || '0').replace('₹', '').replace(',', '');
            const price = parseFloat(priceStr);
            return total + (price * (item.productQuantity || 1));
        }, 0);
    }, [cartItems]);

    const contextValue = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        cartTotal,
        cartCount: cartItems.length
    }), [cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart, cartTotal]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
