import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import displayINRCurrency from "../helpers/DisplayCurrency";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
    });

    const responseData = await response.json();

    setData(responseData.data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div>
      {!data[0] && (
        <p className="mx-auto text-center text-lg font-medium bg-indigo-200 py-8 mt-10">
          No Order available
        </p>
      )}

      <div className="p-4 w-full my-6">
        {data.map((item, index) => (
          <div key={item.userId + index}>
            <p className="font-medium text-lg">
              {moment(item.createdAt).format("LL")}
            </p>
            <div className="border rounded bg-white p-4 shadow-lg">
              <div className="flex flex-col lg:flex-row justify-between items-center">
                <div className="grid gap-1">
                  {item?.productDetails.map((product, index) => (
                    <Link
                      to={"/product/" + product?.productId}
                      key={product.productId + index}
                      className="flex bg-indigo-100 py-2 px-4 mb-4 overflow-hidden"
                      style={{ maxWidth: "100%" }}
                    >
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-28 h-28 bg-indigo-200 object-scale-down p-2"
                      />
                      <div className="flex flex-col justify-center">
                        <div className="font-medium text-lg line-clamp-1">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-5 mt-1">
                          <div className="text-lg text-indigo-500">
                            {displayINRCurrency(product.price)}
                          </div>
                          <p>Quantity: {product.quantity}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                  <div>
                    <div className="text-lg font-medium">Payment Details:</div>
                    <p className="ml-1">
                      Payment method:{" "}
                      {item.paymentDetails.payment_method_type[0]}
                    </p>
                    <p className="ml-1">
                      Payment Status: {item.paymentDetails.payment_status}
                    </p>
                  </div>
                  <div>
                    <div className="text-lg font-medium">Shipping Details:</div>
                    {item.shipping_options.map((shipping, index) => (
                      <div key={shipping.shipping_rate} className="ml-1">
                        Shipping Amount: {shipping.shipping_amount}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="font-bold ml-auto w-fit lg:text-lg px-2 text-green-600">
                Total Amount: {item.totalAmount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
