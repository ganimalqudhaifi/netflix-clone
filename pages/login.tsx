import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { magic } from '@/lib/magic-client';

export default function Login() {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsLoading(false);
    }
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeError", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeError", handleRouteChange);
    }
  }, [router]);

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMsg("");
    const email = e.target.value;
    setEmail(email);
  }

  const handleLoginWithEmail = async () => {
    if (email) {
      // route to dashboard
      try {
        setIsLoading(true);
        if (magic !== undefined) {
          const didToken = await magic.auth.loginWithMagicLink({ email });
          if (didToken) {          
            const response = await  fetch("/api/login", {
              method: "POST",
              headers: {
                'Authorization': `Bearer ${didToken}`,
                "Content-Type": "application/json"
              }
            })

            const loggedInResponse = await response.json();
            if (loggedInResponse.done) {
              router.push("/"); // if the did token was created route to homepage
            } else {
              setIsLoading(false);
              setUserMsg("Something went wrong logging in")
            }
          }
        }
      } catch (error) {
        // Handle errors if required!
        console.error("Something went wrong logging in", error)
        setIsLoading(false);              
      }        
    } else {
      // show user message 
      setIsLoading(false); 
      setUserMsg("Enter a valid email address")
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-black bg-[linear-gradient(rgb(0_0_0_/_60%),rgb(0_0_0_/_60%)),url(/static/signin-bg.jpg)]">
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className="flex justify-between w-full py-8">
        <div className="flex-row flex px-4 md:flex-row md:items-center md:px-16">
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
        </div>
      </header>

      <main className="w-full h-full relative flex z-10 justify-center">
        <div className="flex flex-col bg-black20 h-2/6 min-w-[240px] pt-8 pb-24 px-12 rounded-md md:mt-8">
          <h1 className="text-white10 font-bold text-[2rem] mb-8">Sign In</h1>

          <input className="text-black30 w-full h-12 min-w-[240px] text-[1.2rem] pb-4 p-2" onChange={handleOnChangeEmail} type="text" placeholder="Email address"/>

          <p className="text-white20 my-1">{userMsg}</p>
          <button className="bg-red10 text-xl leading-7 text-white10 w-full mt-6 px-12 py-2 rounded-md" onClick={handleLoginWithEmail}>{isLoading ? "Loading..." :"Sign In"}</button>
        </div>
      </main>
    </div>
  )
}