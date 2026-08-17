export const CartPreview = ({ totalProducts }) => {
  return (
    <>
      Cart <span aria-hidden="true">({totalProducts})</span>
    </>
  );
};
