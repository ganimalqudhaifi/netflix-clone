import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import SectionCards from "@/components/SectionCards";
import Head from "next/head";

export default function Home() {
  const disneyVideos = [
    {
      imgUrl: '/static/clifford.webp'
    },
    {
      imgUrl: '/static/clifford.webp'
    },
    {
      imgUrl: '/static/clifford.webp'
    },
  ]
  
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

      <div className="mt-6">
        <SectionCards title="Disney" videos={disneyVideos}/>
      </div>
    </div>
  );
}
