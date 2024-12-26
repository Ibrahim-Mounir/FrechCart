import React from "react";
import image1 from "../../assets/images/slider-image-1.jpeg";
import image2 from "../../assets/images/slider-image-2.jpeg";
import image3 from "../../assets/images/slider-image-3.jpeg";
export default function HomeSlider() {
  return (
    <div className="grid gap-4 md:gap-0 grid-cols-12 mb-6">
      <div className="col-span-12 md:col-span-8">
        <swiper-container
          loop="true"
          className="h-full"
          style={{ height: "100%" }}
        >
          <swiper-slide className>
            <img src={image1} alt="" className="w-full h-full object-cover" />
          </swiper-slide>
          <swiper-slide>
            <img src={image2} alt="" className="w-full h-full object-cover" />
          </swiper-slide>
          <swiper-slide>
            <img src={image3} alt="" className="w-full h-full object-cover" />
          </swiper-slide>
        </swiper-container>
      </div>
      <div className="col-span-12 space-y-4 md:space-y-0 md:col-span-4 h-full">
        <div className="h-1/2">
          <img src={image2} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="h-1/2">
          <img src={image3} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
