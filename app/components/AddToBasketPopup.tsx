import type { BasketItem, Category } from "~/types";
import { Link, useLocation } from "@remix-run/react";
import { useRef } from "react";
import useOnClickOutside from "~/hooks/useOnClickOutside";

type AddToBasketPopupProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  item: BasketItem;
  categories: Array<Category>;
};

const AddToBasketPopup = ({
  showModal,
  setShowModal,
  item,
  categories,
}: AddToBasketPopupProps) => {
  const location = useLocation();
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowModal(false));

  return (
    <div
      aria-hidden="false"
      className={
        " fixed left-0 right-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 md:inset-0 md:h-full " +
        (showModal ? "block" : "hidden")
      }
      data-testid="modal"
      role="dialog"
    >
      <div
        ref={ref}
        className="relative h-auto w-full max-w-[750px] p-4 sm:w-3/4 md:w-2/3 lg:w-7/12 xl:w-1/2 2xl:w-2/5"
      >
        <div className="relative rounded-lg bg-zinc-100 shadow">
          <div className="flex items-start justify-between rounded-t p-2">
            <button
              aria-label="Close"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-xl text-gray-400 hover:bg-orange-400 hover:text-white"
              onClick={() => setShowModal(false)}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="flex flex-col gap-4 p-6 pt-0  text-gray-700">
            <p className="mx-auto mt-4 w-2/3 text-center text-xs sm:text-base">
              You have added the item to your basket!
            </p>

            <div className="mx-auto flex w-7/12 gap-6">
              <img
                src={item.image.src}
                alt={item.image.alt}
                className="aspect-square w-20 rounded-lg border-2 border-orange-400 sm:w-32"
              />
              <div className="flex w-7/12 flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-base font-bold sm:text-xl">
                    {item.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.description}
                  </span>
                  <span className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="my-1 w-full border border-gray-300" />
            <p className="mx-auto w-2/3 text-center text-xs sm:text-base">
              To make your order complete,{" "}
              <span className="text-rose-400">Foodsi</span> recommends products
              from the following categories:
            </p>
            <div className="mx-auto flex w-3/4 justify-around gap-6">
              {categories
                .filter((category) =>
                  ["starters", "drinks", "desserts"].includes(category.name)
                )
                .map((category) => (
                  <div
                    className="flex aspect-square w-1/3 flex-col items-center rounded-xl bg-orange-100 p-2"
                    key={category.id}
                  >
                    <img
                      src={category.image.src}
                      alt={category.image.alt}
                      className="h-2/3"
                    />
                    <span className="mb-1 mt-3 text-center text-xs font-bold sm:text-base">
                      {category.name.toUpperCase()}
                    </span>
                    {location.pathname.includes(category.name) ? (
                      <button
                        onClick={() => setShowModal(false)}
                        className="text-center text-xs font-semibold text-orange-400 hover:text-orange-500 sm:text-sm"
                      >
                        Check Now!
                      </button>
                    ) : (
                      <Link
                        to={`/menu/${category.name}?sortBy=recentlyAdded`}
                        prefetch="intent"
                        className="text-center text-xs font-semibold text-orange-400 hover:text-orange-500 sm:text-sm"
                      >
                        Check Now!
                      </Link>
                    )}
                  </div>
                ))}
            </div>
            <div className="my-1 w-full border border-gray-300" />
            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="w-full rounded-xl bg-zinc-200 px-4 py-2 text-center text-xs font-semibold text-gray-700 hover:bg-zinc-300 sm:text-base"
              >
                Continue Shopping
              </button>
              <Link
                to="/order"
                className="w-full rounded-xl bg-orange-400 px-4 py-2 text-center text-xs font-semibold text-white hover:bg-orange-500 sm:text-base"
              >
                Go To Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToBasketPopup;
