import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container  min-h-[60vh] pt-20 pb-10">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
