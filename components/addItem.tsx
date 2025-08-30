import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const AddItemPage = ({
  setProp,
  prop,
  fetchItems,
  categoryId,
}: {
  setProp: (value: boolean) => void;
  prop: boolean;
  fetchItems: () => void;
  categoryId: string;
}) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [purchaseUrl, setPurchaseUrl] = useState("");
  const [status, setStatus] = useState("to buy");
  const [loading, setLoading] = useState(false); // 🔹 loader state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // start loader
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        body: JSON.stringify({
          name,
          imageUrl,
          price,
          purchaseUrl,
          categoryId,
          status,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setProp(false);
        fetchItems();
      }
    } finally {
      setLoading(false); // stop loader
    }
  };

  return prop ? (
    <div>
      <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70'>
        <div className='text-black relative bg-gradient-to-br from-purple-100 via-purple-50 to-green-100 p-6 rounded-lg shadow-lg w-96'>
          <h2 className='text-xl font-semibold mb-5 text-center'>Add Item</h2>
          <div
            className='absolute top-7 right-7 cursor-pointer hover:text-red-600 hover:scale-110'
            onClick={() => setProp(false)}>
            <IoMdClose className='size-6' />
          </div>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='block mb-2'>Item Name</label>
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
            <div className='mb-7'>
              <label className='block mb-2'>Price</label>
              <input
                type='number'
                value={price || ""}
                onChange={(e) =>
                  setPrice(
                    e.target.value === "" ? 0 : parseFloat(e.target.value)
                  )
                }
                className='border rounded-xl p-2 w-full'
                required
              />
            </div>
            <div className='mb-7'>
              <label className='block mb-2'>Purchase URL</label>
              <input
                type='url'
                value={purchaseUrl}
                onChange={(e) => setPurchaseUrl(e.target.value)}
                className='border rounded-xl p-2 w-full'
                required
              />
            </div>
            <div className='mb-7'>
              <label className='block mb-2'>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className='border rounded-xl p-2 w-full'>
                <option value="to buy">To Buy</option>
                <option value="bought">Bought</option>
              </select>
            </div>
            <button
              type='submit'
              disabled={loading} // disable while loading
              className={`invert w-full flex justify-center items-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
              {loading ? (
                <div className="w-5 h-5 border-2 border-t-2 border-gray-900 rounded-full animate-spin"></div>
              ) : (
                "Add Item"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddItemPage;
