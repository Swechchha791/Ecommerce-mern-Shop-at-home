import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import VerticalCard from "../Components/VerticalCard";
import productCategory from "../helpers/productCategory";

const CategoryProduct = () => {
  const { categoryName } = useParams(); // Extract category name from URL
  const [data, setData] = useState([]); // State to hold product data
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [selectCategory, setSelectCategory] = useState({
    [categoryName]: true,
  }); // State to manage selected categories
  const [filterCategoryList, setFilterCategoryList] = useState([categoryName]); // State to manage filtered categories
  const [sortBy, setSortBy] = useState(""); // State to manage sort order
  const navigate = useNavigate(); // Hook for navigation

  // Function to fetch products based on selected categories
  const fetchData = async () => {
    setLoading(true); // Set loading state to true
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataResponse = await response.json();
      setData(dataResponse?.data || []); // Update product data state
    } catch (error) {
      console.error("Fetching products failed:", error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Handle category selection changes
  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  // Fetch products whenever the filter category list changes
  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  // Update filter category list and URL whenever the selected categories change
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(
      (categoryKeyName) => selectCategory[categoryKeyName]
    );

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el) => `category=${el}`).join("&");
    navigate("/product-category/" + encodeURIComponent(arrayOfCategory[0]));
  }, [selectCategory]);

  // Handle sorting changes
  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    setData((prev) => {
      const sortedData = [...prev];
      if (value === "asc") {
        sortedData.sort((a, b) => a.sellingPrice - b.sellingPrice);
      } else if (value === "dsc") {
        sortedData.sort((a, b) => b.sellingPrice - a.sellingPrice);
      }
      return sortedData;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none max-h-[calc(100vh-120px)] shadow-lg rounded">
          <div className="">
            <h3 className="text-base uppercase font-medium text-indigo-600 border-b pb-1 border-indigo-400">
              Sort by
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value="asc"
                />
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value="dsc"
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          <div className="">
            <h3 className="text-base uppercase font-medium text-indigo-600 border-b pb-1 border-indigo-400">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectCategory[categoryName.value] || false}
                    value={categoryName.value}
                    id={categoryName.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName.value}>
                    {categoryName.label}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>

        <div className="px-4">
          <p className="font-medium text-indigo-700 text-lg my-2">
            Search Results: {data.length}
          </p>

          <div className="min-h-[calc(100vh-120px)] overflow-y-auto scrollbar-none max-h-[calc(100vh-120px)] mx-4">
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
