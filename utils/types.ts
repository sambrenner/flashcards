export enum Ordering {
  Original,
  Random,
  Alphabetical,
}

export type Sheet = {
  name: string;
  id: string;
};

export type CardSheet = {
  name: string;
  sets: CardSets;
};

export type CardSets = Record<string, Card[]>;

export type CardSetOptions = {
  selectedSets: Record<string, boolean>;
  ordering: Ordering;
  randomSeed: number;
};

export type Card = {
  front: string;
  back: string;
  id: string;
};
