import React from "react";
import amazonLogo from "../../assets/images/amazon-pay.png";
import americanExLogo from "../../assets/images/american-express-color.png";
import paypalLogo from "../../assets/images/paypal.png";
import mastercardLogo from "../../assets/images/mastercard.webp";
import appleStore from "../../assets/images/get-apple-store.png";
import googleStore from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 py-8 px-6">
        <div className="container space-y-4">
          <header className="mb-5">
            <h2 className="text-xl mb-1 text-slate-800 font-semibold ">
              Get the FreshCart application
            </h2>
            <p className="text-slate-400">
              We will send you a link, open it on you phone to download
            </p>
          </header>
          <div className="flex flex-wrap justify-center items-center gap-2">
            <input
              className="form-control  grow mx-2"
              type="email"
              placeholder="Email"
            />
            <button className=" btn uppercase text-sm py-2 text-white bg-primary-500 hover:bg-primary-700 ">
              Share App Link
            </button>
          </div>

          <div className="flex gap-4 flex-wrap items-center py-4 justify-center  border-y-2 border-slate-300 border-opacity-50">
            <div>
              <h3 className="mb-1  font-semibold text-center md:text-start">
                Payment Partners
              </h3>

              <div className="flex flex-wrap  items-center justify-center gap-3 ">
                <img src={amazonLogo} alt="amazon logo" className="w-24" />

                <img
                  src={americanExLogo}
                  alt="american express logo"
                  className="w-24"
                />

                <img src={paypalLogo} alt="paypal logo" className="w-24" />

                <img src={mastercardLogo} alt="paypal logo" className="w-20" />
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-center md:text-start">
                Get deliveries with FreshCart
              </h3>

              <div className="flex flex-wrap justify-center items-center gap-3 ">
                <img
                  src={googleStore}
                  alt="google store logo"
                  className="w-[110px]"
                />

                <img src={appleStore} alt="apple store logo" className="w-24" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
