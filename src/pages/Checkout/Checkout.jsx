import axios from "axios";
import { useFormik, validateYupSchema } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { UserContext } from "../../contexts/User.context";
import { CartContext } from "../../contexts/Cart.context";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export default function Checkout() {
  const { token } = useContext(UserContext);
  let { cartInfo } = useContext(CartContext);
  let [paymentMethod, setPaymentMethod] = useState(null);

  let navigate = useNavigate();
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;
  const validationSchema = object({
    shippingAddress: object({
      city: string()
        .required("Name of the city is required")
        .min(2, "Name of city must contain at least 2 characters"),
      phone: string()
        .required("Phone number is required")
        .matches(phoneRegex, "Phone number must be Egyptian"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      paymentMethod == "cash"
        ? setCashOrder(values)
        : setOnlinePayOrder(values);
    },
  });
  async function setCashOrder(values) {
    let toastId = toast.loading("Making you order...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          values,
        },
      };
      const { data } = await axios.request(options);
      if (data.status) {
        toast.success("Your order has been made");
        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function setOnlinePayOrder(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          values,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.loading("Redirecting you to make the payment");
        location.href = data.session.url;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <section>
        <h2 className="text-gray-600 text-xl font-semibold mb-4">
          Shipping Address
        </h2>
        <form className="space-y-3" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="City"
              className="w-full form-control"
              name="shippingAddress.city"
              onChange={formik.handleChange}
              value={formik.values.shippingAddress.city}
              onBlur={formik.handleBlur}
            />
            {formik.errors.shippingAddress?.city &&
              formik.touched.shippingAddress.city && (
                <p className="text-sm mt-1 text-red-500">
                  *{formik.errors.shippingAddress?.city}
                </p>
              )}
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone"
              className="w-full form-control"
              name="shippingAddress.phone"
              onChange={formik.handleChange}
              value={formik.values.shippingAddress.phone}
              onBlur={formik.handleBlur}
            />
            {formik.errors.shippingAddress?.phone &&
              formik.touched.shippingAddress?.phone && (
                <p className="text-sm mt-1 text-red-500">
                  *{formik.errors.shippingAddress?.phone}
                </p>
              )}
          </div>
          <div>
            <textarea
              placeholder="Details"
              className="w-full form-control"
              name="shippingAddress.details"
              onChange={formik.handleChange}
              value={formik.values.details}
              onBlur={formik.handleBlur}
            ></textarea>
          </div>
          <button
            onClick={() => {
              setPaymentMethod("cash");
            }}
            type="submit"
            className=" btn bg-lime-500 text-white hover:bg-lime-600  "
          >
            Cash Order
          </button>
          <button
            onClick={() => {
              setPaymentMethod("online");
            }}
            type="submit"
            className=" btn bg-blue-500 text-white hover:bg-blue-600 ms-4 "
          >
            Online Payment
          </button>
        </form>
      </section>
    </>
  );
}
