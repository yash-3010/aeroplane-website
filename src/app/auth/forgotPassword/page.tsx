import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ForgotPassword from "@/app/components/ForgotPassword";

export default async function getServerSideProps() {
  'use server'
  
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession();

  if(data?.session) {
      redirect("/");
  }

  return (
    <ForgotPassword/>
  );
}