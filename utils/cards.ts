import shuffler from "seededshuffle";
import { CardSets, CardSetOptions, Ordering, Card } from "./types";

export function getCardsToDisplay(
  cardSets: CardSets,
  options: CardSetOptions
): Card[] {
  const cards = Object.keys(options.selectedSets)
    .filter((s) => options.selectedSets[s])
    .flatMap((s) => cardSets[s]);

  if (options.ordering === Ordering.Random) {
    return shuffler.shuffle(cards, options.randomSeed);
  }

  if (options.ordering === Ordering.Alphabetical) {
    return cards.sort((a, b) => a.front.localeCompare(b.front));
  }

  return cards;
}
