import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Roboto_Slab } from "next/font/google";

import "@/styles/globals.css";
import Loading from "@/components/Loading";
import { magic } from "@/lib/magic-client";

const RobotoSlab = Roboto_Slab({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false); //default true

  const router = useRouter();

  useEffect(() => {
    async function isLoggedIn() {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        router.push("/");
      } else {
        router.push("/login")
      }
    }
    isLoggedIn();
  }, [])

  useEffect(() => {
    const handleRouteChange = () => {
      setIsLoading(false);
    }
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeError", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeError", handleRouteChange);
    }
  }, [router]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <main className={RobotoSlab.className}>
      <Component {...pageProps} />
    </main>
  );
}
