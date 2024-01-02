"use client";

import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import Image from "next/image";
import { useCart } from "../context/cart";
import { MdDelete } from "react-icons/md";
import { to } from "@react-spring/web";
import toast from "react-hot-toast";

const ShoppingCart = () => {
  const router = useRouter();
  const cart = useCart();

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

  const [data, setdata] = useState<cartProduct[]>([]);
  const [subtotal, setsubtotal] = useState(0);

  const getCartProducts = () => {
    let cart = [];
    if (typeof localStorage !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart") || "{}");
      }
    }
    const subtotal = cart.reduce((acc: number, item: cartProduct) => {
      return acc + item.price * item.quantity!;
    }, 0);
    setsubtotal(subtotal);
    setdata(cart);
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-32">
      <header className="mb-10 mx-auto max-w-5xl xl:px-0 px-6 text-3xl tracking-wide font-semibold flex gap-5">
        <span
          onClick={() => router.back()}
          className="p-2 text-xl bg-white rounded-full hover:bg-opacity-50 cursor-pointer"
        >
          <FaChevronLeft />
        </span>
        Shopping Cart
      </header>
      <div className="mx-auto max-w-5xl flex justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {data.length!==0 ?
            data.map((item: any) => (
              <div
                key={item.id}
                className="mb-6 bg-white p-6 shadow-md flex justify-between items-center"
              >
                <Image
                  src={item.image}
                  alt="Product"
                  className="w-full h-28 object-cover rounded-lg sm:w-40"
                  width={500}
                  height={500}
                  priority={true}
                />
                <div className="ml-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">
                      {item.Categories.name}
                    </p>
                  </div>
                  <p className="font-bold text-xl py-2">${item.price}</p>
                  <div className="flex justify-between">
                    <div className="flex">
                      <button
                        onClick={() => {
                          cart.decreaseQuantity(item);
                          getCartProducts();
                        }}
                        className="bg-gray-200 rounded-md hover:bg-gray-400 px-2 py-1 mr-2"
                      >
                        -
                      </button>
                      <p className="font-semibold flex items-center">
                        {item.quantity}
                      </p>
                      <button
                        onClick={() => {
                          cart.increaseQuantity(item);
                          getCartProducts();
                        }}
                        className="bg-gray-200 rounded-md hover:bg-gray-400 px-2 py-1 ml-2"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center p-2 rounded-full hover:bg-gray-200"><MdDelete onClick={()=>{
                      cart.removeFromCart(item);
                      getCartProducts();
                      toast.error("Item removed from cart", {
                        duration: 3000,
                      });
                    }} className="text-red-500 cursor-pointer text-lg"/></div>
                  </div>
                </div>
              </div>
            ))
          :
          <div className="w-full h-full flex flex-col justify-center items-center border-2 border-gray-400 border-dashed rounded-md">
            <h1 className="text-2xl font-semibold text-gray-400 tracking-wider">Your cart is empty</h1>
            <button onClick={()=>router.push("/")} className="bg-gray-300 hover:bg-gray-400 text-gray-600 duration-300 px-4 py-2 rounded-md mt-4">Go to Home</button>
          </div>
          }
        </div>
        {/* Subtotal section */}
        <aside className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <h3 className="text-xl font-semibold tracking-wide">Order Summary</h3>
          <hr className="my-4" />
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${subtotal}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">${subtotal + 4.99} USD</p>
              <p className="text-sm text-gray-700">Including VAT</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-black py-1.5 font-medium text-blue-50">
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </div>
  );
};

export default ShoppingCart;
