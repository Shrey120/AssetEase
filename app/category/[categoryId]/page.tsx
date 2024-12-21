"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TableView from "@/components/tableView";
import GridView from "@/components/gridView";
import AddItemPage from "@/components/addItem";
import { CiBoxList } from "react-icons/ci";
import { FaTable } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { Item } from "@/types";

const CategoryPage = () => {
  const { categoryId } = useParams() as { categoryId: string };
  const [items, setItems] = useState<Item[]>([]);
  const [tableView, setTableView] = useState(false);
  const [addItemPage, setAddItemPage] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await fetch(`/api/items/${categoryId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setItems(data.items);
      } else {
        throw new Error("Failed to fetch items");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className='min-h-screen bg-slate-900 text-purple-100 p-6'>
      {addItemPage && (
        <AddItemPage
          setProp={setAddItemPage}
          prop={addItemPage}
          fetchItems={fetchItems}
          categoryId={categoryId}
        />
      )}
      <h1 className='elecro text-5xl font-bold mb-10 text-center'>All Items</h1>
      <div className='absolute top-6 left-6  space-x-4 '>
        <button
          onClick={() => setTableView(false)}
          className={`${
            !tableView ? "bg-purple-600" : "bg-purple-400"
          } p-2 rounded-full text-2xl`}>
          <CiBoxList />
        </button>
        <button
          onClick={() => setTableView(true)}
          className={`${
            tableView ? "bg-purple-600" : "bg-purple-400"
          } p-2 rounded-full text-2xl`}>
          <FaTable />
        </button>
      </div>
      <div className='absolute top-6 right-6  space-x-4 '>
        {/* Add Items */}
        <button
          onClick={() => setAddItemPage(true)}
          className='bg-purple-600
          p-2 rounded-full text-2xl'>
          <IoIosAddCircle />
        </button>
      </div>

      {tableView ? <TableView items={items} /> : <GridView items={items} />}
    </div>
  );
};

export default CategoryPage;
