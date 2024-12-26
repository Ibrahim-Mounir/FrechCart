import React, { useContext } from "react";
import WishlistCard from "../../components/WishlistCard/WishlistCard";

import Loading from "../../components/Loading/Loading";

import { WishlistContext } from "../../contexts/Wishlist.context";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { removeWishlistProduct, wishlistProducts, isWishlistProductsLoading } =
    useContext(WishlistContext);

  if (isWishlistProductsLoading) return <Loading />;

  if (wishlistProducts.data.data.length == 0) {
    return (
      <div className="py-6 mt-6 shadow rounded-lg flex-col text-center flex justify-center items-center gap-3 bg-gray-100">
        <p>
          Opps! Your Whislist is empty. Go to home page to see somethig you like
        </p>
        <Link
          to={"/"}
          className="btn bg-primary-500 hover:bg-primary-600 text-white "
        >
          Back To Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="px-6 sm:px-0">
        <h2 className="text-3xl text-slate-800 mb-7 font-semibold">
          My Wishlist
        </h2>
        <div className="space-y-3">
          {wishlistProducts?.data?.data.map((product) => {
            return (
              <WishlistCard
                key={product.id}
                productInfo={product}
                removeWishlistProduct={() => {
                  removeWishlistProduct.mutate(product.id);
                }}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
