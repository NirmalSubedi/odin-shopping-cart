import styles from "../styles/NumberInput.module.css";

export const NumberInput = ({ onChange, min, value, name }) => (
  <input
    {...{
      type: "number",
      name,
      id: name,
      value,
      min,
      onChange,
      className: styles.numberInput,
    }}
  />
);
