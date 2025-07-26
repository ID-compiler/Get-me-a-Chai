import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex justify-center flex-col gap-4 items-center text-white min-h-[44vh] px-5 md:px-0 text-xs md:text-base text-center md:text-left">
        <div className="font-bold flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-center text-3xl md:text-5xl">
          Get Me a Chai
          <span>
            <img className="invertImg" src="/tea.gif" width={88} alt="Tea Icon" />
          </span>
        </div>

        <p className="w-auto text-left md:text-left">
          A crowdfunding platform for creators to fund their projects.
        </p>
        <p className="w-auto text-left md:text-left">
          A place where your fans can buy you a chai. Unleash the power of your fans and get your projects funded.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/login">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-2.5 text-center"
            >
              Start Here
            </button>
          </Link>
          <Link href="/about">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-2.5 text-center"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="bg-white h-1 opacity-10 my-6 mx-auto w-full"></div>

      {/* Feature Section */}
      <div className="text-white container mx-auto pb-24 pt-8 px-6 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Your Fans can buy you a Chai
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {/* Card 1 */}
          <div className="space-y-3 flex flex-col items-center text-center">
            <img
              className="bg-slate-400 rounded-full p-2"
              width={88}
              src="/man.gif"
              alt="Fans want to help"
            />
            <p className="font-bold">Fans want to help</p>
            <p>Your fans are available to support you</p>
          </div>

          {/* Card 2 */}
          <div className="space-y-3 flex flex-col items-center text-center">
            <img
              className="bg-slate-400 rounded-full p-2"
              width={88}
              src="/coin.gif"
              alt="Fans want to contribute"
            />
            <p className="font-bold">Fans want to contribute</p>
            <p>Your fans are willing to contribute financially</p>
          </div>

          {/* Card 3 */}
          <div className="space-y-3 flex flex-col items-center text-center">
            <img
              className="bg-slate-400 rounded-full p-2"
              width={88}
              src="/group.gif"
              alt="Fans want to collaborate"
            />
            <p className="font-bold">Fans want to collaborate</p>
            <p>Your fans are ready to collaborate with you</p>
          </div>
        </div>
      </div>
    </>
  );
}
