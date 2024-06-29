import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import AdminEditProductCard from "./AdminEditProductCard";
import displayINRCurrency from "../helpers/DisplayCurrency";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <div className="w-40 items-center mx-auto">
        <div className="w-32 h-32 flex items-center justify-center">
          <img
            src={data?.productImage[0]}
            alt={data?.productName}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-1 mt-2">{data?.productName}</h1>

        <div>
          <p className="font-semibold bg-indigo-100 rounded w-fit py-1 px-2 my-2">
            {/* {data?.sellingPrice} */}
            {displayINRCurrency(data?.sellingPrice)}
          </p>

          <div
            className="w-fit ml-auto p-2 cursor-pointer text-indigo-600 hover:text-indigo-800"
            onClick={() => setEditProduct(true)}
          >
            <FaEdit />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProductCard
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
