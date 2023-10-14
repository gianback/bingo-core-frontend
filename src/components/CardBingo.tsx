"use client";
import { useGameStore } from "@/store/gameStore";

type props = {
  numbers: (number | null)[][];
};
export function CardBingo({ numbers }: props) {
  const pastNumbers = useGameStore((state) => state.pastNumbers);

  return (
    <article className="max-w-[300px] w-full bg-[#D26D59] py-3">
      <header>
        <h2 className="text-white text-3xl uppercase font-bold italic text-center py-3">
          BINGO
        </h2>
      </header>
      <div className="grid grid-cols-5 px-8">
        {numbers.map((number, index1) => (
          <div
            key={index1}
            className="bg-white font-bold text-2xl text-center border-black divide-solid border-t-[1px] last:border-r-[1px]"
          >
            {number.map((n, index2) => (
              <>
                {n === null ? (
                  <picture className="icon flex items-center h-[49px] p-2 w-full border-black divide-solid border-l-[1px] border-b-[1px]">
                    <img
                      src="/free-space.svg"
                      className="w-full h-full"
                      alt="icon"
                    />
                  </picture>
                ) : (
                  <div
                    className={`${
                      pastNumbers.includes(n) ? "bg-red-500" : ""
                    } p-2 border-black divide-solid border-l-[1px] border-b-[1px]`}
                  >
                    {n}
                  </div>
                )}
              </>
            ))}
          </div>
        ))}
      </div>
    </article>
  );
}
