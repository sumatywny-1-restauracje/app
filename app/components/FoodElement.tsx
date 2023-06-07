import type { Product, User, Category, BasketItem } from "types";
import { useContext, useState } from "react";
import { Rating } from "flowbite-react";
import LoginForm from "./LoginForm";
import AddToBasketPopup from "./AddToBasketPopup";
import { BasketContext, UserContext } from "~/root";
import { updateBasket } from "~/utils/handleBasket";

type FoodElementProps = {
  product: Product;
  categories: Array<Category>;
};

const FoodElement = ({ product, categories }: FoodElementProps) => {
  const user = useContext(UserContext) as User;
  const basketData = useContext(BasketContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddToBasketModal, setShowAddToBasketModal] = useState(false);

  const item = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: {
      src: product.image,
      alt: product.name,
    },
    quantity:
      basketData.basket.find((item) => item.id === product.id)?.quantity ?? 0,
  } as BasketItem;

  const handleAddToBasket = () => {
    if (user) {
      updateBasket(
        user,
        basketData.basket,
        basketData.setBasket,
        item,
        item.quantity + 1
      );
      setShowAddToBasketModal(true);
    } else {
      setShowLoginModal(true);
    }
  };
  return (
    <>
      <div className="relative mx-auto flex h-fit w-44 items-end justify-start pt-[100px] sm:w-52 sm:pt-[7rem] md:w-60 md:pt-[7.5rem] lg:w-60 xl:w-64 xl:pt-[9rem]">
        <div className="absolute right-0 top-0 overflow-hidden rounded-full border-[12px] border-rose-400 text-[15rem] max-sm:w-full">
          <img
            src={product?.image}
            alt={product?.name}
            className="h-[152px] w-[152px] object-fill sm:h-[10rem] sm:w-[10rem] md:h-44 md:w-44 xl:h-52 xl:w-52"
          />
        </div>
        <div className="flex h-max w-44 items-start rounded-2xl bg-orange-100 px-5 pt-[5.5rem] text-lg text-gray-700 sm:w-44 sm:pt-[5rem] md:w-48 md:pt-[5.5rem] xl:w-56 xl:pt-[6rem]">
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
                  ({product?.numberOfRatings ?? 0})
                </p>
              </Rating>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">${product?.price}</span>
              <button
                className="rounded-2xl bg-rose-400 px-4 py-1 text-xs font-semibold text-white hover:bg-rose-500 lg:px-6 xl:text-base"
                onClick={() => handleAddToBasket()}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <LoginForm showModal={showLoginModal} setShowModal={setShowLoginModal} />
      <AddToBasketPopup
        showModal={showAddToBasketModal}
        setShowModal={setShowAddToBasketModal}
        item={item}
        categories={categories}
      />
    </>
  );
};

export default FoodElement;
