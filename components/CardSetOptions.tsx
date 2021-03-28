import { FormEvent } from "react";
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
    <form>
      <fieldset>
        <legend>Active Sets</legend>
        {Object.keys(cardSets).map((cs) => (
          <span key={cs}>
            <input
              type="checkbox"
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
            <label htmlFor={cs}>{cs}</label>
          </span>
        ))}

        <input
          type="button"
          value="All"
          onClick={() => {
            onOptionsChange({
              ...options,
              selectedSets: setFieldsToValue(options.selectedSets, true),
            });
          }}
        />
        <input
          type="button"
          value="None"
          onClick={() => {
            onOptionsChange({
              ...options,
              selectedSets: setFieldsToValue(options.selectedSets, false),
            });
          }}
        />
      </fieldset>

      <fieldset>
        <legend>Ordering</legend>

        {Object.values(Ordering)
          .filter((o) => typeof o === "string")
          .map((mode, i) => {
            const modeStr = mode.toString();

            return (
              <span key={modeStr}>
                <input
                  type="radio"
                  id={modeStr}
                  name="ordering"
                  checked={
                    Ordering[modeStr as keyof typeof Ordering] ===
                    options.ordering
                  }
                  onChange={(evt: FormEvent<HTMLInputElement>) => {
                    onOptionsChange({
                      ...options,
                      ordering:
                        Ordering[evt.currentTarget.id as keyof typeof Ordering],
                    });
                  }}
                />
                <label htmlFor={modeStr}>{modeStr}</label>
              </span>
            );
          })}

        <input
          type="button"
          value="Shuffle"
          onClick={() => {
            onOptionsChange({
              ...options,
              ordering: Ordering.Random,
              randomSeed: Math.random(),
            });
          }}
        />
      </fieldset>
    </form>
  );
}
