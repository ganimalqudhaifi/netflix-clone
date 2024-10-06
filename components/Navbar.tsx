import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import HamburgerMenuIcon from "./icons/HamburgerMenuIcon";
import { Button } from "./ui/button";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function getMetadata() {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        const email = data?.metadata?.email;

        setUsername(email);
      } catch (error) {
        console.error("Error retrieving email", error);
      }
    }
    getMetadata();
  }, []);

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

  const handleSignOut = async () => {
    try {
      await fetch("/api/logout");
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };

  return (
    <div className="text-white10 fixed bg-gradient-to-b from-black to-transparent w-full z-50 top-0">
      <div className="flex justify-between items-center md:justify-normal px-4 p-5 md:flex-row md:items-center md:px-16">
        <div className="flex shrink-0 font-medium text-base items-center text-white10 text-red w-32">
          <Image
            src="/static/netflix.svg"
            alt="Netflix logo"
            width={128}
            height={34}
          />
        </div>

        <div className="relative md:w-full h-full md:border-0 border-2 border-white rounded">
          <button
            className="md:hidden relative border-2 p-1 "
            onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
          >
            <HamburgerMenuIcon className="w-6 h-6" />
          </button>

          <div
            className={`${
              isHamburgerOpen
                ? "opacity-0 invisible -translate-y-1.5 md:opacity-100 md:visible"
                : "opacity-100 visible translate-y-0"
            } absolute md:relative top-full mt-2 md:mt-0 right-0 flex flex-col md:flex-row w-fit md:w-full items-center duration-100 bg-black10 md:bg-transparent rounded py-2 `}
          >
            <ul className="flex flex-col md:flex-row items-center text-base leading-5 md:ml-12 w-full">
              <li
                className="text-center w-full md:w-fit font-semibold text-base cursor-pointer md:mr-5 px-4 py-2 md:px-0 hover:bg-zinc-800 border-b-2 border-zinc-800 md:border-b-0 md:hover:bg-transparent"
                onClick={handleOnClickHome}
              >
                Home
              </li>
              <li
                className="text-center w-full md:w-fit font-semibold text-base cursor-pointer px-4 py-2   md:px-0 hover:bg-zinc-800 border-b-2 border-zinc-800 md:border-b-0 md:hover:bg-transparent"
                onClick={handleOnClickMyList}
              >
                My List
              </li>
            </ul>

            <nav className="flex items-start ml-auto px-4 py-3 md:px-0 md:py-0">
              <div>
                <button
                  className="flex items-center text-white space-y-2"
                  onClick={handleShowDropdown}
                >
                  <p className="text-base">{username}</p>
                  <Image
                    src="/static/expand_more.svg"
                    alt="Expand dropdown"
                    width={24}
                    height={24}
                    className={`${
                      !showDropdown
                        ? "opacity-100 rotate-90"
                        : "rotate-0 opacity-100"
                    } transition invisible md:visible`}
                  />
                </button>
                {showDropdown ? (
                  <div className="relative md:absolute shadow-shadow30 mt-2.5">
                    <Button className="border-blue w-full" variant="secondary">
                      <Link
                        href="/login"
                        className="hover:underline"
                        onClick={handleSignOut}
                      >
                        Sign out
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="md:invisible relative md:absolute shadow-shadow30 mt-2.5">
                    <Button className="border-blue w-full" variant="secondary">
                      <Link
                        href="/login"
                        className="hover:underline"
                        onClick={handleSignOut}
                      >
                        Sign out
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
