import { Dropdown } from "flowbite-react";
import { FaShoppingBasket } from "react-icons/fa";

const BASKET = [
  {
    id: 1,
    price: 10.0,
    quantity: 1,
    image: {
      src: "https://images.pexels.com/photos/15126955/pexels-photo-15126955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Pizza",
    },
  },
  {
    id: 2,
    price: 5.0,
    quantity: 5,
    image: {
      src: "https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Hamburger",
    },
  },
  {
    id: 2,
    price: 5.0,
    quantity: 5,
    image: {
      src: "https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Hamburger",
    },
  },
  {
    id: 2,
    price: 5.0,
    quantity: 5,
    image: {
      src: "https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Hamburger",
    },
  },
  {
    id: 2,
    price: 5.0,
    quantity: 5,
    image: {
      src: "https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Hamburger",
    },
  },
  {
    id: 2,
    price: 5.0,
    quantity: 5,
    image: {
      src: "https://images.pexels.com/photos/12034622/pexels-photo-12034622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Hamburger",
    },
  },
];

const sumBasket = () => {
  return BASKET.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const Basket = ({ visible }) => {
  return (
    <div className="text-rose-400">
      {visible ? (
        <Dropdown
          arrowIcon={false}
          inline={true}
          dismissOnClick={true}
          className="w-[220px] rounded-xl bg-orange-200"
          label={
            <div className="flex items-center justify-center rounded-full border-2 border-rose-400 bg-orange-100 p-2 text-[24px]">
              <FaShoppingBasket />
            </div>
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">My Cart</span>
          </Dropdown.Header>
          <div className="flex max-h-[200px] flex-col overflow-y-auto">
            {BASKET.length > 0 ? (
              BASKET.map((item) => (
                <div key={item.id} className="text-xs text-gray-700">
                  <div className="flex w-full items-center justify-between px-3">
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      className="h-8 w-8 rounded-lg border-2 border-rose-400"
                    />
                    <div>
                      <button className="w-8 rounded-full bg-gray-200 p-2 hover:bg-gray-600 hover:text-white">
                        -
                      </button>
                      <span className="text-gray-400"> {item.quantity} </span>
                      <button className="w-8 rounded-full bg-gray-200 p-2 hover:bg-gray-600 hover:text-white">
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
                <div className="flex items-center gap-1">
                  <span>Your cart is empty</span>
                </div>
              </div>
            )}
          </div>
          <Dropdown.Item>
            <div className="flex items-center gap-1">
              <button>Make Order (${sumBasket().toFixed(2)})</button>
            </div>
          </Dropdown.Item>
        </Dropdown>
      ) : (
        <div className="flex items-center justify-center rounded-full border-2 border-rose-400 bg-orange-100 p-2 text-[24px]">
          <FaShoppingBasket />
        </div>
      )}
    </div>
  );
};

export default Basket;
