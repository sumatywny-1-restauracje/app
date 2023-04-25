import FoodElement from "../foodElement/FoodElement";

const PRODUCTS = [
  {
    id: 1,
    name: "Chicken Burger",
    price: "3.50",
    rating: "5",
    numberOfRatings: 160,
    image:
      "https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    name: "Chicken Pizza",
    price: "4.20",
    rating: "5",
    numberOfRatings: 142,
    image:
      "https://images.pexels.com/photos/15126955/pexels-photo-15126955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    name: "Chicken Fry",
    price: "5.00",
    rating: "5",
    numberOfRatings: 123,
    image:
      "https://images.pexels.com/photos/10361459/pexels-photo-10361459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 4,
    name: "Grill Sandwich",
    price: "4.80",
    rating: "5",
    numberOfRatings: 112,
    image:
      "https://images.pexels.com/photos/5634630/pexels-photo-5634630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 5,
    name: "Taco Traifi",
    price: "3.63",
    rating: "5",
    numberOfRatings: 152,
    image:
      "https://images.pexels.com/photos/10839496/pexels-photo-10839496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 6,
    name: "Noddle's Ramen",
    price: "6.50",
    rating: "5",
    numberOfRatings: 163,
    image:
      "https://images.pexels.com/photos/13085835/pexels-photo-13085835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

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
        {PRODUCTS.map((product) => (
          <FoodElement key={product?.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RegularMenu;
