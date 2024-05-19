import Modal from "react-modal";
import { useRouter } from "next/router";

import Navbar from "@/components/Navbar";
import LikeIcon from "@/components/icons/LikeIcon";
import DislikeIcon from "@/components/icons/DislikeIcon";
import { getYoutubeVideoById } from "@/lib/videos";
import { useEffect, useState } from "react";
import type { GetStaticProps } from "next";

Modal.setAppElement("#__next");

interface VideoProps {
  video: Video;
}

export const getStaticProps = (async (context) => {
  const videoId = context.params?.videoId;

  if (!videoId) {
    return {
      props: {
        video: {},
      },
    };
  }

  const videoArray = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: videoArray[0],
    },
    revalidate: 10, // In seconds
  };
}) satisfies GetStaticProps;

export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideos?.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}

export default function Video({ video }: VideoProps) {
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDisLike] = useState(false);

  const router = useRouter();
  const videoId = router.query.videoId;

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  useEffect(() => {
    const handleLikeDislikeService = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET",
      });
      const { data } = await response.json();

      if (data.length > 0) {
        const favourited = data[0].favourited;
        if (favourited === 1) {
          setToggleLike(true);
        } else if (favourited === 0) {
          setToggleDisLike(true);
        }
      }
    };
    handleLikeDislikeService();
  }, [videoId]);

  const runRatingService = async (favourited: number) => {
    return await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({
        videoId,
        favourited,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleToggleLike = async () => {
    const val = !toggleLike;
    setToggleLike(!toggleLike);
    setToggleDisLike(toggleLike);

    const favourited = val ? 1 : 0;
    await runRatingService(favourited);
  };

  const handleToggleDislike = async () => {
    const val = !toggleDislike;
    setToggleDisLike(!toggleDislike);
    setToggleLike(toggleDislike);

    const favourited = val ? 0 : 1;
    await runRatingService(favourited);
  };

  return (
    <div>
      <Navbar />
      <Modal
        isOpen={true}
        contentLabel="Watch this video"
        onRequestClose={() => router.back()}
        className="absolute w-full md:w-[800px] lg:w-1/2 lg:top-[10%] lg:bottom-10 bg-black40 border border-shadow10 mx-auto my-0 rounded-[10px] border-solid top-[10%] bottom-10 inset-x-0"
        overlayClassName="w-full h-screen inset-0"
      >
        <div>
          <iframe
            id="ytplayer"
            width="100%"
            height="360"
            className="shadow-[0_3px_7px] shadow-shadow20 bg-clip-padding opacity-100 bg-gradient-to-t from-black10 to-transparent rounded"
            src={`https://www.youtube.com/embed/${videoId}?controls=0&rel=1&autoplay=1&origin=http://example.com`}
          ></iframe>
        </div>

        <div className="flex absolute mb-3 pl-4 top-[35%]">
          <button onClick={handleToggleLike}>
            <div className="mr-2">
              <div className="border-white10 bg-gray40 flex justify-center p-2 rounded-full border-solid border-2">
                <LikeIcon selected={toggleLike} />
              </div>
            </div>
          </button>
          <button onClick={handleToggleDislike}>
            <div className="border-white10 bg-gray40 flex justify-center p-2 rounded-full border-solid border-2">
              <DislikeIcon selected={toggleDislike} />
            </div>
          </button>
        </div>

        <div className="px-12 py-0">
          <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-x-[2em]">
            <div className="max-h-[50vh] overflow-y-scroll">
              <p className="text-lg leading-7 text-green10 mt-6 mb-2">
                {publishTime}
              </p>
              <p className="text-lg leading-7 text-white10">{title}</p>
              <p className="mt-3 mb-2">{description}</p>
            </div>
            <div className="text-white10 leading-7 flex flex-col mt-6">
              <p className="text-sm leading-5 break-words ml-0">
                <span className="text-gray10">Cast: </span>
                <span className="text-white30 m-0">{channelTitle}</span>
              </p>
              <p className="text-sm leading-5 break-words ml-0 mt-6">
                <span className="text-gray10">View Count: </span>
                <span className="text-white30 m-0">{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
