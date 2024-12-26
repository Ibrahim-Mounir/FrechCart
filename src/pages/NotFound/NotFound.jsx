import React from "react";
import notFoundImg from "../../assets/images/404-copy.png";
import { Helmet } from "react-helmet-async";
export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div className=" flex justify-center items-center">
        <img src={notFoundImg} alt="" className="w-[500px]" />
      </div>
    </>
  );
}
