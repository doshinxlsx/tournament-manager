'use client'
import { useEffect } from "react";
import LoginButton from "./components/LoginButton";
import MatchCard from "./components/MatchCard";
import { useStore } from "@/store";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  const { getMatches } = useStore((state) => ({
    getMatches: state.getMatches,
  }));

  useEffect(() => {
    getMatches();
  }, [getMatches])

  return (
    <>
      <LoginButton />
      <main className="flex min-h-screen items-center justify-center md:p-24">
        <SessionProvider>
          <MatchCard />
        </SessionProvider>
      </main>
    </>
  );
}
