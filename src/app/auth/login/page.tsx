import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "@/app/components/Login";

export default async function getServerSideProps() {
  
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession();

  if(data?.session) {
      redirect("/");
  }

  return (
    <Login/>
  );
}