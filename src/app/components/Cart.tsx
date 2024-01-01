"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import p3 from "../../../public/p3.png";
import Image from "next/image";

const ShoppingCart = () => {

    const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 pt-32">
      <header className="mb-10 mx-auto max-w-5xl xl:px-0 px-6 text-3xl tracking-wide font-semibold flex gap-5">
        <span onClick={()=>router.back()} className="p-2 text-xl bg-white rounded-full hover:bg-opacity-50 cursor-pointer"><FaChevronLeft /></span>
        Shopping Cart
      </header>
      <div className="mx-auto max-w-5xl flex justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <section className="rounded-lg md:w-2/3">
          <div className="mb-6 bg-white p-6 shadow-md flex justify-between items-center">
            <Image
              src={p3}
              alt="Product"
              className="w-full rounded-lg sm:w-40"
            />
            <div className="ml-4 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Nike Air Max 2019
                </h2>
                <p className="mt-1 text-xs text-gray-700">Size: 36EU - 4US</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <button className="cursor-pointer bg-gray-100 py-1 px-3.5 rounded-l hover:bg-blue-500 hover:text-blue-50">
                    -
                  </button>
                  <input
                    className="h-8 w-8 border bg-white text-center text-xs outline-none"
                    type="number"
                    value="2"
                    min="1"
                  />
                  <button className="cursor-pointer bg-gray-100 py-1 px-3 rounded-r hover:bg-blue-500 hover:text-blue-50">
                    +
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm">259.000 ₭</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* Another product section (similar structure) */}
        </section>
        {/* Subtotal section */}
        <aside className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <h3 className="text-xl font-semibold tracking-wide">Order Summary</h3>
          <hr className="my-4" />
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">$129.99</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">$134.98 USD</p>
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
