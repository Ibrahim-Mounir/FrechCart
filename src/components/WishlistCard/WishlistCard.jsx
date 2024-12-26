import React, { useContext, useState } from "react";

import axios from "axios";
import { CartContext } from "../../contexts/Cart.context";
import { Link } from "react-router-dom";

export default function WishlistCart({ productInfo, removeWishlistProduct }) {
  const { title, imageCover, price, id } = productInfo;

  const { addProduct } = useContext(CartContext);
  return (
    <div className=" grid grid-cols-12 gap-4 rounded-lg bg-gray-100 p-3">
      <div className=" col-span-12 md:col-span-2 sm:col-span-3 rounded-md overflow-hidden">
        <Link to={`/product/${id}`}>
          <img src={imageCover} alt="" className=" w-full h-full object-fit" />
        </Link>
      </div>
      <div className="col-span-12 md:col-span-10 sm:col-span-9  flex justify-between items-center">
        <div>
          <h3 className="text-xl mb-1 font-semibold">
            <Link to={`/product/${id}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <p>
            <span className="font-bold text-primary-500">{price}</span> EGP
          </p>
          <button
            onClick={removeWishlistProduct}
            className="btn mt-3 text-red-500 uppercase font-semibold border-[1px] border-red-500 bg-transparent hover:text-white hover:bg-red-500"
          >
            <i className="fa-solid fa-trash pe-1"></i>
            Remove
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              addProduct({ id });
            }}
            className="btn text-primary-500 border-primary-500 uppercase font-semibold border-[1px] bg-transparent hover:text-white hover:bg-primary-500"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
