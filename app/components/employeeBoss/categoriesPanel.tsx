const CategoriesPanel = ({ categories }: any) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">Categories</h1>
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <div className="flex w-full justify-end">
          <button className="w-max rounded-lg border border-gray-700 bg-rose-400 px-3 py-1 text-base text-white hover:bg-rose-500 hover:text-white">
            Add
          </button>
        </div>
        <ul className="mx-auto flex w-full flex-col gap-2">
          {categories?.map((category) => (
            <li
              key={category?.id}
              className="flex w-full items-center gap-3 rounded-lg border border-gray-700 bg-orange-100 p-1 pr-3"
            >
              <img
                src={category?.image?.src}
                alt={category?.image?.alt}
                className="aspect-square w-12 rounded-lg border-2 border-gray-700"
              />
              <span className="w-full text-xl font-bold">
                {category?.name?.charAt(0)?.toUpperCase() +
                  category?.name?.slice(1)}
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
    </div>
  );
};

export default CategoriesPanel;
