import { Rating } from "flowbite-react";

const FoodElement = () => {
  return (
    <div className="md: relative mx-auto flex h-[17rem] w-52 items-end justify-start sm:h-72 sm:w-52 md:h-80 md:w-60 lg:h-[22rem] lg:w-60 xl:h-[23rem] xl:w-64">
      <div
        style={{ fontSize: "15rem", borderWidth: "12px" }}
        className="absolute right-0 top-0 overflow-hidden rounded-full border-rose-400"
      >
        <img
          src="https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Chicken Burger"
          className="h-32 w-32 object-fill md:h-44 md:w-44 xl:h-52 xl:w-52"
        />
      </div>
      <div className="flex h-52 w-44 items-end rounded-2xl bg-orange-100 px-5 text-lg text-gray-700 sm:h-48 sm:w-44 md:h-60 md:w-48 xl:h-80 xl:w-56">
        <div className="flex w-full flex-col gap-4 pb-5">
          <div>
            <h4 className="text-md font-extrabold md:text-lg xl:text-xl">
              Chicken Burger
            </h4>
            <Rating className="mt-1">
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <p className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400 lg:text-sm">
                (160)
              </p>
            </Rating>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">$3.50</span>
            <button className="rounded-2xl bg-rose-400 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-500 lg:px-3 xl:text-base xl:font-semibold">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodElement;
