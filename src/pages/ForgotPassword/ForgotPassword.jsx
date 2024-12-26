import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function ForgotPassword() {
  let navigate = useNavigate();
  async function sendForgottenPasswordEmail(values) {
    let toastId = toast.loading("Wait please...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.statusMsg === "success") {
        toast.success("Check your email inbox");
        setInterval(() => {
          navigate("/auth/verifyCode", { replace: true });
        }, 2000);
      }
    } catch (error) {
      formik.setFieldError("email", error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }
  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: sendForgottenPasswordEmail,
  });
  return (
    <>
      <section>
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">
            <i className="fa-regular fa-circle-user me-1"></i>
            Enter your registered email:
          </h2>
          <div>
            <input
              type="text"
              className="form-control w-full"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <p className="text-sm text-red-500">*{formik.errors.email}</p>
          )}
          <button
            disabled={
              (formik.errors && Object.keys(formik.errors).length > 0) ||
              formik.isSubmitting
            }
            type="submit"
            className="bg-transparent btn border-2 font-semibold border-primary-500 disabled:border-slate-500 disabled:bg-transparent disabled:text-slate-500 text-primary-500 hover:text-white hover:bg-primary-500"
          >
            Verify
          </button>
        </form>
      </section>
    </>
  );
}
