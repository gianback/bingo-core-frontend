import { useHydratedGameStore } from "@/store/gameStore";
import { CardBingo } from "../CardBingo";
import styles from "./styles.module.css";

export function CardBingoList() {
  const cardList = useHydratedGameStore("cardList");

  return (
    <section className="p-4 mt-4">
      <ul className={styles["cardList-list"]}>
        {cardList.length > 0 && (
          <>
            {cardList.map((card) => (
              <CardBingo numbers={card.bingoCard} key={card.bingo_card_id} />
            ))}
          </>
        )}
      </ul>
    </section>
  );
}
