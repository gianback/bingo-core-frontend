"use client";
import { Header } from "@/components/Header";
import { useUserStore } from "@/store/userStore";
import { baseApi } from "@/utils/axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();
  const user = useUserStore((state) => state.user);
  const handleStartGame = async () => {
    const res = await baseApi.get("/games/join-game");
    push(`/play-game/${res.data.game.id}`);
  };
  return (
    <main className="h-screen flex-1 bg-gray-900">
      <div className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12">
          <h1 className="mb-4 text-3xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl dark:text-white">
            Virtual Bingo Hot {user.name}
          </h1>
          <p className="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900">
        <div className="grid justify-center max-w-screen-xl p-4 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h2 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Lorem ipsum dolor sit amet.
            </h2>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 text-md md:text-lg lg:text-xl dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
              nostrum itaque harum fuga soluta eius cupiditate doloremque quidem
              laborum fugiat.
            </p>

            {/* <!-- to="/play-game" --> */}
            <button
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              onClick={handleStartGame}
            >
              Join Game
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="-order-1 md:order-1 mb-4 lg:mt-0 lg:col-span-5 lg:flex">
            <picture>
              <img
                src="https://smartcasinoguide.com/app/uploads/2018/02/Bingo-game_cards-and-balls_600x424.png"
                alt="mockup"
              />
            </picture>
          </div>
        </div>
      </div>
    </main>
  );
}
