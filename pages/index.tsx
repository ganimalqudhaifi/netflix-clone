import Banner from "@/components/Banner";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Netflix</title>
  
        <link rel="icon" href="/favicon.ico"/>
      </Head>
  
      <h1>Netflix</h1>

      <Banner 
        title="Clifford the red dog" 
        subTitle="a very cute dog" 
        imgUrl="/static/clifford.webp"
      />

      {/* <NavBar /> */}
      {/* <Card /> */}
    </div>
  );
}
