import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/DisplayCurrency";

const OrderPage = () => {
  const [data, setData] = useState([]);

  // Function to fetch order details from the API
  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
    });

    const responseData = await response.json();

    setData(responseData.data || []); // Ensure data is an array
    // console.log("order list", responseData);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="my-8">
      {data.length === 0 && (
        <p className="mx-auto text-center text-lg font-medium bg-indigo-200 py-8 mt-10">
          No Order available
        </p>
      )}

      <div className="w-full">
        {data?.map((item, index) => {
          return (
            <div key={item.userId + index} className="m-4 p-6">
              <p className="font-medium text-lg py-2">
                {moment(item.createdAt).format("LL")}
              </p>
              <div className="border rounded p-2">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                  <div className="grid gap-1">
                    {item?.productDetails?.map((product, index) => {
                      return (
                        <Link
                          to={"/product/" + product?.productId}
                          key={product?.productId + index}
                          className="flex gap-3 bg-indigo-100 p-2 overflow-hidden"
                        >
                          <img
                            src={product?.image[0] || ""}
                            className="w-28 h-28 bg-indigo-200 object-scale-down p-2 mix-blend-multiply"
                            alt={product?.name}
                          />
                          <div>
                            <div className="font-medium text-lg text-ellipsis line-clamp-1">
                              {product?.name}
                            </div>
                            <div className="flex items-center gap-5 mt-1">
                              <div className="text-lg text-indigo-500">
                                {displayINRCurrency(product?.price)}
                              </div>
                              <p>Quantity: {product?.quantity}</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                    <div>
                      <div className="text-lg font-medium">
                        Payment Details:
                      </div>
                      <p className="ml-1">
                        Payment method:{" "}
                        {item.paymentDetails?.payment_method_type?.[0] || "N/A"}
                      </p>
                      <p className="ml-1">
                        Payment Status:{" "}
                        {item.paymentDetails?.payment_status || "N/A"}
                      </p>
                    </div>
                    <div>
                      <div className="text-lg font-medium">
                        Shipping Details:
                      </div>
                      {item.shipping_options?.map((shipping, index) => {
                        return (
                          <div
                            key={shipping.shipping_rate + index}
                            className="ml-1"
                          >
                            Shipping Amount: {shipping.shipping_amount}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="font-bold ml-auto w-fit lg:text-lg md:px-20 mx-2 text-green-600">
                  Total Amount: {displayINRCurrency(item.totalAmount)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
