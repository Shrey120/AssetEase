"use client";

import { Category } from "../types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddCategoryPage from "@/components/addCategory";

const HomePage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [addCategoryPage, setAddCategoryPage] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const totalPurchaseAmount = categories.reduce(
    (sum, category) => sum + category.totalAmount,
    0
  );
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='h-full mx-auto p-4 bg-slate-900'>
      {addCategoryPage && (
        <AddCategoryPage
          setProp={setAddCategoryPage}
          prop={addCategoryPage}
          fetchCategories={fetchCategories}
        />
      )}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='elecro text-3xl font-bold text-slate-200'>AssetEase</h1>
        <button
          onClick={() => setAddCategoryPage(true)}
          className='elecro'>
          New Category
        </button>
        <div className='text-slate-200 text-xl elecro font-bold'>
          Total Purchase: ₹ {totalPurchaseAmount}
        </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => router.push(`/category/${category._id}`)}
            className='hover:shadow-lg hover:scale-105 duration-500 border rounded-2xl pb-2 bg-purple-50 bg-opacity-95'>
            <img
              src={category.imageUrl}
              alt={category.name}
              className='w-full h-80 rounded-2xl'
            />
            <div className='flex justify-between mt-2 mx-3'>
              <h2 className='julius font-extrabold uppercase'>
                {category.name}
              </h2>
              <div className='text-sm julius font-extrabold text-gray-500'>
                Total Investment : ₹ {category.totalAmount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
