import { useContext } from "react";
import { CartContext } from "../../contexts/Cart.context";
import { Link } from "react-router-dom";

export default function CartItem({ productInfo }) {
  const { price, product, count } = productInfo;
  const { imageCover, title, category, id } = product;
  const { removeProductFromCart, updateCartQuantity } = useContext(CartContext);

  return (
    <div className="flex gap-2">
      <div className="bg-gray-100 gap-5 py-4 px-4 grow flex justify-between items-center rounded-lg">
        <div className="header  flex items-center gap-5">
          <img
            className="w-24 rounded-full h-24 object-cover border-white border-4"
            alt=""
            src={imageCover}
          />
          <h3 className="text-gray-700 font-semibold ">
            <Link to={`/product/${id}`}> {title}</Link>
          </h3>
        </div>
        <h4 className="text-gray-500   font-semibold">{category.name}</h4>
        <div className="counter flex justify-center items-center gap-3">
          <span className="text-gray-600 font-bold text-lg">{count}</span>
          <div className="text-gray-700 space-y-2">
            <div
              onClick={() => {
                updateCartQuantity({ productId: id, count: count + 1 });
              }}
              className="plus cursor-pointer"
            >
              <i className="fa-solid fa-plus-circle"></i>
            </div>
            <div
              onClick={() => {
                updateCartQuantity({ productId: id, count: count - 1 });
              }}
              className="minus cursor-pointer"
            >
              <i className="fa-solid fa-minus-circle"></i>
            </div>
          </div>
        </div>
        <span>{price} L.E</span>
      </div>
      <button
        onClick={() => {
          removeProductFromCart({ productId: id });
        }}
        className="hover:bg-gray-200 duration-300 transition-colors bg-gray-100  rounded-md p-3 text-center"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}
