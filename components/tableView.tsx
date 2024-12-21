"use client";

import { useState } from "react";
import { Item } from "@/types";

export default function TableView({ items }: { items: Item[] }) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [itemsList, setItemsList] = useState(items);
  const sortItems = (order: "asc" | "desc") => {
    const sortedItems = items.sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setItemsList(sortedItems);
    setSortOrder(order);
  };

  return (
    <div className='overflow-x-auto bg-slate-950 bg-opacity-80'>
      <table className='w-full table-auto border-collapse border border-gray-700'>
        <thead>
          <tr className='bg-gray-800'>
            <th className='julius  font-bold text-2xl border border-gray-700 px-4 py-2 text-center'>
              Image
            </th>
            <th className='julius  font-bold text-2xl border border-gray-700 px-4 py-2 text-center'>
              Name
            </th>
            <th className='julius  font-bold text-2xl border border-gray-700 px-4 py-2 text-center flex justify-around items-center'>
              <div
                className='cursor-pointer'
                onClick={() => sortItems(sortOrder === "asc" ? "desc" : "asc")}>
                Price
              </div>
            </th>
            <th className='julius  font-bold text-2xl border border-gray-700 px-4 py-2 text-center'>
              Purchase URL
            </th>
          </tr>
        </thead>
        <tbody>
          {itemsList &&
            itemsList.map((item) => (
              <tr
                key={item._id}
                className='hover:bg-gray-700'>
                <td className='border border-gray-700 p-2 flex justify-center '>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className='rounded-full size-20'
                  />
                </td>
                <td className='lato text-lg border border-gray-700 px-4 py-2 text-center'>
                  {item.name}
                </td>
                <td className='lato text-lg border border-gray-700 px-4 py-2 text-center'>
                  ${item.price}
                </td>
                <td className='lato text-lg border border-gray-700 px-4 py-2 text-center'>
                  <a href={item.purchaseUrl}>
                    {item.purchaseUrl.slice(0, 20)}...
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
