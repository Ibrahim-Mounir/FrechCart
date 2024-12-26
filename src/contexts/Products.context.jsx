import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";

export const ProductsContext = createContext();

export default function ProductsProvider({ children }) {
  async function getProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/products",
        method: "GET",
      };
      const { data } = await axios.request(options);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  let { data, isLoading } = useQuery({
    queryKey: ["Products"],
    queryFn: getProducts,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: 60 * 60 * 1000,
  });
  async function fetchAllBrands() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/brands",
        method: "GET",
      };
      const data = await axios.request(options);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  const { isLoading: isBrandsLoading, data: brands } = useQuery({
    queryKey: ["Brands"],
    queryFn: fetchAllBrands,
    refetchOnMount: false,
    refetchInterval: 6 * 60 * 60 * 100,
    refetchOnWindowFocus: false,
  });
  return (
    <ProductsContext.Provider
      value={{ data, isLoading, isBrandsLoading, brands }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
