import React, { useContext, useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/DisplayCurrency";
// import Context from "../context";
// import addToCart from "../helpers/addToCart";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  // const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  // const { fetchUserAddToCart } = useContext(Context);

  // Function to implement Add to Cart functionality
  // const handleAddToCart = async (e, id) => {
  //   await addToCart(e, id);
  //   fetchUserAddToCart();
  // };

  // Function to fetch product data
  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    // console.log("vertical data", categoryProduct.data);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Implemented the Scrolling functionality
  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {/* Will reflect the Skellton onLoading the product first or if can't load the product  */}
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div
                  className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow"
                  key={index}
                >
                  <div className="bg-indigo-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-indigo-200"></h2>
                    <p className="capitalize text-indigo-500 p-1 animate-pulse rounded-full bg-indigo-200  py-2"></p>
                    <div className="flex gap-3">
                      <p className="text-indigo-600 font-medium p-1 animate-pulse rounded-full bg-indigo-200 w-full  py-2"></p>
                      <p className="text-indigo-500 line-through p-1 animate-pulse rounded-full bg-indigo-200 w-full  py-2"></p>
                    </div>
                    <button className="text-sm  text-white px-3  rounded-full bg-indigo-200  py-2 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              // Rendering the peoducts
              return (
                <Link
                  to={"product/" + product?._id}
                  className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                  key={index}
                >
                  <div className="bg-indigo-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                    <img
                      src={product?.productImage[0]}
                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                      alt={product?.productName}
                    />
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-indigo-500">
                      {product?.category}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-indigo-600 font-medium">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-indigo-500 line-through">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      className="text-md bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-0.5 rounded-full"
                      // onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
