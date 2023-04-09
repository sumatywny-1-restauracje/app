import FoodElement from "../foodElement/FoodElement";

const RegularMenu = () => {
  return (
    <div className="flex w-5/6 flex-col gap-10 px-1 font-sans text-gray-700 md:w-4/6 md:gap-12">
      <div className="flex flex-col gap-7">
        <h2 className="w-full bg-clip-text text-3xl font-extrabold max-md:text-center sm:text-4xl md:text-5xl">
          Our <span className="text-rose-400">Regular</span> Menu
        </h2>
        <div className="flex flex-col flex-wrap items-center justify-around max-md:gap-6 sm:flex-row md:justify-between">
          <span className="w-7/12 text-xs text-gray-500 max-sm:text-center sm:w-1/4 md:text-sm">
            These Are Our Regular Menus. You Can Order Anything You Like.
          </span>
          <button className="rounded-2xl bg-rose-400 px-7 py-2 text-white hover:bg-rose-500">
            See All
          </button>
        </div>
      </div>
      <div className="mx-auto flex w-full flex-wrap content-center gap-12 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        <FoodElement />
        <FoodElement />
        <FoodElement />
        <FoodElement />
        <FoodElement />
        <FoodElement />
      </div>
    </div>
  );
};

export default RegularMenu;
