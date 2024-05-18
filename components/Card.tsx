import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

interface CardProps {
  imgUrl?: string;
  size: "small" | "medium" | "large";
  id: number;
  shouldScale?: boolean;
}

export default function Card({
  imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80",
  size = "medium",
  id,
  shouldScale = true,
}: CardProps) {
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const classMap = {
    small: "w-[300px] min-w-[300px] h-[170px] min-h-[170px]",
    medium: "w-[158px] min-w-[158px] h-[280px] min-h-[280px]",
    large: "w-[218px] min-w-[218px] h-[434px] min-h-[434px]",
  };

  const handleOnError = () => {
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"
    );
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  const shouldHover = shouldScale && {
    whileHover: { ...scale },
  };

  return (
    <div className="cursor-pointer mr-1">
      <motion.div
        className={`${classMap[size]} relative inline-block hover:z-50`}
        {...shouldHover}
      >
        <Image
          src={imgSrc}
          alt="image"
          fill
          onError={handleOnError}
          className="object-cover object-center block max-w-full rounded-md inset-0"
        />
      </motion.div>
    </div>
  );
}
