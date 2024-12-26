import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./User.context";

export const WishlistContext = createContext(null);

export default function WishlistProvider({ children }) {
  const { token } = useContext(UserContext);
  const clientQuery = useQueryClient();
  const {
    data: wishlistProducts,
    isLoading: isWishlistProductsLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["Wishlist Products"],
    queryFn: getUserWishlist,
    enabled: !!token,
  });

  async function addWishlistProduct(id) {
    const toastId = toast.loading("Adding To Wishlist...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };
      const { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success(data.message);
        clientQuery.invalidateQueries(["Wishlist Products"]);
        console.log(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function getUserWishlist() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
      method: "GET",
      headers: {
        token,
      },
    };

    return axios.request(options);
  }
  const removeWishlistProduct = useMutation({
    mutationFn: async (id) => {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      return axios.request(options);
    },
    onMutate: () => {
      const toastId = toast.loading("Removing product...");
      return { toastId };
    },
    onSuccess: (data) => {
      toast.success(data.data.message);

      clientQuery.invalidateQueries(["Wishlist Products"]);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: (_, __, ___, context) => {
      toast.dismiss(context.toastId);
    },
  });

  return (
    <WishlistContext.Provider
      value={{
        getUserWishlist,
        removeWishlistProduct,
        isSuccess,
        addWishlistProduct,
        wishlistProducts,
        isWishlistProductsLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
