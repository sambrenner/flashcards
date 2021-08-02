import { MenuItem, Select } from "@material-ui/core";
import { Sheet } from "../utils/types";

const NO_SELECTION = "none";

export default function SheetSelector({
  sheets,
  onSheetSelect,
}: {
  sheets: Sheet[];
  onSheetSelect: (sheetId: string | null) => void;
}) {
  return (
    <Select
      defaultValue={NO_SELECTION}
      onChange={(evt) => {
        const select = evt.target;
        const value = select.value as string;
        onSheetSelect(value === NO_SELECTION ? null : value);
      }}
    >
      <MenuItem value={NO_SELECTION}>
        <em>Select a Google Sheet</em>
      </MenuItem>

      {sheets
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((s) => (
          <MenuItem key={s.id} value={s.id}>
            {s.name}
          </MenuItem>
        ))}
    </Select>
  );
}
