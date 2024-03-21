import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Netflix</title>
  
        <link rel="icon" href="/favicon.ico"/>
      </Head>
  
      <h1>Netflix</h1>
    </div>
  );
}
