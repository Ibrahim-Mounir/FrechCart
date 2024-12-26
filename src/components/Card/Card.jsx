import { useContext, useEffect, useState } from "react";

import { CartContext } from "../../contexts/Cart.context";
import { Link } from "react-router-dom";

import { WishlistContext } from "../../contexts/Wishlist.context";

export default function Card({ productInfo }) {
  const { price, ratingsAverage, images, title, category, id } = productInfo;
  const { addProduct } = useContext(CartContext);

  const [isInWishlist, setIsInWishlist] = useState(false);
  const { addWishlistProduct, wishlistProducts, removeWishlistProduct } =
    useContext(WishlistContext);
  useEffect(() => {
    let productStatus = wishlistProducts?.data?.data.some((product) => {
      return product.id === id;
    });
    setIsInWishlist(productStatus);
  }, [wishlistProducts, id]);

  return (
    <div className=" col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-lg rounded-md overflow-hidden group">
      <div className="relative  ">
        <img src={images[0]} alt="Playstation Controller" className="w-full" />
        <div
          className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-15 opacity-0 transition-opacity  duration-300 hover:opacity-100 flex justify-center items-center gap-2`}
        >
          <span
            onClick={() => {
              isInWishlist
                ? removeWishlistProduct.mutate(id)
                : addWishlistProduct(id);
            }}
            className={` 
              ${isInWishlist ? "text-red-600" : "text-white"}
                  
                  
              }
             text-sm hover:scale-110 cursor-pointer duration-300 transition-transform hover:rotate-6 w-10 h-10 flex items-center justify-center rounded-full bg-primary-600`}
          >
            <i className="fa-solid fa-heart"></i>
          </span>

          <span
            onClick={() => {
              addProduct({ id });
            }}
            className={`text-white  text-sm hover:scale-110 cursor-pointer duration-300 transition-transform hover:rotate-6 w-10 h-10 flex items-center justify-center rounded-full bg-primary-600`}
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </span>
          <Link
            to={`/product/${id}`}
            className="text-white text-sm hover:scale-110 cursor-pointer duration-300  transition-transform hover:rotate-6 w-10 h-10 flex items-center justify-center rounded-full bg-primary-600"
          >
            <i className="fa-solid fa-eye"></i>
          </Link>
        </div>
      </div>
      <div className="body p-3">
        <h4 className="text-primary-500 line-clamp-1">{category.name}</h4>
        <h3 className="text-lg hover:underline font-semibold line-clamp-2">
          <Link to={`/product/${id}`}>{title}</Link>
        </h3>

        <div className="flex justify-between mt-3">
          <span>{price} EGP</span>
          <div className="flex gap-1 items-center">
            <i className="fa-solid fa-star text-yellow-500"></i>
            <span>{ratingsAverage}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
