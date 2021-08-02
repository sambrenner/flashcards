import { ChangeEvent, useState } from "react";
import { Card as CardType } from "../utils/types";
import { Card } from "./Card";
import { Button, FormGroup, Input, Paper } from "@material-ui/core";

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
      <Paper>
        {cards[currentCardIndex] && (
          <Card card={cards[currentCardIndex]} flip={flip} />
        )}
      </Paper>

      <FormGroup>
        <Button variant="outlined" onClick={() => setFlip(!flip)}>
          Flip
        </Button>
      </FormGroup>

      <FormGroup row>
        <Button
          variant="outlined"
          onClick={() => {
            setFlip(false);
            previousCard();
          }}
        >
          Previous
        </Button>
        <span>
          <Input
            type="number"
            value={currentCardIndex + 1}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              const val = parseInt(evt.target.value, 10) - 1;
              setFlip(false);
              selectCard(val);
            }}
          />{" "}
          / {cards.length}
        </span>
        <Button
          variant="outlined"
          onClick={() => {
            setFlip(false);
            nextCard();
          }}
        >
          Next
        </Button>
      </FormGroup>
    </div>
  );
}
