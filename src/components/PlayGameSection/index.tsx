"use client";
import { Canvas } from "@/components/Canvas";
import JSConfetti from "js-confetti";
import { useGameStore } from "@/store/gameStore";
import { FormEvent, useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Toaster } from "sonner";
import { getCards } from "@/services/card.service";
import { useParams, useRouter } from "next/navigation";
import { AxiosInterceptor } from "@/interceptors/axios.interceptor";
import { CardBingoList } from "@/components/CardBingoList";
import { useSocket } from "@/hooks/useSocket";
import { getBinaryMatriz } from "@/utils/game";
import { finishGame } from "@/services/finish-game";
import { Dialog } from "@/components/Dialog";
import { Loader } from "../Loader";

type SocketDataListener = {
  event: string;
  data?: {
    createdAt: string;
    deletedAt: null;
    gameRoomId: string;
    id: string;
    label: string;
    letter: string;
    number: number;
    updatedAt: string;
  };
};
export function PlayGameSection() {
  const [startGame, setStartGame] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBall, setCurrentBall] = useState(0);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [points, setPoints] = useState<number>();
  const { push } = useRouter();
  const socket = useSocket(process.env.NEXT_PUBLIC_URL_BACKEND as string);
  const { setPastNumbers, addCardToList, resetPastNumbers, resetCardList } =
    useGameStore();

  const pastNumbers = useGameStore((state) => state.pastNumbers);
  const params = useParams();
  AxiosInterceptor();

  const showResult = useCallback((resultNumber: number) => {
    setIsOpenDialog(true);
    setPoints(resultNumber);

    if (resultNumber > 0) {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);

      const cardNumbers = formData.get("card-number") as string;

      const cards = (await getCards(+cardNumbers, params.id as string)) as any;
      const bingoCardList = cards.data.data;
      bingoCardList.forEach((card: any) => {
        addCardToList(card);
      });
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndGame = async () => {
    setIsOpenDialog(false);
    push(`/`);
  };

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("conect");
      });

      socket.on(
        `GameRoomEventStatusUpdate:${params.id}`,
        async (data: SocketDataListener) => {
          if (data.event === "GETTING_NEXT_BALL_EVENT") {
            setStartGame(true);
          } else if (data.event === "PICKED_BALL_EVENT") {
            setCurrentBall(data.data?.number as number);
            setPastNumbers(data.data?.number as number);
          } else if (data.event === "FINISHED_GAME_EVENT") {
            const result = useGameStore.getState().cardList.map((card) => {
              const binaryMatriz = getBinaryMatriz({
                bingoCard: card.bingoCard,
                winNumbers: useGameStore.getState().pastNumbers,
              });
              return {
                id: card.id,
                template: binaryMatriz,
              };
            });
            const winner = await finishGame({
              bingoCards: result,
              roomId: params.id as string,
            });
            console.log({ winner });
            showResult(winner.score);
            setStartGame(false);
            setCurrentBall(0);
            resetPastNumbers();
            resetCardList();
          }
        }
      );
    }
    return () => {
      if (socket) {
        socket.close();
        socket.disconnect();
        console.log("desconectado");
      }
    };
  }, [
    params.id,
    socket,
    resetPastNumbers,
    setPastNumbers,
    resetCardList,
    showResult,
  ]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      console.log({ e });
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload, {
      capture: true,
    });
    return () => {
      window.removeEventListener("beforeunload", () => {
        console.log("beforeunload");
      });
    };
  }, []);

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="flex-1 bg-[#313131] px-4 md:px-8">
        <h1 className="text-4xl text-white uppercase font-bold italic text-center py-8">
          Virtual bingo hot! {startGame}
        </h1>
        <div className={styles["home-ctn"]}>
          <div className="order-3 md:order-none">
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
              <div className="flex relative pt-4">
                {isLoading && (
                  <div className="absolute right-0 top-1/2 translate-y-[-50%]">
                    <Loader />
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`${
                    startGame && "pointer-events-none"
                  } mt-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                >
                  Agregar Tarjetas
                </button>
              </div>
            </form>
          </div>
          <div className={styles["canvas-grid"]}>
            <Canvas startGame={startGame} />
            <div className="py-5 md:py-0 text-white flex justify-center items-center">
              {!!currentBall && (
                <div
                  key={currentBall}
                  className={`text-4xl font-medium ${styles["current-ball"]}`}
                >
                  {currentBall}
                </div>
              )}
            </div>
          </div>
          <div className="p-5 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-5 gap-3">
              {pastNumbers.map((number) => (
                <div
                  className="rounded-full bg-red-300 text-black flex items-center justify-center w-10 h-10 text-lg"
                  key={number}
                >
                  {number}
                </div>
              ))}
            </div>
          </div>
        </div>
        {isOpenDialog && (
          <Dialog isOpen={isOpenDialog}>
            <p>
              Total Points: <span>{points}</span>
            </p>
            <div className="flex gap-4 justify-center items-center pt-4">
              <button onClick={handleEndGame}>Back to Home</button>
            </div>
          </Dialog>
        )}
        <CardBingoList />
      </div>
    </>
  );
}
