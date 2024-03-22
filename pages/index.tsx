import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Netflix</title>
  
        <link rel="icon" href="/favicon.ico"/>
      </Head>
  
      <Navbar username="ganimalqudhaifi@gan.com"/>
      <Banner 
        title="Clifford the red dog" 
        subTitle="a very cute dog" 
        imgUrl="/static/clifford.webp"
      />

      {/* <Card /> */}
    </div>
  );
}
