import React, { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/Cart.context";
import Loading from "../../components/Loading/Loading";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { UserContext } from "../../contexts/User.context";

export default function Cart() {
  let { getCartProducts, cartInfo, clearCart } = useContext(CartContext);
  const { token } = useContext(UserContext);

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartInfo == null ? (
        <Loading />
      ) : (
        <section>
          <div className="flex gap-8 items-center ">
            <i className="fa-brands text-3xl fa-opencart"></i>
            <h2 className=" text-slate-600 font-semibold text-xl relative before:absolute before:h-3/4 before:w-0.5 before:top-1/2 before:-translate-y-1/2  before:-left-1 ps-4 before:bg-slate-600">
              Your Shopping Cart
            </h2>
          </div>
          {cartInfo.numOfCartItems == 0 ? (
            <div className="py-6 mt-6 shadow rounded-lg flex-col text-center flex justify-center items-center gap-3 bg-gray-100">
              <p>
                Opps! Your cart is empty. Start shopping now by clicking the
                button below and find something you love
              </p>
              <Link
                to={"/"}
                className="btn bg-primary-500 hover:bg-primary-600 text-white "
              >
                Back To Home
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mt-6">
                {cartInfo.data.products.map((product) => {
                  return <CartItem productInfo={product} key={product._id} />;
                })}
              </div>
              <div className="flex justify-between items-center mt-5">
                <div className="flex items-center gap-2 text-xl">
                  <i className="fa-solid fa-money-bill  text-primary-600"></i>
                  <p>
                    Your total cart price is
                    <span className="text-primary-600 font-semibold px-2">
                      {cartInfo.data.totalCartPrice}
                    </span>
                    L.E
                  </p>
                </div>
                <button
                  onClick={clearCart}
                  className="bg-red-500 text-white   hover:bg-red-600  btn "
                >
                  <i className="fa-solid pe-2 fa-trash"></i>
                  Empty Cart
                </button>
              </div>
              <Link
                className="btn w-full bg-primary-500 text-white hover:bg-primary-600 inline-block text-center mt-8"
                to={"/checkout"}
              >
                Next Step (Payment)
              </Link>
            </>
          )}
        </section>
      )}
    </>
  );
}
