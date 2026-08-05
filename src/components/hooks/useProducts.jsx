import { useEffect, useState } from "react";
import { cleanProductsData } from "../../utils/index.js";

export const useProducts = () => {
  const [products, setProducts] = useState(null);
  const [productsError, setError] = useState(null);
  const [productsLoading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    (async function getProducts() {
      fetch("https://fakestoreapi.com/products", { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
          return response.json();
        })
        .then((response) => setProducts(cleanProductsData(response)))
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    })();

    return () => controller.abort("Fetch cancelled by cleanup callback.");
  }, []);

  return { productsLoading, productsError, products, setProducts };
};
