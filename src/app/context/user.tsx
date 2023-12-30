"use client";

import { useRouter } from "next/navigation";
import { createContext, use, useContext, useEffect, useState } from "react";
import { Database } from "../../../types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { to } from "@react-spring/web";

export const GlobalContext = createContext({});

interface UserProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: UserProviderProps) => {
  const router = useRouter();

  const [user, setuser] = useState<any>(null);
  const [authenticating, setauthenticating] = useState<boolean>(false);

  const supabaseClient = createClientComponentClient<Database>();

  const getCurrentSession = async () => {
    'use server'
    const res = await supabaseClient.auth.getSession();

    if (res.data.session) {
      return res.data.session;
    }

    setuser(null);
    return null;
  };

  const getCurrentUser = async () => {
    const res = await supabaseClient.auth.getUser();

    if (res.data) {
      setuser(res.data);
    }

    return null;
  };

  const getUser = async () => {
    const currSession = await getCurrentSession();
    if (currSession) {
      await getCurrentUser();
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
        throw error;
      }
      await getUser();
      router.push("/");
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.error_description);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      await getUser();
      router.push("/");
      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setauthenticating(false);
    }
  };

  const googleLogin = async () => {
    try {
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) {
        throw error;
      }
      await getUser();
      setauthenticating(false);
      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.error_description);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) {
        throw error;
      }
      await getUser();
      router.push("/auth/login");
      setauthenticating(false);
      toast.custom(
        <div
          id="alert-additional-content-4"
          className="p-4 mb-4 text-orange-800 border border-orange-800 rounded-lg bg-orange-50"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              className="flex-shrink-0 w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-semibold">
              Please confirm your email address{" "}
            </h3>
          </div>
          <div className="mt-2 mb-4 text-sm">
            <p className="font-medium">
              Thanks for signing to Vemaneuver. We are happy to have you
            </p>
            <p>Please take a second to make sure we have your correct email.</p>
          </div>
          <div className="flex">
            <a
              href="https://mail.google.com/mail/u/0/#inbox"
              target="_blank"
              className="text-white bg-orange-800 hover:bg-orange-900 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center"
            >
              <svg
                className="me-2 h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
              >
                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              Check email
            </a>
            <button
              type="button"
              onClick={() => toast.dismiss()}
              className="text-orange-800 bg-transparent border border-orange-800 hover:bg-orange-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
            >
              Dismiss
            </button>
          </div>
        </div>,
        { duration: 30000 }
      );
    } catch (error: any) {
      toast.error(error.error_description);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const exposed = {
    user,
    authenticating,
    setauthenticating,
    logout,
    signup,
    login,
    googleLogin,
  };

  return (
    <GlobalContext.Provider value={exposed}>{children}</GlobalContext.Provider>
  );
};

export default Provider;
