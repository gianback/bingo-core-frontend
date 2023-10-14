import { useGameStore } from "@/store/gameStore";
import { CardBingo } from "./CardBingo";

export function CardBingoList() {
  const cardList = useGameStore((state) => state.cardList);

  return (
    <section className="p-4 mt-4">
      <ul className="cardList-list">
        {cardList.length > 0 && (
          <>
            {cardList.map((card) => (
              <CardBingo numbers={card.data} key={card.bingo_card_id} />
            ))}
          </>
        )}
      </ul>
    </section>
  );
}
