import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/Cart.context";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactImageGallery from "react-image-gallery";
import Card from "../../components/Card/Card";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";

import { Helmet } from "react-helmet-async";

export default function ProductDetail() {
  const { addProduct } = useContext(CartContext);
  let [productDetails, setProductDetails] = useState(null);
  let [relatedProducts, setRelatedProducts] = useState(null);

  const { id } = useParams();

  async function getProductDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET",
      };
      const { data } = await axios.request(options);

      setProductDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getRelatedProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
        method: "GET",
      };
      const { data } = await axios.request(options);

      setRelatedProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProductDetails({ id });
  }, [id]);
  useEffect(() => {
    if (productDetails === null) return;

    getRelatedProducts();
  }, [productDetails]);

  return (
    <>
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      {productDetails ? (
        <>
          <Helmet>
            <title>{productDetails.title}</title>
          </Helmet>
          <section className="grid grid-cols-12 gap-12">
            <div className="col-span-3">
              <ReactImageGallery
                showFullscreenButton={false}
                showPlayButton={false}
                showNav={false}
                items={productDetails.images.map((image) => {
                  return {
                    original: image,
                    thumbnail: image,
                  };
                })}
              />
            </div>
            <div className="col-span-9 space-y-4">
              <header>
                <h2 className="text-2xl font-semibold text-gray-600 ">
                  {productDetails.title}
                </h2>
                <h3 className="text-primary-500 font-semibold">
                  {productDetails.category.name}
                </h3>
              </header>
              <p className="text-gray-400">{productDetails.description}</p>
              <div className="flex justify-between items-center">
                <span>{productDetails.price} L.E</span>
                <div>
                  <i className="fa-solid fa-star me-2 text-yellow-500"></i>
                  <span>{productDetails.ratingsAverage}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  addProduct({ id });
                }}
                className="btn bg-primary-500 hover:bg-primary-600 text-white uppercase font-semibold  w-full"
              >
                Add to Cart
              </button>
            </div>
          </section>
          <section>
            {relatedProducts ? (
              <>
                <h2 className="text-2xl my-8 text-gray-600">
                  Related products
                </h2>
                <Swiper
                  loop={true}
                  slidesPerView={"1"}
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
                  {relatedProducts.map((product) => {
                    return (
                      <SwiperSlide key={product.id}>
                        {<Card productInfo={product} />}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </>
            ) : (
              <Loading />
            )}
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
