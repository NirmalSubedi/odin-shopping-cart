export const LiveRegion = ({ children, announcement }) => {
  return (
    <>
      {children}
      <span
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        data-testid="live-region"
      >
        {announcement}
      </span>
    </>
  );
};
