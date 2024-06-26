import React, { useState, useEffect } from "react";
import UploadProduct from "../Components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "./AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const responseData = await response.json();

    console.log("product data", responseData);

    setAllProduct(responseData?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg text-indigo-600">All Product</h2>
        <button
          className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      <div className="flex items-center justify-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {/* All Products */}
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allproduct"}
              fetchdata={fetchAllProduct}
            />
          );
        })}
      </div>

      {/* Upload product */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
