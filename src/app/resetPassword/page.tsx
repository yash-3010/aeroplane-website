"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaPlaneUp } from "react-icons/fa6";
import { GlobalContext } from "../context/user";

const ResetPassword = () => {
    const { resetPassword, setauthenticating, authenticating } =
    useContext<any>(GlobalContext);

  const [newPassword, setnewPassword] = useState<string>("");
  const [confirmPassword, setconfirmPassword] = useState<string>("");

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (
      !passwordRegex.test(newPassword) ||
      !passwordRegex.test(confirmPassword)
    ) {
      toast.custom(
        <div
          className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-500"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Danger</span>
          <div>
            <span className="font-medium">
              Ensure that these requirements are met:
            </span>
            <ul className="mt-1.5 list-disc list-inside">
              <li>At least 8 characters (and up to 100 characters)</li>
              <li>At least one lowercase character</li>
              <li>At least one uppercase character</li>
              <li>
                Inclusion of at least one special character, e.g., ! @ # ?
              </li>
            </ul>
          </div>
        </div>,
        {
          duration: 10000,
        }
      );
      return;
    }
    setauthenticating(true);
    resetPassword(newPassword);
  };

  return (
    <div className="flex justify-around h-screen bg-gray-50">
      <Image
        src="https://cdn.dribbble.com/users/1525393/screenshots/15722735/media/fdb36d13151cbc4030699f668faa4226.gif"
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
        <div className="w-full md:min-w-[400px] p-6 bg-white rounded-lg shadow border md:mt-0 sm:max-w-md sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create new password
          </h2>
          <p className="font-light text-gray-500">
            Your new password must be different from previous used passwords.
          </p>
          <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                New Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleResetPassword}
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
}

export default ResetPassword