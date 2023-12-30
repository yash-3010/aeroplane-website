"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { FaPlaneUp } from "react-icons/fa6";
import { GlobalContext } from "../context/user";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setemail] = useState<string>("");

  const { forgotPassword, setauthenticating, authenticating } =
    useContext<any>(GlobalContext);

  // stop user to resend password reset link until 5 minutes

  const handleForgotPassword = () => {
    const emailRegex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    forgotPassword(email);
    setauthenticating(true);
    setemail("");

    // console.log(location)
  };

  return (
    <div className="flex justify-around h-screen">
      <Image
        src="https://cdn.dribbble.com/users/7421625/screenshots/18846573/media/6776ddf425df0a70ed21224e30ef6c44.gif"
        alt="forgot password gif"
        className="object-cover my-auto flex-shrink-0 hidden w-96 h-96 md:block"
        width={500}
        height={500}
        priority={true}
      />
      <div className="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Link
          className="flex items-center flex-shrink-0 cursor-pointer mr-6 gap-3 mb-6 font-semibold text-gray-900"
          href="/"
        >
          <span className="font-semibold text-3xl tracking-tight">
            <FaPlaneUp />
          </span>
          <span className="font-semibold text-3xl tracking-tight">
            Vimaneuver
          </span>
        </Link>
        <div className="w-full p-6 bg-white rounded-lg shadow border md:mt-0 sm:max-w-md sm:p-8">
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Forgot your password?
          </h1>
          <p className="font-light text-gray-500">
            Don&apos;t fret! Just type in your email and we will send you a link
            to reset your password!
          </p>
          <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleForgotPassword}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Reset password
            </button>
          </div>
        </div>
      </div>
      {authenticating && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <img
            className="opacity-80"
            src="https://cdn.dribbble.com/users/328772/screenshots/10293847/media/d45c05b5e858e2508fb1a3b84f33e932.gif"
            alt="plane-loading"
          />
          <span className="absolute bottom-56 text-2xl font-semibold tracking-wide text-gray-600">
            Loading...
          </span>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
