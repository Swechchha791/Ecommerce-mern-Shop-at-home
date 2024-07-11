import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/ForgotPassword";
import Signup from "../Pages/Signup";
import AdminPanel from "../Pages/AdminPanel";
import AllProducts from "../Pages/AllProducts";
import AllUsers from "../Pages/AllUsers";
import CategoryProduct from "../Pages/CategoryProduct";
import ProductDetails from "../Pages/ProductDetails";
import SearchProduct from "../Pages/SearchProduct";
import Success from "../Pages/Success";
import Cancel from "../Pages/Cancel";
import OrderPage from "../Pages/OrderPage";
import Cart from "../Pages/Cart";
import AllOrder from "../Pages/AllOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/product-category/:categoryName",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "all-orders",
            element: <AllOrder />,
          },
        ],
      },
    ],
  },
]);

export default router;
