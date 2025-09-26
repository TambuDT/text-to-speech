"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { account } from "./appwrite/appwrite";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await account.get(); 
        router.push("/dashboard"); // utente loggato → redirect
      } catch (error) {
        router.push("/login"); // utente non loggato → redirect
      }
    };

    checkUser();
  }, [router]);

  return (
    <div>
      
    </div>
  );
}
