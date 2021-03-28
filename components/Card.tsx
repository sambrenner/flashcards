import { Card as CardType } from "../utils/types";

export function Card({ card, flip }: { card: CardType; flip: boolean }) {
  return <p>{flip ? card.back : card.front}</p>;
}
