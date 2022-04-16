import Link from "next/link";
import PrimaryLayout from "../components/Layout/Primary";

export default function Home() {
  return (
    <PrimaryLayout>
      <main className="flex-1 p-6 w-full max-w-7xl mx-auto text-gray-900">
        <section className="mt-12 py-8 md:py-24 rounded-md">
          <div className="flex flex-col items-center justify-center pb-12 md:pb-24">
            <h1 className="magic pb-12 text-6xl md:text-8xl lg:text-9xl font-bold">Feasting<br />Together</h1>
            <p className="text-lg md:text-2xl">Helping you find the restaurant everyone will enjoy.</p>
          </div>
          <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-1">
              <Link href={'/Feasting/Join'}>
                <a className="button ghost lg">Join Your Friends</a>
              </Link>
              <Link href={'/Feasting/Create'}>
                <a className="button lg">Create Your Own Feast</a>
              </Link>
          </div>
        </section>
        <section id="HowItWorks" className="flex items-center justify-center flex-col pt-10 pb-20 gap-8">
          <h2 className="text-2xl font-bold">How It Works.</h2>
          <ul className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 z-10">
            <li>
              <div className="card h-80 w-72">
                <div className="h-full"></div>
                <div className="h-24 flex items-center justify-center p-4 font-bold">
                  <h4 className="text-xl w-full text-center">Create Or Join A Session</h4>
                </div>
              </div>
            </li>
            <li className="flex flex-row flex-nowrap gap-2 px-2 py-1 rounded-full bg-slate-100 border border-slate-300 font-bold rotate-90 md:rotate-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </li>
            <li>
              <div className="card h-80 w-72">
                <div className="h-full"></div>
                <div className="h-24 flex items-center justify-center p-4 font-bold">
                  <h4 className="text-xl w-full text-center">Invite Friends</h4>
                </div>
              </div>
            </li>
            <li className="flex flex-row flex-nowrap gap-2 px-2 py-1 rounded-full bg-slate-100 border border-slate-300 font-bold rotate-90 md:rotate-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </li>
            <li>
              <div className="card h-80 w-72">
                <div className="h-full"></div>
                <div className="h-24 flex items-center justify-center p-4 font-bold">
                  <h4 className="text-xl w-full text-center">Feast Together!</h4>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </PrimaryLayout>
  )
}
