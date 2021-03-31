import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { ChangeEvent, FormEvent } from "react";
import { setFieldsToValue } from "../utils/objects";
import {
  CardSetOptions as CardSetOptionsType,
  CardSets,
  Ordering,
} from "../utils/types";

export default function CardSetOptions({
  cardSets,
  options,
  onOptionsChange,
}: {
  cardSets: CardSets;
  options: CardSetOptionsType;
  onOptionsChange: (options: CardSetOptionsType) => void;
}) {
  return (
    <div>
      <FormControl component="fieldset" margin="normal" fullWidth>
        <FormLabel component="legend">Active Sets</FormLabel>
        <FormGroup row>
          {Object.keys(cardSets).map((cs) => (
            <FormControlLabel
              key={cs}
              control={
                <Checkbox
                  id={cs}
                  checked={options.selectedSets[cs] || false}
                  onChange={(evt: FormEvent<HTMLInputElement>) => {
                    const checkbox = evt.currentTarget;

                    onOptionsChange({
                      ...options,
                      selectedSets: {
                        ...options.selectedSets,
                        [checkbox.id]: checkbox.checked,
                      },
                    });
                  }}
                />
              }
              label={cs}
            />
          ))}

          <ButtonGroup aria-label="outlined primary button group">
            <Button
              onClick={() => {
                onOptionsChange({
                  ...options,
                  selectedSets: setFieldsToValue(options.selectedSets, true),
                });
              }}
            >
              All
            </Button>
            <Button
              onClick={() => {
                onOptionsChange({
                  ...options,
                  selectedSets: setFieldsToValue(options.selectedSets, false),
                });
              }}
            >
              None
            </Button>
          </ButtonGroup>
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" margin="normal" fullWidth>
        <FormLabel component="legend">Ordering</FormLabel>
        <FormGroup row>
          <RadioGroup
            row
            aria-label="ordering"
            name="ordering"
            value={Ordering[options.ordering]}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              onOptionsChange({
                ...options,
                ordering: Ordering[evt.target.value as keyof typeof Ordering],
              });
            }}
          >
            {Object.values(Ordering)
              .filter((o) => typeof o === "string")
              .map((mode, i) => {
                const modeStr = mode.toString();

                return (
                  <FormControlLabel
                    value={modeStr}
                    key={modeStr}
                    control={<Radio />}
                    label={modeStr}
                  />
                );
              })}
          </RadioGroup>

          <Button
            variant="outlined"
            onClick={() => {
              onOptionsChange({
                ...options,
                ordering: Ordering.Random,
                randomSeed: Math.random(),
              });
            }}
          >
            Shuffle
          </Button>
        </FormGroup>
      </FormControl>
    </div>
  );
}
