
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Project } from '../types';

interface CartContextType {
  cartItems: Project[];
  addToCart: (item: Project) => void;
  removeFromCart: (itemId: number) => void;
  isItemInCart: (itemId: number) => boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Project[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('portfolio-cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems]);

  const isItemInCart = (itemId: number): boolean => {
    return cartItems.some(p => p.id === itemId);
  };

  const addToCart = (item: Project) => {
    if (!isItemInCart(item.id)) {
      setCartItems(prevItems => [...prevItems, item]);
    }
    openCart();
  };
  
  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(p => p.id !== itemId));
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isItemInCart, isCartOpen, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
