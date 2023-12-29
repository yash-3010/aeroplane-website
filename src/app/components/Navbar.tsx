"use client";

import { FC, useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlaneUp } from "react-icons/fa6";
import { animated, useSpring } from "@react-spring/web";
import { useRouter } from "next/navigation";
import { GlobalContext } from "../context/user";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const router = useRouter();

  const { user, logout } = useContext<any>(GlobalContext);

  const [open, setopen] = useState(false);
  const springsR = useSpring({
    from: { x: 500, opacity: 0 },
    to: { x: 0, opacity: 1 },
  });
  const springsL = useSpring({
    from: { x: -500, opacity: 0 },
    to: { x: 0, opacity: 1 },
  });
  const springsM = useSpring({
    from: { z: -500, opacity: 0 },
    to: { z: 0, opacity: 1 },
    delay: 500,
  });

  return (
    <nav className="absolute top-0 z-10 inset-x-0 ">
      <div className="max-w-[1400px] mx-2 md:mx-auto relative flex items-center justify-between px-4 py-1">
        <animated.div
          style={{ ...springsL }}
        >
          <Link className="flex items-center flex-shrink-0 cursor-pointer mr-6 gap-3" href="/">
            <span className="font-semibold text-xl tracking-tight">
              <FaPlaneUp />
            </span>
            <span className="font-semibold text-xl tracking-tight">
              Vimaneuver
            </span>
          </Link>
        </animated.div>

        <animated.div
          style={{ ...springsM }}
          className="hidden md:flex font-semibold"
        >
          <button className="py-3 px-5 hover:border-b-2 border-b-black hover:cursor-pointer">
            Home
          </button>
          <button className="py-3 px-5 hover:border-b-2 border-b-black hover:cursor-pointer">
            About
          </button>
          <button className="py-3 px-5 hover:border-b-2 border-b-black hover:cursor-pointer">
            Contact
          </button>
        </animated.div>
        <animated.div
          style={{ ...springsR }}
          className="hidden md:flex font-semibold"
        >
          {!user ? (
            <div>
              <button
                onClick={() => router.push("/auth/login")}
                className="py-3 px-5 hover:border-b-2 border-b-black hover:cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/auth/signup")}
                className="py-3 px-5 hover:border-b-2 border-b-black hover:cursor-pointer"
              >
                Signup
              </button>
            </div>
          ) : (
            <div className="flex">
              <button
                onClick={() => router.push("/cart")}
                className="py-3 px-5 hover:border-b-2 flex gap-2 items-center border-b-black hover:cursor-pointer"
              >
                Cart <FaShoppingCart />
              </button>
              <button
                onClick={logout}
                className="py-3 px-5 hover:border-b-2 border-b-black hover:cursor-pointer"
              >
                SignOut
              </button>
            </div>
          )}
        </animated.div>

        {/* mobile view */}
        <div className="block md:hidden">
          <button
            onClick={() => {
              setopen(!open);
              console.log(open);
            }}
            className="flex items-center px-3 py-2 border-2 rounded"
          >
            <GiHamburgerMenu />
          </button>
        </div>
        {/* <div
          className={`${
            open ? "translate-x-0" : "translate-x-full"
          } w-full absolute top-[42px] md:hidden transition-all ease-in-out duration-100 inset-x-0 bg-black z-10`}
        >
          <ul className="my-2">
            <li className="text-white text-center cursor-pointer text-lg p-3 w-full">
              Home
            </li>
            <li className="text-white text-center cursor-pointer text-lg p-3 w-full">
              About
            </li>
            <li className="text-white text-center cursor-pointer text-lg p-3 w-full">
              Contact
            </li>
          </ul>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
