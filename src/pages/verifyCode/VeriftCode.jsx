import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function VeriftCode() {
  let navigate = useNavigate();
  async function sendCode(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);

      if (data.status === "Success") {
        navigate("/auth/resetPassword", { replace: true });
      }
    } catch (error) {
      console.log(error);

      formik.setFieldError("resetCode", error.response.data.message);
    }
  }
  const validationSchema = object({
    resetCode: string().required("Verification code is required"),
  });
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendCode(values);
    },
  });
  return (
    <>
      <section>
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">
            <i className="fa-regular fa-circle-user me-1"></i>
            Enter your verification code:
          </h2>
          <div>
            <input
              type="text"
              className="form-control w-full"
              placeholder="Code"
              name="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.resetCode && formik.touched.resetCode && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.resetCode}
              </p>
            )}
          </div>

          <button
            disabled={
              (formik.errors && Object.keys(formik.errors).length > 0) ||
              formik.isSubmitting
            }
            type="submit"
            className="bg-transparent btn border-2 font-semibold disabled:border-slate-500 disabled:bg-transparent disabled:text-slate-500 border-primary-500 text-primary-500 hover:text-white hover:bg-primary-500"
          >
            Verify Code
          </button>
        </form>
      </section>
    </>
  );
}
