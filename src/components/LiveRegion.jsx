export const LiveRegion = ({ children, announcement, testId }) => {
  return (
    <>
      {children}
      <span
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        data-testid={testId}
      >
        {announcement}
      </span>
    </>
  );
};
