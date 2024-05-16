import Head from "next/head";
import type { GetServerSideProps } from "next";

import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import SectionCards from "@/components/SectionCards";
import { getPopularVideos, getVideos, getWatchItAgainVideos } from '@/lib/videos';
import { redirectUser } from "@/utils/redirectUser";

interface HomeProps { 
  disneyVideos: [Video],
  productivityVideos: [Video],
  travelVideos: [Video],
  popularVideos: [Video],
  watchItAgainVideos: [Video],
} 

export const getServerSideProps = (async (context) => {
  const { userId, token } = await redirectUser(context);
  


  const watchItAgainVideos = await getWatchItAgainVideos(userId!, token!);
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
      watchItAgainVideos,
    },
  };
}) satisfies GetServerSideProps

export default function Home({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
  watchItAgainVideos,
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
          <SectionCards title="Watch it again" videos={watchItAgainVideos} size="small" />
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
