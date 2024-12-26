import axios from "axios";
import { useFormik, validateYupSchema } from "formik";
import React, { useState } from "react";
import { object, ref, string } from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Signup() {
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = object({
    name: string()
      .required("Name is required")
      .min(3, "Name must contain at least 3 characters")
      .max(20, "Name characters cannot be more than 20"),
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password characters must be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: string()
      .required("Password confirmation is required")
      .oneOf(
        [ref("password")],
        "Password and password confirmation must be the same"
      ),
    phone: string()
      .required("Phone number is required")
      .matches(phoneRegex, "Phone number must be egyptian phone number"),
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleData,
  });
  const [emailExistError, setEmailExistError] = useState(null);
  async function handleData(values) {
    const loadingToast = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "Post",
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.message == "success") {
        toast.success("Account has created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setEmailExistError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      console.log(loadingToast);

      toast.dismiss(loadingToast);
    }
  }

  return (
    <>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <h2 className="text-xl font-semibold text-slate-700 mb-3 ">
        <i className="fa-regular fa-circle-user"></i> Register Now:
      </h2>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="form-control w-full"
            value={formik.values.name}
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 text-sm mt-1">*{formik.errors.name}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="form-control w-full "
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm mt-1">*{formik.errors.email}</p>
          )}
          {emailExistError && (
            <p className="text-red-500 text-sm mt-1">*{emailExistError}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="form-control w-full "
            value={formik.values.password}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-sm mt-1">
              *{formik.errors.password}
            </p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            className="form-control w-full "
            value={formik.values.rePassword}
            name="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-500 text-sm mt-1">
              *{formik.errors.rePassword}
            </p>
          )}
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone"
            className="form-control w-full "
            value={formik.values.phone}
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 text-sm mt-1">*{formik.errors.phone}</p>
          )}
        </div>
        <button
          disabled={
            (formik.errors && Object.keys(formik.errors).length > 0) ||
            formik.isSubmitting
          }
          type="submit"
          className="btn w-full text-white bg-primary-500 hover:bg-primary-700 disabled:bg-slate-500"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
