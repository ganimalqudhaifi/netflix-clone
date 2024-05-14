import Link from "next/link";
import Card from "./Card";

interface SectionCardsProps {
  title: string,
  videos: any //TODO! change it later,
  size: "small" | "medium" | "large",
  shouldWrap?: boolean,
  shouldScale?: boolean,
}

export default function SectionCards({ title, videos, size, shouldWrap = false, shouldScale }: SectionCardsProps) {
  return (
    <section className="text-blue20 bg-black50 px-4 md:px-16">
      <h2 className="text-white10 font-bold text-[2rem]">{title}</h2>
      <div className={`flex overflow-x-scroll overflow-y-hidden mr-3 mt-6 pt-7 pb-6 ${shouldWrap && 'flex-wrap'}`}>
        {
          videos.map((video: any, idx: number) => ( //TODO! change it later
            <Link href={`/video/${video.id}`} key={idx}>
              <Card id={idx} imgUrl={video.imgUrl} size={size} shouldScale={shouldScale}/>
            </Link>
          ))
        }
      </div>
    </section>
  )
}