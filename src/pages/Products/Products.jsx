import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { Formik, useFormik } from "formik";
import { ProductsContext } from "../../contexts/Products.context";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";

export default function Products() {
  const { data, isLoading } = useContext(ProductsContext);
  const [term, setTerm] = useState("");
  const [filteredProducts, setfilteredProducts] = useState([]);

  function filteringData(word) {
    const filtered = data?.data?.filter((product) =>
      product.title.toLowerCase().includes(word)
    );
    setTerm(word);
    setfilteredProducts(filtered);
  }
  useEffect(() => {
    setfilteredProducts(data?.data);
  }, [data]);
  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Browse our wide selection of products."
        />
      </Helmet>
      <section>
        <div className="w-2/3 mx-auto mb-9">
          <input
            type="text"
            className="form-control w-full"
            placeholder="Search..."
            value={term}
            onChange={(e) => {
              filteringData(e.target.value);
            }}
          />
        </div>
        <div className="products grid grid-cols-12 gap-4">
          {filteredProducts?.map((product) => {
            return <Card productInfo={product} key={product.id} />;
          })}
        </div>
      </section>
    </>
  );
}
