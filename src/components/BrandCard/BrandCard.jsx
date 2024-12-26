import React from "react";
import { Link } from "react-router-dom";

export default function BrandCard({ brandInfo }) {
  const { _id, name, image } = brandInfo;

  return (
    <>
      <div className="brand cursor-pointer col-span-12  md:col-span-6 lg:col-span-3 overflow-hidden rounded-md border-slate-300 border-[1px] hover:shadow-lg">
        <Link to={`/brand-details/${_id}`}>
          <img src={image} alt="" className="w-full" />
          <h3 className="text-center p-4 mb-4">{name}</h3>
        </Link>
      </div>
    </>
  );
}
