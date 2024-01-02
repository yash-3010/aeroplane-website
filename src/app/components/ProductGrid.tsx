"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../types/supabase";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { GlobalContext } from "../context/user";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  Categories: {
    name: string;
  } | null;
}

const ProductGrid = () => {
  const cart = useCart();
  const { user } = useContext<any>(GlobalContext);

  const [productsData, setproductsData] = useState<Product[]>([]);
  const [loading, setloading] = useState(true);

  async function getProducts() {
    const supabaseClient = createClientComponentClient<Database>();

    try {
      const { data, error } = await supabaseClient
        .from("Airplanes")
        .select(`id, name, price, image, Categories(name)`);
      if (error) {
        throw error;
      }
      if (data) {
        setproductsData(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const router = useRouter();

  return (
    <section className="px-10 h-full grid place-items-center pt-20 max-w-[1400px] md:mx-auto">
      <h1 className="text-5xl w-full font-light tracking-wider">
        Our Top Models
      </h1>
      {loading ? (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 animate-pulse justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          <div className="w-96 h-96 cursor-pointer bg-gray-100 shadow-md rounded-xl"></div>
          <div className="w-96 h-96 cursor-pointer bg-gray-100 shadow-md rounded-xl"></div>
          <div className="w-96 h-96 cursor-pointer bg-gray-100 shadow-md rounded-xl"></div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {productsData.map((product) => (
            <div
              key={product.id}
              className="w-96 cursor-pointer bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
            >
              <Image
                src={product.image}
                alt="Product"
                className="h-80 w-full object-cover rounded-t-xl"
                width={500}
                height={500}
              />
              <div className="px-4 py-3 w-96">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {product.Categories?.name}
                </span>
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product.name}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    ${product.price}
                  </p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">
                      $1299.99
                    </p>
                  </del>

                  <button
                    onClick={() => {
                      if (user) {
                        if (cart.isitemAddedToCart(product)) {
                          cart.removeFromCart(product);
                          toast.error("Item removed from cart", {
                            duration: 3000,
                          });
                        } else {
                          cart.addToCart(product);
                          toast.success("Item added to cart", {
                            duration: 3000,
                          });
                        }
                      } else {
                        router.push("/auth/login");
                      }
                    }}
                    className={`
                    ${user && cart.isitemAddedToCart(product) ? `bg-red-600` : `bg-black`}
                    ml-auto flex justify-center gap-2 items-center text-sm font-semibold px-4 text-white py-1.5 rounded-md hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]
                    `}
                  >
                    <FaCartPlus />  {user && cart.isitemAddedToCart(product) ? `Remove form Cart` : `Add to Cart`}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
