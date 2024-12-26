import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function Categories() {
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("Categories");
  async function getAllCategories() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/categories`,
        method: "GET",
      };

      return axios.request(options);
    } catch (error) {
      console.log(error);
    } finally {
      console.log();
    }
  }

  const { data, isError, isFetching } = useQuery({
    queryKey: ["Categories"],
    queryFn: getAllCategories,
  });
  const {
    data: subcategories,
    error: subcategoriesError,
    isFetching: subcategoriesFetching,
  } = useQuery({
    queryKey: ["subcategory", categoryId],
    queryFn: () => {
      return getSubcategories(categoryId);
    },
    refetchInterval: 6 * 60 * 60 * 1000,
    refetchOnMount: false,
    enabled: !!categoryId,
  });
  async function getSubcategories(id) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
        method: "GET",
      };

      return await axios.request(options);
    } catch (error) {
      console.log(error);
    }
  }

  if (isFetching) return <Loading />;
  return (
    <>
      <Helmet>
        <title>{categoryName}</title>
      </Helmet>

      <section>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 px-3 items-start sm:px-0">
          {data?.data?.data.map((category) => {
            return (
              <>
                <div
                  key={category._id}
                  onClick={() => {
                    setCategoryId(category._id);
                    setCategoryName(category.name);
                  }}
                  className="card flex  flex-col justify-center items-center hover:shadow-xl  cursor-pointer border-slate-300 border-[1px] rounded-md overflow-hidden "
                >
                  <img
                    src={category.image}
                    alt=""
                    className="md:h-[300px] md:w-[300px] object-cover"
                  />
                  <h3 className="text-center text-xl p-3 font-semibold text-primary-800">
                    {category.name}
                  </h3>
                </div>
              </>
            );
          })}
        </div>
        {subcategoriesFetching && <Loading />}
        {categoryId && (
          <div className="text-center font-semibold">
            {!!subcategories?.data?.results && (
              <h2 className="text-3xl   pb-6 pt-10 text-slate-900">
                {`${categoryName} Subcategory`}
              </h2>
            )}

            <div className="grid grid-cols-12 gap-4 px-3 items-start sm:px-0">
              {subcategories?.data?.data.map((subCat) => {
                return (
                  <div
                    key={subCat._id}
                    className=" min-h-[90px] hover:shadow-lg flex items-center justify-center col-span-12 md:col-span-4 lg:col-span-3 rounded-md text-2xl p-4 text-slate-700 border-[1px] border-slate-300 "
                  >
                    {subCat.name}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
