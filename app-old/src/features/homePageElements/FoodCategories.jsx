import HamburgerPath from "../../assets/hamburger.png";
import ChickenPizzaPath from "../../assets/pizza-slice.png";
import FrenchFriesPath from "../../assets/french-fries.png";

const FoodCategories = () => {
  return (
    <div className="flex w-4/6 flex-col gap-10 px-1 font-sans text-gray-700 md:gap-12">
      <div className="flex flex-col flex-wrap items-center justify-around max-md:gap-6 sm:flex-row md:justify-between">
        <h2 className="w-7/12 bg-clip-text text-3xl font-extrabold max-sm:text-center sm:w-1/2 sm:text-4xl md:text-5xl">
          Best <span className="text-rose-400">Delivered</span> Categories
        </h2>
        <span className="w-7/12 text-xs text-gray-500 max-sm:text-center sm:w-1/4 md:text-sm">
          Here Are Some Of The Best Distributed Categories. If You Want You Can
          Order From Here.
        </span>
      </div>
      <div className="flex flex-wrap justify-around gap-8 xl:gap-16">
        <div className="flex flex-col items-center">
          <img
            src={HamburgerPath}
            alt="hamburger"
            className="w-20 sm:w-24 md:w-28 lg:w-44 xl:w-52"
          />
          <span className="mb-1 mt-3 text-base font-bold md:text-xl">
            Chicken Burger
          </span>
          <button className="text-sm font-semibold text-rose-400 hover:text-rose-500 md:text-lg">
            Order Now &gt;
          </button>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={ChickenPizzaPath}
            alt="hamburger"
            className="w-20 sm:w-24 md:w-28 lg:w-44 xl:w-52"
          />
          <span className="mb-1 mt-3 text-base font-bold md:text-xl">
            Chicken Pizza
          </span>
          <button className="text-sm font-semibold text-rose-400 hover:text-rose-500 md:text-lg">
            Order Now &gt;
          </button>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={FrenchFriesPath}
            alt="french fries"
            className="w-20 sm:w-24 md:w-28 lg:w-44 xl:w-52"
          />
          <span className="mb-1 mt-3 text-base font-bold md:text-xl">
            French Fries
          </span>
          <button className="text-sm font-semibold text-rose-400 hover:text-rose-500 md:text-lg">
            Order Now &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCategories;
