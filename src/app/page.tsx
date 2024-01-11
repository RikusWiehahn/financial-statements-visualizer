import { H1 } from "@/components/Typography";
import { routes } from "@/config/_routes";
import Link from "next/link";

export default function Home() {
  const renderHero = () => {
    return (
      <div
        className="min-h-screen bg-gray-900 flex justify-center items-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/cover.avif')" }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black opacity-90"></div>
        <div className="max-w-xl z-10">
          <H1 className="text-center font-bold text-white md:text-6xl text-5xl">
            Stonk Visualizer
          </H1>
          <div className="mt-8 flex justify-center">
            <Link
              className="bg-gradient-to-r border border-black bg-white text-black font-bold text-lg py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
              href={routes.HOME}
            >
              Visualize Now!
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return <div className="bg-gray-100 min-h-screen">{renderHero()}</div>;
}
