"use client";

import Image from "next/image";
import React from "react";
import { FaCartPlus } from "react-icons/fa";
import p1 from "../../../public/p1.png";
import p2 from "../../../public/p2.png";
import p3 from "../../../public/p3.png";
import { useRouter } from "next/navigation";

const ProductGrid = () => {

    const router = useRouter();

  return (
    <section className="px-10 h-full grid place-items-center pt-20 max-w-[1400px] md:mx-auto">
      <h1 className="text-5xl w-full font-light tracking-wider">
        Our Top Models
      </h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        <div className="w-96 cursor-pointer bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <Image
            src={p1}
            alt="Product"
            className="h-80 w-full object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-96">
            <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Product Name
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                $149
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
              </del>

              <button onClick={()=>router.push("/cart")} className="ml-auto flex justify-center gap-2 items-center text-sm font-semibold px-4 py-1.5 rounded-md bg-black text-white hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <FaCartPlus /> Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="w-96 cursor-pointer bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <Image
            src={p2}
            alt="Product"
            className="h-80 w-full object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-96">
            <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Product Name
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                $149
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
              </del>

              <button onClick={()=>router.push("/cart")} className="ml-auto flex justify-center gap-2 items-center text-sm font-semibold px-4 py-1.5 rounded-md bg-black text-white hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <FaCartPlus /> Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="w-96 cursor-pointer bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <Image
            src={p3}
            alt="Product"
            className="h-80 w-full object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-96">
            <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Product Name
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                $149
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
              </del>
              <button onClick={()=>router.push("/cart")} className="ml-auto flex justify-center gap-2 items-center text-sm font-semibold px-4 py-1.5 rounded-md bg-black text-white hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <FaCartPlus /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
