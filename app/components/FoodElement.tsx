import type { Product, User } from "types";
import { useContext } from "react";
import { Rating } from "flowbite-react";
import { BasketContext, UserContext } from "~/root";
import { updateBasket } from "~/utils/updateBasket";

type FoodElementProps = {
  product: Product;
};

const FoodElement = ({ product }: FoodElementProps) => {
  const user = useContext(UserContext) as User;
  const basketData = useContext(BasketContext);

  const item = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: {
      src: product.image,
      alt: product.name,
    },
    quantity:
      basketData.basket.find((item) => item.id === product.id)?.quantity ?? 0,
  };

  return (
    <div className="relative mx-auto flex h-[18.5rem] w-44 items-end justify-start sm:h-[18.5rem] sm:w-52 md:h-80 md:w-60 lg:h-[20rem] lg:w-60 xl:h-[23rem] xl:w-64">
      <div className="absolute right-0 top-0 overflow-hidden rounded-full border-[12px] border-rose-400 text-[15rem] max-sm:w-full">
        <img
          src={product?.image}
          alt={product?.name}
          className="h-[152px] w-[152px] object-fill sm:h-[10rem] sm:w-[10rem] md:h-44 md:w-44 xl:h-52 xl:w-52"
        />
      </div>
      <div className="flex h-52 w-44 items-end rounded-2xl bg-orange-100 px-5 text-lg text-gray-700 sm:h-48 sm:w-44 md:h-60 md:w-48 xl:h-80 xl:w-56">
        <div className="flex w-full flex-col gap-4 pb-5">
          <div>
            <h4 className="text-base font-extrabold md:text-lg xl:text-xl">
              {product?.name}
            </h4>
            <Rating className="mt-1">
              <Rating.Star filled={product.rating > 0 && true} />
              <Rating.Star filled={product.rating > 1 && true} />
              <Rating.Star filled={product.rating > 2 && true} />
              <Rating.Star filled={product.rating > 3 && true} />
              <Rating.Star filled={product.rating > 4 && true} />
              <p className="ml-2 text-xs font-medium text-gray-500 lg:text-sm">
                ({product?.numberOfRatings})
              </p>
            </Rating>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">${product?.price}</span>
            <button
              className="rounded-2xl bg-rose-400 px-4 py-1 text-xs font-semibold text-white hover:bg-rose-500 lg:px-6 xl:text-base"
              onClick={() =>
                updateBasket(
                  user?.accessToken,
                  basketData.basket,
                  basketData.setBasket,
                  item,
                  item.quantity + 1
                )
              }
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodElement;
