import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { UserContext } from "../../contexts/User.context";

export default function ResetPassword() {
  let navigate = useNavigate();
  const { token } = useContext(UserContext);
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  async function changePassword(values) {
    const toastId = toast.loading("Please wait...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);
      if (data.token) {
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error.response.data.message);
      formik.setFieldError("email", error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }
  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
    newPassword: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      changePassword(values);
    },
  });
  return (
    <>
      <section>
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">
            <i className="fa-regular fa-circle-user me-1"></i>
            Reset your Password:
          </h2>
          <div className="space-y-3">
            <div>
              <input
                type="email"
                className="form-control w-full"
                placeholder="Type your email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  *{formik.errors.email}
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                className="form-control w-full"
                placeholder="Type your password"
                name="newPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="text-sm text-red-500 mt-1">
                  *{formik.errors.newPassword}
                </p>
              )}
            </div>
          </div>
          <button
            disabled={
              (formik.errors && Object.keys(formik.errors).length > 0) ||
              formik.isSubmitting
            }
            type="submit"
            className=" btn bg-transparent border-2 font-semibold disabled:border-slate-500 disabled:bg-transparent disabled:text-slate-500 border-primary-500 text-primary-500 hover:text-white hover:bg-primary-500"
          >
            Rest Password
          </button>
        </form>
      </section>
    </>
  );
}
