import styles from "../styles/LiveRegion.module.css";

export const LiveRegion = ({ children, announcement, testId }) => {
  return (
    <>
      {children}
      <span
        className={styles.srOnly}
        aria-live="polite"
        aria-atomic="true"
        data-testid={testId}
      >
        {announcement}
      </span>
    </>
  );
};
