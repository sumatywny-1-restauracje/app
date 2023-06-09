import { useState } from "react";

const MenuPanel = ({ products, categories }: any) => {
  const [currentCategory, setCurrentCategory] = useState(
    products?.[0]?.category
  );

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">Menu</h1>
      <div className="flex w-full justify-end gap-4">
        <select
          className="w-max rounded-lg border border-rose-400 bg-inherit px-3 py-1 text-base text-rose-400 focus:border-rose-400 focus:ring-0"
          defaultValue={currentCategory || "Category"}
          onChange={(e) => setCurrentCategory(e.target.value)}
        >
          {categories?.map((category) => (
            <option
              key={category?.id}
              value={category?.name?.toLowerCase()}
              className="bg-orange-100"
            >
              {category?.name?.charAt(0)?.toUpperCase() +
                category?.name?.slice(1)}
            </option>
          ))}
        </select>
        <button className="w-max rounded-lg border border-gray-700 bg-rose-400 px-3 py-1 text-base text-white hover:bg-rose-500 hover:text-white">
          Add
        </button>
      </div>
      <ul className="mx-auto flex w-full flex-col  gap-2">
        {products
          ?.filter((product) => product?.category === currentCategory)
          ?.map((product) => (
            <li
              key={product?.id}
              className="flex w-full items-center gap-3 rounded-lg border border-gray-700 bg-orange-100 p-1 pr-3"
            >
              <img
                src={product?.image}
                alt={product?.name}
                className="aspect-square w-12 rounded-lg border-2 border-gray-700"
              />
              <span className="w-full text-xl font-bold">
                {product?.name?.charAt(0)?.toUpperCase() +
                  product?.name?.slice(1)}
              </span>
              <div className="flex w-max items-center justify-end gap-4">
                <button className="w-max rounded-lg border border-rose-400 px-3 py-1 text-base text-rose-400 hover:bg-rose-500 hover:text-white">
                  Edit
                </button>
                <button className="w-max rounded-lg border border-rose-400 px-3 py-1 text-base text-rose-400 hover:bg-rose-500 hover:text-white">
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MenuPanel;
