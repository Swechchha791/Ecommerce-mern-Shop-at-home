import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null); // Array to create loading placeholders

  // Function to fetch category products from API
  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data); // Update category products state
  };

  // useEffect to fetch category products on component mount
  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none mt-4">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-indigo-200 animate-pulse"
                  key={"categoryLoading" + index}
                ></div>
              );
            })
          : categoryProduct.map((product) => {
              return (
                <Link
                  to={`/product-category/${encodeURIComponent(
                    product?.category
                  )}`} // Updated to use dynamic segment
                  // to={"/product-category?category=" + product?.category}
                  className="cursor-pointer"
                  key={product?.category}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-white flex items-center justify-center shadow-xl">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.category}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize font-medium">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
