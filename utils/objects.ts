export function setFieldsToValue(obj: Record<any, boolean>, val: boolean) {
  return Object.keys(obj).reduce<Record<string, boolean>>((acc, curr) => {
    acc[curr] = val;
    return acc;
  }, {});
}
