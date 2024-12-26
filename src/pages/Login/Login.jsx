import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { object, string } from "yup";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/User.context";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password characters must be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLoginData,
  });
  const [emailNonExist, setEmailNonExist] = useState(null);
  async function handleLoginData(values) {
    const loadingToast = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "Post",
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.message == "success") {
        setToken(data.token);
        localStorage.setItem("token", data.token);

        toast.success("You have logged in successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setEmailNonExist(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  return (
    <>
      <Helmet>
        <title>Log in</title>
      </Helmet>
      <h2 className="text-xl font-semibold text-slate-700 mb-3 ">
        <i className="fa-regular fa-circle-user"></i> Login:
      </h2>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
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
          {emailNonExist && (
            <p className="text-red-500 text-sm mt-1">*{emailNonExist}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 justify-center items-center">
          <button
            disabled={
              (formik.errors && Object.keys(formik.errors).length > 0) ||
              formik.isSubmitting
            }
            type="submit"
            className="btn w-full mt-3 text-white bg-primary-500 hover:bg-primary-700 disabled:bg-slate-500"
          >
            Login
          </button>
          <Link
            className="text-slate-700 transition-colors font-semibold  duration-300 hover:text-primary-400 hover:underline"
            to={"/auth/forget-password"}
          >
            Forgotten Password?
          </Link>
        </div>
      </form>
    </>
  );
}
