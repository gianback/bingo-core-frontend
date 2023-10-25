import { useHydratedGameStore } from "@/store/gameStore";
import { CardBingo } from "../CardBingo";
import styles from "./styles.module.css";
import { shallow } from "zustand/shallow";

export function CardBingoList() {
  const cardList = useHydratedGameStore("cardList", shallow);
  return (
    <section className="p-0 lg:p-4 mt-4">
      <ul className={styles["cardList-list"]}>
        {cardList.length > 0 && (
          <>
            {cardList.map((card) => (
              <CardBingo
                numbers={card.bingoCard}
                key={card.id}
                cardId={card.id}
              />
            ))}
          </>
        )}
      </ul>
    </section>
  );
}
