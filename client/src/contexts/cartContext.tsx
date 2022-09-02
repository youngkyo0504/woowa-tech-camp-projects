import React, { createContext, useContext, useMemo, useState } from 'react';
import { MAX_COUNT } from '../components/Modal/MenuModal/useMenuOption';

export interface CartItem {
  optionHash: string;
  menuId: number;
  price: number;
  option: (string | number | boolean)[];
  count: number;
  name: string;
  thumbnail: string;
}
interface Actions {
  add: (newCartItem: CartItem) => void;
  delete: (optionHash: CartItem['optionHash']) => () => void;
  deleteAll: () => void;
  countUp: (optionHash: CartItem['optionHash']) => () => void;
  countDown: (optionHash: CartItem['optionHash']) => () => void;
  getTotalPrice: () => number;
  getNumberOfProduct: () => number;
}

interface CartContext {
  cart: CartItem[];
  cartActions: Actions;
}

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartContext>(null!);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartActions: Actions = useMemo(() => {
    return {
      deleteAll: () => {
        setCart([]);
      },
      add: (newCartItem: CartItem) => {
        const { optionHash, count } = newCartItem;
        const existedCartIndex = cart.findIndex((cartItem) => cartItem.optionHash === optionHash);

        if (existedCartIndex !== -1) {
          const newCart = [...cart];
          const cartItem = newCart[existedCartIndex];

          cartItem.count += count;

          if (cartItem.count >= MAX_COUNT) {
            cartItem.count = MAX_COUNT;
            return setCart(newCart);
          }

          setCart(newCart);
          return;
        }

        const newCart = [newCartItem, ...cart];
        setCart(newCart);
      },

      delete: (optionHash: CartItem['optionHash']) => () => {
        const newCart = cart.filter((cartItem) => cartItem.optionHash !== optionHash);
        setCart(newCart);
      },
      getTotalPrice: () => {
        const totalPrice = cart.reduce((total, { count, price }) => total + price * count, 0);
        return totalPrice;
      },
      getNumberOfProduct: () => {
        const quantity = cart.reduce((length, { count }) => length + count, 0);
        return quantity;
      },
      countUp: (optionHash: CartItem['optionHash']) => () => {
        const id = cart.findIndex((cartItem) => cartItem.optionHash === optionHash);
        const newCart = [...cart];
        const cartItem = newCart[id];
        if (cartItem.count >= MAX_COUNT) {
          return;
        }
        cartItem.count++;
        setCart(newCart);
      },

      countDown: (optionHash: CartItem['optionHash']) => () => {
        const id = cart.findIndex((cartItem) => cartItem.optionHash === optionHash);
        const newCart = [...cart];
        const cartItem = newCart[id];
        if (cartItem.count === 1) {
          return;
        }
        cartItem.count = cartItem.count - 1;
        setCart(newCart);
      },
    };
  }, [cart]);

  return <CartContext.Provider value={{ cart, cartActions }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('cartContext does not exist in react tree');
  }

  return context;
}
