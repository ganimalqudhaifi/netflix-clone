import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";

interface NavbarProps {
  username: string,
}

export default function Navbar({ username }: NavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  const handleOnClickHome = (e: SyntheticEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e: SyntheticEvent) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  return (
    <div className="text-white10 fixed bg-gradient-to-b from-black to-transparent w-full z-50 top-0">
      <div className="flex px-4 p-5 md:flex-row md:items-center md:px-16">
        <a className="flex font-medium text-base items-center text-white10 mb-4 md:mb-0">
          <div className="text-red w-32">
            <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width={128}
              height={34}
            />
          </div>
        </a>

        <ul className="flex flex-row w-6/12 text-base leading-5 ml-6 md:ml-12">
          <li className="font-semibold text-base cursor-pointer mr-3 md:mr-5" onClick={handleOnClickHome}>
            Home
          </li>
          <li className="font-semibold text-base cursor-pointer" onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className="flex items-start ml-auto">
          <div>
            <button className="flex items-center overflow-hidden text-white" onClick={handleShowDropdown}>
              <p className="text-base">{username}</p>
              <Image
                src="/static/expand_more.svg"
                alt="Expand more"
                width={24}
                height={24}
              />
            </button>
            {showDropdown && (
              <div className="absolute bg-black50 border text-white rounded border-blue shadow-shadow30 ml-auto mt-2 pr-2 py-2">
                <div>
                  <Link href="/login" className="transition ease-in-out duration-200 block text-base leading-5 rounded cursor-pointer px-2 hover:underline">Sign out</Link>
                  <div className="py-2"></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}