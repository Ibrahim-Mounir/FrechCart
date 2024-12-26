import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import UserProvider from "./contexts/User.context";
import CartProvider from "./contexts/Cart.context";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";

import Offline from "./components/Offline/Offline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Categories from "./pages/Categories/Categories";
import Brands from "./pages/Brands/Brands";
import Wishlist from "./pages/Wishlist/Wishlist";
import WishlistProvider from "./contexts/Wishlist.context";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

import ResetPassword from "./pages/RestPassword/ResetPassword";
import VeriftCode from "./pages/verifyCode/VeriftCode";

import { HelmetProvider } from "react-helmet-async";
import Products from "./pages/Products/Products";
import ProductsProvider from "./contexts/Products.context";
import BrandDetails from "./pages/BrandDetails/BrandDetails";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "product/:id",
          element: <ProductDetail />,
        },
        { path: "wishlist", element: <Wishlist /> },
        { path: "products", element: <Products /> },
        {
          path: "cart",
          element: <Cart />,
        },
        ,
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "allorders",
          element: <Orders />,
        },
        { path: "categories", element: <Categories /> },
        { path: "brands", element: <Brands /> },
        { path: "brand-details/:id", element: <BrandDetails /> },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/auth",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "forget-password",
          element: <ForgotPassword />,
        },

        {
          path: "resetPassword",
          element: <ResetPassword />,
        },
        {
          path: "verifyCode",
          element: <VeriftCode />,
        },
      ],
    },
  ]);
  const myClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserProvider>
          <CartProvider>
            <WishlistProvider>
              <HelmetProvider>
                <ProductsProvider>
                  <RouterProvider router={routes} />
                </ProductsProvider>
              </HelmetProvider>
            </WishlistProvider>
          </CartProvider>
        </UserProvider>
        <Toaster position="top-right" />

        <Offline>
          <div className="p-4 bg-gray-200 z-50 rounded-lg text-gray-600 fixed right-8 bottom-8">
            <i className="fa-solid fa-wifi me-2"></i>
            <span>Check your internet connection</span>
          </div>
        </Offline>
        <ReactQueryDevtools initialIsOpen={false} position="right" />
      </QueryClientProvider>
    </>
  );
}
