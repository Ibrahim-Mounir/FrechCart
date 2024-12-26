import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../../contexts/Products.context";
import BrandCard from "../../components/BrandCard/BrandCard";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";

export default function BrandDetails() {
  const [product, setProduct] = useState("");
  const { isBrandLoading, brands } = useContext(ProductsContext);
  const { id } = useParams();

  async function getBrandDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getBrandDetails();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <section>
        <div className="border-y-[1px] border-slate-300 p-4 flex flex-col md:flex-row bg-white ">
          <div className="md:w-2/3">
            <h3 className="font-semibold text-3xl mb-3 text-slate-800">
              {product.name}
            </h3>
            <p className="text-gray-700 text-xl">
              is a renowned leader in the industry, dedicated to delivering
              exceptional products/services that prioritize quality, innovation,
              and customer satisfaction.
            </p>
          </div>
          <div className="md:w-1/3">
            <img src={product.image} alt="" className="max-w-full" />
          </div>
        </div>
        {!isBrandLoading && (
          <div className="my-5">
            <h2 className="font-semibold text-xl mb-3 text-slate-800">
              Explore our other brands
            </h2>
            <Swiper
              loop={true}
              slidesPerView={"1"}
              spaceBetween={10}
              breakpoints={{
                640: {
                  slidesPerView: "2",
                },
                768: {
                  slidesPerView: "4",
                },
                1024: {
                  slidesPerView: "6",
                },
              }}
            >
              {brands?.data?.data.map((brand) => {
                return (
                  <SwiperSlide key={brand._id}>
                    <BrandCard brandInfo={brand} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </section>
    </>
  );
}
