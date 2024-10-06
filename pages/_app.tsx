import type { AppProps } from "next/app";
import { Roboto_Slab } from "next/font/google";
import "@/styles/globals.css";

const RobotoSlab = Roboto_Slab({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={RobotoSlab.className}>
      <Component {...pageProps} />
    </main>
  );
}
