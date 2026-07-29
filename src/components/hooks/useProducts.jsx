import { useEffect, useState } from "react";

const initialProducts = [
  { title: "Shoe" },
  { title: "Flip-Flops" },
  { title: "Hat" },
  { title: "Shirt" },
  { title: "Pants" },
  { title: "Sunglasses" },
  { title: "Underwear" },
];

export const useProducts = () => {
  // const [products, setProducts] = useState(null);
  const [products, setProducts] = useState(initialProducts);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    (async function getProducts() {
      fetch("https://example.com", { signal: controller.signal })
        .then((response) => response.json())
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP Error- ${response.status}`);
          setProducts(response);
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    })();

    return () => controller.abort();
  }, []);

  return { loading, error, products };
};
