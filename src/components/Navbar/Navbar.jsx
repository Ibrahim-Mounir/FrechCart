import React, { useContext, useEffect, useState } from "react";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/User.context";
import { CartContext } from "../../contexts/Cart.context";

export default function Navbar() {
  const { token, logout } = useContext(UserContext);
  const { cartInfo, getCartProducts } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <>
      <nav className="bg-slate-100 shadow py-3 fixed top-0 left-0 right-0 z-50">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <img src={freshCartLogo} alt="shopping cart" className="w-full" />
          </Link>
          <button
            className="lg:hidden text-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i
              className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}
            ></i>
          </button>
          <div
            className={`flex-col ${
              token && "mx-auto"
            } justify-between lg:flex-row gap-5 lg:gap-7 items-center lg:flex lg:static ${
              isMenuOpen
                ? "flex absolute top-[55px] left-0 border-t  border-gray-300 lg:border-none right-0 bg-slate-100 py-5 lg:py-0"
                : "hidden"
            }`}
          >
            {token && (
              <ul className="flex flex-col lg:flex-row  gap-5 items-center">
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:h-0.5 hover:before:w-full before:w-0 before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 before:bg-primary-500 before:absolute ${
                        isActive && "font-semibold before:!w-full"
                      }`
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:h-0.5 hover:before:w-full before:w-0 before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 before:bg-primary-500 before:absolute ${
                        isActive && "font-semibold before:!w-full"
                      }`
                    }
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:h-0.5 hover:before:w-full before:w-0 before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 before:bg-primary-500 before:absolute ${
                        isActive && "font-semibold before:!w-full"
                      }`
                    }
                    to="/wishlist"
                  >
                    Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:h-0.5 hover:before:w-full before:w-0 before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 before:bg-primary-500 before:absolute ${
                        isActive && "font-semibold before:!w-full"
                      }`
                    }
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:h-0.5 hover:before:w-full before:w-0 before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 before:bg-primary-500 before:absolute ${
                        isActive && "font-semibold before:!w-full"
                      }`
                    }
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative before:h-0.5 hover:before:w-full before:w-0 before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 before:bg-primary-500 before:absolute ${
                        isActive && "font-semibold before:!w-full"
                      }`
                    }
                    to="/allorders"
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
            )}
            <Link className=" relative cursor-pointer" to={"/cart"}>
              <i className="fa-solid fa-cart-shopping text-lg "></i>
              <span className="h-5 w-5 flex items-center justify-center bg-primary-500 absolute top-0 left-0 text-white rounded-full  translate-x-1/2 -translate-y-1/2">
                {cartInfo == null ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  cartInfo.numOfCartItems
                )}
              </span>
            </Link>
            <ul className="flex flex-row gap-5 items-center justify-center lg:ms-auto">
              <li>
                <a href="https://facebook.com" target="_blank">
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row gap-5 justify-center items-center">
              {!token && (
                <>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        `relative before:h-0.5  hover:before:w-full before:w-0 before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 before:bg-primary-500 before:absolute ${
                          isActive && "font-semibold before:!w-full"
                        }`
                      }
                      to="/auth/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        `relative before:h-0.5 hover:before:w-full before:w-0 before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 before:bg-primary-500 before:absolute ${
                          isActive && "font-semibold before:!w-full"
                        }`
                      }
                      to="/auth/signup"
                    >
                      Sign up
                    </NavLink>
                  </li>
                </>
              )}
              {token && (
                <li>
                  <NavLink onClick={logout} to="/">
                    <i className="fa-solid fa-right-from-bracket text-lg"></i>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
