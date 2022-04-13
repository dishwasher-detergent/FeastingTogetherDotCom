import Link from "next/link";
import PrimaryLayout from "../components/Layout/primary";

export default function Home() {
  return (
    <PrimaryLayout>
      <main className="flex-1 p-2 w-full max-w-7xl mx-auto">
        <section className="py-24">
          <div className="pb-4">
            <h1 className="pb-4 text-9xl font-bold">Testing<br />test</h1>
            <p className="text-xl">Testing Testing Testing test</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-1">
              <Link href={'/Feasting/Joining'}>
                <a className="button ghost lg">Jain A Session</a>
              </Link>
              <Link href={'/Feasting/Create'}>
                <a className="button lg">Get Started</a>
              </Link>
          </div>
        </section>
        <section>
          <ul className="w-full flex flex-row items-center justify-center gap-6">
            <li>
              <div className="card h-96 w-72">
                <div className="h-full"></div>
                <div className="h-24 p-4 font-bold">
                  <h4 className="text-xl">Testing test</h4>
                </div>
              </div>
            </li>
            <li className="flex flex-row flex-nowrap gap-2 px-2 py-1 rounded-full bg-slate-100 border border-slate-300 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </li>
            <li>
              <div className="card h-96 w-72">
                <div className="h-full"></div>
                <div className="h-24 p-4 font-bold">
                  <h4 className="text-xl">Testing test</h4>
                </div>
              </div>
            </li>
            <li className="flex flex-row flex-nowrap gap-2 px-2 py-1 rounded-full bg-slate-100 border border-slate-300 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </li>
            <li>
              <div className="card h-96 w-72">
                <div className="h-full"></div>
                <div className="h-24 p-4 font-bold">
                  <h4 className="text-xl">Testing test</h4>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </PrimaryLayout>
  )
}
