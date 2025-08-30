"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

const AddCategoryPage = ({
  setProp,
  prop,
  fetchCategories,
}: {
  setProp: (value: boolean) => void;
  prop: boolean;
  fetchCategories: () => void;
}) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false); // 🔹 loader state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // start loader
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({ name, imageUrl }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        fetchCategories();
        setProp(false);
        router.push("/"); 
      }
    } finally {
      setLoading(false); // stop loader
    }
  };

  if (prop) {
    return (
      <div>
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70'>
          <div className='relative bg-gradient-to-br from-purple-100 via-purple-50 to-green-100 p-6 rounded-lg shadow-lg w-96'>
            <h2 className='text-xl font-semibold mb-5 text-center'>
              Add Category
            </h2>
            <div
              className='absolute top-7 right-7 cursor-pointer hover:text-red-600 hover:scale-110'
              onClick={() => setProp(false)}>
              <IoMdClose className='size-6' />
            </div>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label className='block mb-2'>Category Name</label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='border rounded-xl p-2 w-full'
                  required
                />
              </div>
              <div className='mb-7'>
                <label className='block mb-2'>Image URL</label>
                <input
                  type='url'
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className='border rounded-xl p-2 w-full'
                  required
                />
              </div>
              <button
                type='submit'
                disabled={loading} // disable button during load
                className={`invert w-full flex justify-center items-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
                {loading ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-gray-900 rounded-full animate-spin"></div>
                ) : (
                  "Add Category"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default AddCategoryPage;
