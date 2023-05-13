import type { User } from "~/types";
import { useContext } from "react";
import { Dropdown } from "flowbite-react";
import { FaShoppingBasket } from "react-icons/fa";
import { BasketContext, UserContext } from "~/root";
import { updateBasket } from "~/utils/updateBasket";

const sumBasket = (basket) => {
  return basket.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const Basket = ({ visible }: { visible: boolean }) => {
  const user = useContext(UserContext) as User;
  const basketData = useContext(BasketContext);

  return (
    <div className="text-rose-400">
      {visible ? (
        <Dropdown
          arrowIcon={false}
          inline={true}
          dismissOnClick={true}
          className="!min-w-[250px] rounded-xl bg-orange-200"
          label={
            <div className="flex items-center justify-center rounded-full border-2 border-rose-400 bg-orange-100 p-2 text-[24px] hover:border-rose-500 hover:text-rose-500">
              <FaShoppingBasket />
            </div>
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">My Cart</span>
          </Dropdown.Header>
          <div className="flex max-h-[200px] flex-col overflow-y-auto">
            {basketData.basket.length > 0 ? (
              basketData.basket.map((item) => (
                <div key={item.id} className="text-xs text-gray-700">
                  <div className="flex w-full items-center justify-between px-3">
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      className="h-8 w-8 rounded-lg border-2 border-rose-400"
                    />
                    <div>
                      <button
                        className="w-8 rounded-full bg-gray-200 p-2 hover:bg-gray-600 hover:text-white"
                        onClick={() =>
                          updateBasket(
                            user.accessToken,
                            basketData.basket,
                            basketData.setBasket,
                            item,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <span className="text-gray-400"> {item.quantity} </span>
                      <button
                        className="w-8 rounded-full bg-gray-200 p-2 hover:bg-gray-600 hover:text-white"
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
                        +
                      </button>
                    </div>

                    <span className="text-gray-400">
                      (${(item.price * item.quantity).toFixed(2)})
                    </span>
                  </div>
                  <div className="my-1 w-full border border-gray-100" />
                </div>
              ))
            ) : (
              <div>
                <div className="flex items-center gap-1 p-3">
                  <span>Empty!</span>
                  <span className="text-rose-400">Waiting for your order!</span>
                </div>
              </div>
            )}
          </div>
          {basketData.basket.length > 0 && (
            <Dropdown.Item>
              <div className="flex items-center gap-1">
                <button>
                  Make Order (${sumBasket(basketData.basket).toFixed(2)})
                </button>
              </div>
            </Dropdown.Item>
          )}
        </Dropdown>
      ) : (
        <div className="flex items-center justify-center rounded-full border-2 border-rose-400 bg-orange-100 p-2 text-[24px] hover:border-rose-500 hover:text-rose-500">
          <FaShoppingBasket />
        </div>
      )}
    </div>
  );
};

export default Basket;
