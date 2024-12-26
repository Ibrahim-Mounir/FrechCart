import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./User.context";
import axios from "axios";

export const CartContext = createContext(null);
export default function CartProvider({ children }) {
  const { token } = useContext(UserContext);

  let [cartInfo, setCartInfo] = useState(null);

  async function addProduct({ id }) {
    const toastId = toast.loading("Adding product to cart...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };

      const { data } = await axios.request(options);

      if (data.status == "success") {
        toast.success("product has been added successfully");
        getCartProducts(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function getCartProducts() {
    if (!token) return;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);

      setCartInfo(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function removeProductFromCart({ productId }) {
    const toastId = toast.loading("Removing product...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: { token },
      };
      const { data } = await axios.request(options);
      if (data.status == "success") {
        setCartInfo(data);

        toast.success("Product has been deleted");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function clearCart({ id }) {
    const toastId = toast.loading("Removing all products...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: "DELETE",
        headers: { token },
      };
      const { data } = await axios.request(options);

      if (data.message == "success") {
        setCartInfo({
          numOfCartItems: 0,
        });

        toast.success("Products have been removed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function updateCartQuantity({ productId, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      const { data } = await axios.request(options);

      if (data.status == "success") {
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProduct,
        getCartProducts,
        cartInfo,
        removeProductFromCart,
        clearCart,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
