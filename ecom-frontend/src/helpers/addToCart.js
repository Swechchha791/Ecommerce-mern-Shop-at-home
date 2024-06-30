import SummaryApi from "../common";
import { toast } from "react-toastify";

// Prevents to add the products by default
const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  // Function to fetch the product Details
  const response = await fetch(SummaryApi.addToCartProduct.url, {
    method: SummaryApi.addToCartProduct.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

  const responseData = await response.json();

  if (responseData.success) {
    toast.success(responseData.message);
  }

  if (responseData.error) {
    toast.error(responseData.message);
  }

  return responseData;
};

export default addToCart;
