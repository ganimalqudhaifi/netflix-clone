import Image from "next/image";
import { useRouter } from "next/router";

interface BannerProps {
  title: string;
  subTitle: string;
  imgUrl: string;
  videoId: string;
}

export default function Banner({
  title,
  subTitle,
  imgUrl,
  videoId,
}: BannerProps) {
  const router = useRouter();

  const handleOnPlay = () => {
    router.push(`video/${videoId}`);
  };

  return (
    <div className="w-full h-[80vh] relative">
      <div className="absolute w-full h-full z-10">
        <div className="flex justify-start pl-16 pr-16 h-full flex-col mt-24 md:w-2/5">
          <div className="flex">
            <p className="text-6xl font-extrabold text-red">N</p>
            <p className="text-sm text-white30 self-center">S E R I E S</p>
          </div>
          <h3
            className="text-2xl font-extrabold text-white10 lg:text-6xl"
            style={{ WebkitTextStroke: "2px black" }}
          >
            {title}
          </h3>
          <h3
            className="text-lg text-white10 lg:text-2xl"
            style={{ WebkitTextStroke: "1px gray" }}
          >
            {subTitle}
          </h3>
          <div className="flex flex-row w-full">
            <button
              className="flex items-center justify-center px-5 py-2 mt-5 rounded-lg bg-white10 w-32"
              onClick={handleOnPlay}
            >
              <Image
                src="/static/play_arrow.svg"
                alt="Play icon"
                width={32}
                height={32}
              />
              <span className="text-[rgb(31, 41, 55)] font-semibold text-lg pl-1 text-center text-black lg:text-xl">
                Play
              </span>
            </button>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(${imgUrl})` }}
        className="w-full h-full absolute bg-cover bg-[50% 50%]"
      ></div>
    </div>
  );
}
