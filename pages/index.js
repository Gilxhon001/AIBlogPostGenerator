import Image from "next/image";
import HeroImage from "../public/hero.jpg";
import { Logo } from "../components/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative">
      <Image
        src={HeroImage}
        alt="Hero"
        fill
        className="absolute object-cover"
      />
      <div className="flex flex-col justify-center items-center relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-slate-900/80 rounded-md backdrop-blur-sm shadow-xl">
        <Logo />
        <p>
          The AI-Powered SAAS solution to generate SEO-optimized blog posts in
          minutes. Get high-quality content, without sacrificing your time.
        </p>
        <Link href="/post/new" className="btn my-4">
          Begin
        </Link>
      </div>
    </div>
  );
}
