import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import BrandCard from "../../components/BrandCard/BrandCard";
import { ProductsContext } from "../../contexts/Products.context";

export default function Brands() {
  const { isBrandLoading, brands } = useContext(ProductsContext);

  if (isBrandLoading) return <Loading />;
  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>

      <section className="px-6 sm:px-0 ">
        <h2 className="text-center font-semibold text-4xl mb-12 text-slate-700">
          All Brands
        </h2>
        <div className="brands grid grid-cols-12 gap-5 ">
          {brands?.data?.data.map((brand) => {
            return <BrandCard brandInfo={brand} key={brand._id} />;
          })}
        </div>
      </section>
    </>
  );
}
