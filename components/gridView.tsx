"use client";

import { Item } from "@/types";

export default function GridView({ items }: { items: Item[] }) {
  return (
    <div className='min-h-screen  bg-slate-950 shadow-2xl border-s-2  text-white p-6 rounded-xl'>
      <div className='space-y-4 grid grid-cols-3'>
        {items &&
          items.map((item) => (
            <div
              key={item._id}
              className='flex items-center bg-gradient-to-br from-slate-900 via-slate-950 to-black p-1 rounded-lg shadow hover:bg-gray-700 transition'>
              <div className='flex-shrink-0'>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className='rounded size-60 border-l-2 border-t-2 '
                />
              </div>
              <div className='ml-4 space-y-5'>
                <h2 className='text-purple-200 julius text-2xl font-semibold'>
                  {item.name}
                </h2>
                <p className='text-purple-200 text-base'>
                  Date: {item.date.slice(0, 10)}
                </p>
                <p className='text-green-200  text-lg'>Price: ₹ {item.price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
