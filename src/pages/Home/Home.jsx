import Card from "../../components/Card/Card";

import Loading from "../../components/Loading/Loading";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import HomeCategories from "../../components/HomeCategories/HomeCategories";

import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/Products.context";

export default function Home() {
  const { isLoading, data } = useContext(ProductsContext);

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="The home page of FreshCart where you can find variaties of products"
        />
      </Helmet>
      <HomeSlider></HomeSlider>
      <HomeCategories />
      <div className="grid grid-cols-12 gap-4">
        {data?.data?.map((product) => {
          return <Card productInfo={product} key={product.id} />;
        })}
      </div>
    </>
  );
}
