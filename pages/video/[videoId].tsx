import Navbar from "@/components/Navbar";
import { getYoutubeVideoById } from "@/lib/videos";
import { useRouter } from "next/router"
import Modal from 'react-modal';

Modal.setAppElement('#__next');

interface VideoProps {
  video: any //TODO!: change it later
}

export async function getStaticProps(context) {
  const videoId = context.params.videoId;
  const videoArray = await getYoutubeVideoById(videoId)

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10, // In seconds
  }
}

export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideos.map((videoId) => ({
    params: {videoId},
  }))

  return { paths, fallback: "blocking" };
}

export default function Video({ video }: VideoProps) {
  const router = useRouter();

  const { title, publishTime, description, channelTitle, statistics: { viewCount } = { viewCount: 0 } } = video;
  return (
    <div>
      <Navbar/>
      <Modal
        isOpen={true}
        contentLabel="Watch this video"
        onRequestClose={() => router.back()}
        className="absolute w-full md:w-[800px] lg:w-1/2 lg:top-[10%] lg:bottom-10 bg-black40 border border-shadow10 mx-auto my-0 rounded-[10px] border-solid top-[10%] bottom-10 inset-x-0"
        overlayClassName="w-full h-screen inset-0"
      >
        <div><iframe id="ytplayer" type="text/html" width="100%" height="360" className="shadow-[0_3px_7px] shadow-shadow20 bg-clip-padding opacity-100 bg-gradient-to-t from-black10 to-transparent rounded"
  src={`https://www.youtube.com/embed/${router.query.videoId}?controls=0&rel=1&autoplay=1&origin=http://example.com`}
  frameborder="0"></iframe></div>
        <div className="px-12 py-0">
          <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-x-[2em]">
            <div className="max-h-[50vh] overflow-y-scroll">
              <p className="text-lg leading-7 text-green10 mt-6 mb-2">{publishTime}</p>
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
  )
}