import Head from "next/head";

import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import SectionCards from "@/components/SectionCards";
import { getPopularVideos, getVideos } from '@/lib/videos';

interface HomeProps { 
  disneyVideos: any, //TODO!: change it later
  productivityVideos: any, //TODO!: change it later
  travelVideos: any, //TODO!: change it later
  popularVideos: any, //TODO!: change it later
} 

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disney videos");
  const productivityVideos = await getVideos("Productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      productivityVideos,
      travelVideos,
      popularVideos,
    },
  };
}

export default function Home({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
}: HomeProps) {
  return (
    <div>
      <Head>
        <title>Netflix</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-16">
        <Navbar />
        <Banner
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
          videoId="4zH5iYM4wJo"
        />

        <div className="mt-6">
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
