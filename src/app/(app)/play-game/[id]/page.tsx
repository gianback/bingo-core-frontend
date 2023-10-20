"use client";
import { Acordion } from "@/components/Acordion";
import { Canvas } from "@/components/Canvas";
import { useGameStore } from "@/store/gameStore";
import { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Toaster } from "sonner";
import { getCards } from "@/services/card.service";
import { useParams } from "next/navigation";
import { AxiosInterceptor } from "@/interceptors/axios.interceptor";
import { CardBingoList } from "@/components/CardBingoList";

export default function PlayGame() {
  const [startGame, setStartGame] = useState(false);
  const [currentBall, setCurrentBall] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { pastNumbers, setPastNumbers, addCardToList } = useGameStore();
  const params = useParams();
  AxiosInterceptor();
  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 720px)");
    window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
    desktopMediaQuery.addEventListener("change", (e) =>
      setIsMobile(!e.matches)
    );
    return () => {
      desktopMediaQuery.removeEventListener("change", (e) =>
        setIsMobile(!e.matches)
      );
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const cardNumbers = formData.get("card-number") as string;
    const cards = (await getCards(+cardNumbers, params.id as string)) as any;
    cards.forEach((card: any) => {
      addCardToList(card);
    });
  };
  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="flex-1 bg-[#313131] px-4 md:px-8">
        <h1 className="text-4xl text-white uppercase font-bold italic text-center py-8">
          Virtual bingo hot! {startGame}
        </h1>
        <div className={styles["home-ctn"]}>
          <div className="order-3 md:order-none">
            {isMobile ? (
              <Acordion title="Leadersboard">
                <div className="grid grid-cols-2">
                  <button className="inline-block p-3 rounded-t-lg bg-gray-800 text-gray-300 hover:text-white">
                    Juego Actual
                  </button>
                  <button className="inline-block p-3 rounded-t-lg bg-gray-800 text-gray-300 hover:text-white">
                    Puntuaciones
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-4">
                    <label
                      htmlFor="card-number"
                      className="text-white flex-shrink-0"
                    >
                      Numero de tarjetas
                    </label>
                    <input
                      type="number"
                      className="rounded-sm w-full p-1"
                      id="card-number"
                      min={1}
                      max={20}
                      name="card-number"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Agregar
                  </button>
                </form>
                <div>
                  <h2 className="text-white text-2xl">Historial:</h2>
                </div>
              </Acordion>
            ) : (
              <div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button className="inline-block p-3 rounded-t-lg bg-gray-800 text-gray-300 hover:text-white">
                    Juego Actual
                  </button>
                  <button className="inline-block p-3 rounded-t-lg bg-gray-800 text-gray-300 hover:text-white">
                    Puntuaciones
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-4">
                    <label
                      htmlFor="card-number"
                      className="text-white flex-shrink-0"
                    >
                      Numero de tarjetas
                    </label>
                    <input
                      type="number"
                      className="rounded-sm w-full p-1"
                      id="card-number"
                      min={1}
                      max={20}
                      name="card-number"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="mt-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Agregar Tarjetas
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className="canvas-grid">
            <Canvas startGame={startGame} />
            <div className="py-5 md:py-0 text-white">
              {!!currentBall && (
                <div
                  key={currentBall}
                  className="current-ball text-4xl font-medium"
                >
                  {currentBall}
                </div>
              )}
            </div>
          </div>
          {isMobile ? (
            <Acordion title="History Balls">
              <div className="p-5 border border-gray-200 dark:border-gray-700">
                <p>lista de bolitas</p>
              </div>
            </Acordion>
          ) : (
            <div className="p-5 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-5 gap-3">
                {/* <div
      v-for="(number, index) in pastNumbers"
      :key="index"
      className="rounded-full bg-red-300 text-black flex items-center justify-center w-10 h-10 text-lg"
    >
      {{ number }}
    </div> */}
              </div>
            </div>
          )}
        </div>
        <CardBingoList />
      </div>
    </>
  );
}
