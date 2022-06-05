import Link from "next/link";
import PrimaryLayout from "../components/Layout/Primary";
import Example from "../components/Layout/Example";
import { gsap } from "gsap";
import { useState } from "react";
import CreateHome from "../components/Feasting/Create/home";
import JoinHome from "../components/Feasting/Join/home";

export default function Home() {
  const [check, setCheck] = useState(true)

  return (
    <PrimaryLayout>
      <main className="relative p-6 h-full w-full max-w-7xl mx-auto text-slate-900 dark:text-slate-50 ">
        <section className="z-20 relative flex flex-col lg:flex-row items-center justify-center">
          <div className="w-full my-16">
            <div className="flex flex-col items-center justify-center pb-12 md:pb-24">
              <h1 className="magic pb-12 text-6xl md:text-7xl lg:text-8xl font-bold">Feasting<br />Together</h1>
              <p className="text-lg md:text-xl">Helping you and your buddies find the perfect place to eat!</p>
            </div>
            {/* <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-1">
                <Link href={'/Feasting/Join'}>
                  <a className="button ghost lg">Join Your Friends</a>
                </Link>
                <Link href={'/Feasting/'}>
                  <a className="button lg">Create Your Own Feast</a>
                </Link>
            </div> */}
            <div>
              <div className="flex flex-row gap-2 w-full items-center justify-center p-4">
                <p className="font-bold">Create</p>
                <input onChange={() => setCheck(!check)} type='checkbox' className="toggle xl" />
                <p className="font-bold">Join</p>
              </div>
              <div>
              {check ? <CreateHome /> : <JoinHome />}
              </div>
            </div>
          </div>
          {/* <Example /> */}
        </section>
        <div className="z-10 inset-0 absolute background_gradient"></div>
      </main>
    </PrimaryLayout>
  )
}
