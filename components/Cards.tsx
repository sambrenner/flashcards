import { FormEvent, useState } from "react";
import { Card as CardType } from "../utils/types";
import { Card } from "./Card";
import styles from "../styles/Cards.module.css";

export default function Cards({ cards }: { cards: CardType[] }) {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [flip, setFlip] = useState<boolean>(false);

  const nextCard = () => {
    setCurrentCardIndex(
      currentCardIndex === cards.length - 1 ? 0 : currentCardIndex + 1
    );
  };

  const previousCard = () => {
    setCurrentCardIndex(
      currentCardIndex === 0 ? cards.length - 1 : currentCardIndex - 1
    );
  };

  const selectCard = (val: number) => {
    if (val < 0) {
      setCurrentCardIndex(cards.length - 1);
    } else if (val >= cards.length) {
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex(val);
    }
  };

  return (
    <div>
      <ul>
        {cards.map((c, i) => (
          <li
            className={`${styles.card} ${
              currentCardIndex === i ? styles.active : ""
            }`}
            key={c.id}
          >
            <Card card={c} flip={flip} />
          </li>
        ))}
      </ul>

      <div>
        <input type="button" value="Flip Card" onClick={() => setFlip(!flip)} />
      </div>

      <div>
        <input
          type="button"
          value="Previous"
          onClick={() => {
            setFlip(false);
            previousCard();
          }}
        />
        <span>
          <input
            type="number"
            value={currentCardIndex + 1}
            onChange={(evt: FormEvent<HTMLInputElement>) => {
              const val = parseInt(evt.currentTarget.value, 10) - 1;
              setFlip(false);
              selectCard(val);
            }}
          />{" "}
          / {cards.length}
        </span>
        <input
          type="button"
          value="Next"
          onClick={() => {
            setFlip(false);
            nextCard();
          }}
        />
      </div>
    </div>
  );
}
