import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/User.context";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Orders() {
  const { token } = useContext(UserContext);
  const { id } = jwtDecode(token);
  let [orders, setOrders] = useState(null);

  useEffect(() => {
    getUsersOrders();
  }, []);
  async function getUsersOrders() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method: "GET",
      };
      const { data } = await axios.request(options);

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      {orders ? (
        <section className="space-y-4">
          {orders.map((order) => {
            return (
              <div
                key={order.id}
                className="p-4 border-2 border-gray-500 border-opacity-25 rounded-lg"
              >
                <header className="flex justify-between items-center">
                  <div>
                    <h2 className="text-gray-500">Order ID</h2>
                    <span className="text-gray-700 text-lg font-semibold">
                      {order.id}
                    </span>
                  </div>
                  <div>
                    {order.isPaid ? (
                      <span className="font-cairo inline-block px-3 py-1 me-2 text-white font-semibold bg-lime-500 rounded-md">
                        تم الدفع
                      </span>
                    ) : (
                      <span className="font-cairo inline-block px-3 py-1 me-2 text-white font-semibold bg-blue-500 rounded-md">
                        غير مدفوع
                      </span>
                    )}
                    {order.isDelivered ? (
                      <span className="font-cairo inline-block px-3 py-1  text-white font-semibold bg-lime-500 rounded-md ">
                        تم الاستلام
                      </span>
                    ) : (
                      <span className="font-cairo inline-block px-3 py-1  text-white font-semibold bg-red-500 rounded-md ">
                        قيد التوصيل
                      </span>
                    )}
                  </div>
                </header>
                <div className="mt-4 md:gap-4 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {order.cartItems.map((product) => {
                    return (
                      <div
                        key={product._id}
                        className="border-2 overflow-hidden border-gray-400 border-opacity-30 rounded-lg"
                      >
                        <img
                          src={product.product.imageCover}
                          alt=""
                          className="w-full"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold line-clamp-2">
                            <Link to={`/product/${product.product.id}`}>
                              {product.product.title}
                            </Link>
                          </h3>
                          <div className="flex mt-2 justify-between items-center">
                            <p>
                              <span className="font-bold underline">
                                Count:{" "}
                              </span>
                              {product.count}
                            </p>
                            <span>{product.price} L.E</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-4">
                  You total order price is{" "}
                  <span className="mx-1 text-primary-400 font-bold">
                    {order.totalOrderPrice} L.E
                  </span>
                </p>
              </div>
            );
          })}
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
