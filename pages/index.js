import Link from "next/link";
import PrimaryLayout from "../components/Layout/Primary";
import Example from "../components/Layout/Example";

export default function Home() {
  return (
    <PrimaryLayout>
      <main className="p-6 w-full max-w-7xl mx-auto text-gray-900 dark:text-slate-50">
        <section className="flex flex-col lg:flex-row items-center justify-center">
          <div className="w-full my-16">
            <div className="flex flex-col items-center justify-center pb-12 md:pb-24">
              <h1 className="magic pb-12 text-6xl md:text-7xl lg:text-8xl font-bold">Feasting<br />Together</h1>
              <p className="text-lg md:text-xl">Helping you and your buddies find the perfect place to eat!</p>
            </div>
            <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-1">
                <Link href={'/Feasting/Join'}>
                  <a className="button ghost lg">Join Your Friends</a>
                </Link>
                <Link href={'/Feasting/'}>
                  <a className="button lg">Create Your Own Feast</a>
                </Link>
            </div>
          </div>
          <Example />
        </section>
      </main>
    </PrimaryLayout>
  )
}
