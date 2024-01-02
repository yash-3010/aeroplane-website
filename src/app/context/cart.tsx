"use client";

import { useRouter } from "next/navigation";
import { createContext, use, useContext, useEffect, useState } from "react";

interface ContextProps {
  addToCart: (product: cartProduct) => void;
  removeFromCart: (product: cartProduct) => void;
  isitemAddedToCart: (product: cartProduct) => boolean;
  clearCart: () => void;
  getCart: () => cartProduct[];
  cartSize: number;
  decreaseQuantity: (product: cartProduct) => void;
  increaseQuantity: (product: cartProduct) => void;
}

const Context = createContext<ContextProps>({} as ContextProps);

interface cartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  Categories: {
    name: string;
  } | null;
  quantity?: number;
}

const Provider = ({ children }: any) => {
  const router = useRouter();

  const [cartSize, setcartSize] = useState<number>(0);

  useEffect(() => {
    getCartSize();
  }, []);

  const getCart = () => {
    let cart = [];
    if (typeof localStorage !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart") || "{}");
      }
    }
    return cart;
  };

  const addToCart = (product: cartProduct) => {
    let cart = getCart();
    product.quantity = 1;
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCartSize();
  };

  const increaseQuantity = (product: cartProduct) => {
    let cart = getCart();
    cart.map((item: cartProduct) => {
      if (item.id === product.id) {
        item.quantity = item.quantity ? item.quantity + 1 : 1;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    getCartSize();
  };

  const decreaseQuantity = (product: cartProduct) => {
    let cart = getCart();
    cart.map((item: cartProduct) => {
      if (item.id === product.id) {
        item.quantity = item.quantity ? item.quantity - 1 : 1;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    getCartSize();
  };

  const removeFromCart = (product: cartProduct) => {
    let cart = getCart();
    cart = cart.filter((item: cartProduct) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCartSize();
  };

  const getCartSize = () => {
    let cart = getCart();
    setcartSize(cart.length);
  };

  const isitemAddedToCart = (product: cartProduct) => {
    let cart = getCart();
    return cart.some((item: cartProduct) => item.id === product.id);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
  };

  const exposed = {
    addToCart,
    removeFromCart,
    isitemAddedToCart,
    clearCart,
    getCart,
    decreaseQuantity,
    increaseQuantity,
    cartSize,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useCart = () => {
  return useContext(Context);
};

export default Provider;
