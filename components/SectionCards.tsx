import Card from "./Card";

interface SectionCardsProps {
  title: string,
  videos: any //TODO! change it later
}

export default function SectionCards({ title, videos }: SectionCardsProps) {
  return (
    <section className="text-blue20 bg-black50 px-4 md:px-16">
      <h2 className="text-white10 font-bold text-[2rem]">{title}</h2>
      <div className="flex overflow-x-scroll overflow-y-hidden mr-3 mt-6 pt-7 pb-6">
        {
          videos.map((video: any, idx: number) => ( //TODO! change it later
            <Card key={idx} id={idx} imgUrl={video.imgUrl} size="large" />
          ))
        }
      </div>
    </section>
  )
}