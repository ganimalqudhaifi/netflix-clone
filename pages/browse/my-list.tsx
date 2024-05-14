import Head from "next/head";
import type { GetServerSideProps } from "next";

import Navbar from "@/components/Navbar";
import SectionCards from "@/components/SectionCards";
import { redirectUser } from "@/utils/redirectUser";
import { getMyList } from "@/lib/videos";

export const getServerSideProps = (async (context) => {
  const { userId, token } = await redirectUser(context);
  
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      }
    }
  }

  const videos = await getMyList(userId, token);
  
  return {
    props: {
      myListVideos: videos,
    }
  }
}) satisfies GetServerSideProps



interface MyListProps {
  myListVideos: any //TODO!: change it later
}

export default function MyList({ myListVideos }: MyListProps) {
  return (
    <>
      <Head>
        <title>My list</title>
      </Head>

      <main className="pb-16 mt-24">
        <Navbar/>
        <div className="my-6">
          <SectionCards title="My List" videos={myListVideos} size="small" shouldWrap shouldScale={false}/>
        </div>
      </main>
    </>
  )
}