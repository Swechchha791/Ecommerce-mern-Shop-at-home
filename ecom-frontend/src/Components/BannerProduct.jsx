import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/large_screen-img1.jpg";
import image2 from "../assest/banner/large-screen-img2.jpg";
import image3 from "../assest/banner/img2.webp";
import image4 from "../assest/banner/img3.jpg";
import image5 from "../assest/banner/large-screen-img3.jpg";

import image1Mobile from "../assest/banner/Mobile-img1.jpg";
import image2Mobile from "../assest/banner/mobile-img2.jpg";
import image3Mobile from "../assest/banner/mobile-img3.jpg";
import image4Mobile from "../assest/banner/img3_mobile.jpg";
import image5Mobile from "../assest/banner/img2_mobile.jpg";
import image6Mobile from "../assest/banner/img5_mobile.png";

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
    image6Mobile,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  };

  const preveImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded-md my-6">
      <div className="h-56 md:h-72 w-full bg-indigo-200 relative">
        {/* Banner slider Arrows */}
        <div className="absolute z-10 h-full w-full flex items-center">
          <div className=" flex justify-between w-full text-2xl">
            <button
              onClick={preveImage}
              className="bg-white shadow-md rounded-full p-2"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-2"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* For Desktop and tab version */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((imageURl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURl} className="w-full h-full" alt="banner" />
              </div>
            );
          })}
        </div>

        {/* For Mobile version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((imageURl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={imageURl}
                  className="w-full h-full object-cover"
                  alt="banner"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
