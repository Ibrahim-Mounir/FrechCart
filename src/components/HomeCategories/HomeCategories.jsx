import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
export default function HomeCategories() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    return await axios.request(options);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
    refetchOnMount: false,
    refetchInterval: 60 * 60 * 1000,
  });
  if (isLoading) return <Loading />;
  return (
    <>
      <section className="mb-8">
        <h2 className="font-semibold text-lg mb-3">Popular categories</h2>

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
          {data.data.data.map((category) => {
            return (
              <SwiperSlide key={category._id}>
                <Link to={`/categories/${category._id}`}>
                  <img
                    src={category.image}
                    alt=""
                    className="w-full h-72 object-cover"
                  />
                  <h3>{category.name}</h3>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </>
  );
}
