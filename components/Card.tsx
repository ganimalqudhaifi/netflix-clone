import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"

interface CardProps {
  imgUrl?: string,
  size: "small" | "medium" | "large"
}

export default function Card({ 
  imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80",
  size = "medium",
}: CardProps) {

  const [imgSrc, setImgSrc] = useState(imgUrl);
  const classMap = {
    large: "w-[300px] min-w-[300px] h-[170px] min-h-[170px]",
    medium: "w-[158px] min-w-[158px] h-[280px] min-h-[280px]",
    small: "w-[218px] min-w-[218px] h-[434px] min-h-[434px]",
  };

  const handleOnError = () => {
    console.log("hii error");
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"
    );
  };

  return (
    <div className="cursor-pointer mr-1">
      Card
      <motion.div
        className={`${classMap[size]} relative inline-block hover:z-50`}
        whileHover={{ scale: 1.2 }}
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
};