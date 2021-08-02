import { Card as CardType } from "../utils/types";
import styles from "../styles/Card.module.css";

export function Card({ card, flip }: { card: CardType; flip: boolean }) {
  return (
    <div className={`${styles.card}`}>{flip ? card.back : card.front}</div>
  );
}
