export const LiveRegion = ({ children, announcement }) => {
  return (
    <>
      {children}
      <span
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </span>
    </>
  );
};
