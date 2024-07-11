import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/DisplayCurrency";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [data, setData] = useState([]); // State to hold cart data
  const [loading, setLoading] = useState(false); // State to manage loading state
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null); // Placeholder for loading state

  // Function to fetch cart data
  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData?.data || []);
    }
  };

  // Function to handle loading state while fetching data
  const handleLoading = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  // useEffect to fetch cart data on component mount
  useEffect(() => {
    handleLoading();
  }, []);

  // Function to increase quantity of a product in the cart
  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  // Function to decrease quantity of a product in the cart
  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  // Function to delete a product from the cart
  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
      toast.success("Product deleted successfully");
    }
  };

  // Calculate total quantity of products in the cart
  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  // Calculate total price of products in the cart
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const handlePayment = async () => {
    try {
      // Load the Stripe object using the publishable key from environment variables
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLISH_KEY
      );

      // Make an API call to your backend to initiate the payment
      const response = await fetch(SummaryApi.payment.url, {
        method: SummaryApi.payment.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cartItems: data, // Pass the cart items to your backend
        }),
      });

      // Parse the response from your backend
      const responseData = await response.json();

      if (responseData?.id) {
        // Redirect to Stripe's checkout page using the session ID
        await stripePromise.redirectToCheckout({ sessionId: responseData.id });
      }
    } catch (error) {
      // console.error("Payment Error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto lg:px-8">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-green-100 py-10 font-medium">
            No Items added to the cart
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/***view product */}
        <div className="w-full max-w-3xl mx-auto">
          {loading
            ? loadingCart?.map((el, index) => (
                <div
                  key={el + "Add To Cart Loading" + index}
                  className="w-full bg-indigo-200 h-32 my-2 border border-indigo-300 animate-pulse rounded"
                ></div>
              ))
            : data?.map((product, index) => (
                <Link
                  to={"/product/" + product?.productId?._id}
                  key={index + "Add To Cart Loading"}
                  className="w-full shadow-lg bg-white h-32 my-2 border border-indigo-300 rounded grid grid-cols-[128px,1fr] font-medium"
                >
                  <div className="w-32 h-32 bg-indigo-200 ">
                    <img
                      src={product?.productId?.productImage[0]}
                      className="w-full h-full object-scale-down mix-blend-multiply hover:scale-110 transition-all"
                      alt="product-img"
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    <h2 className="text-md lg:text-lg text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-indigo-500 font-medium">
                      {product?.productId?.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-indigo-600 text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-green-600 font-semibold text-lg">
                        {displayINRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        className="border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                        onClick={(e) => {
                          e.preventDefault();
                          decraseQty(product?._id, product?.quantity);
                        }}
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                        onClick={(e) => {
                          e.preventDefault();
                          increaseQty(product?._id, product?.quantity);
                        }}
                      >
                        +
                      </button>
                      {/* Delete product */}
                      <div
                        className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer mx-4 text-xl transition-all"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteCartProduct(product?._id);
                        }}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        {/***summary  */}

        {data[0] && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm mx-auto">
            <h2 className="text-white bg-indigo-600 px-4 py-1">Summary</h2>
            {loading ? (
              <div className="h-36 bg-indigo-200 border border-indigo-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white font-medium shadow-xl rounded-md p-2 ">
                <div className="flex items-center justify-between px-4 py-1 gap-2 text-lg text-indigo-600">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <hr />
                <div className="flex items-center justify-between px-4 py-1 gap-2 text-lg text-indigo-600">
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>

                <button
                  className="bg-indigo-600 py-1 text-white w-full text-center mt-4 rounded-xl hover:bg-indigo-700"
                  onClick={handlePayment}
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
