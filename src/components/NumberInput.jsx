export const NumberInput = ({ onChange, min, value, name }) => (
  <input
    {...{
      type: "number",
      name,
      id: name,
      value,
      min,
      onChange,
      style: { maxWidth: "4ch", width: "100%" },
    }}
  />
);
