// import type { User } from "~/types";
// import { useContext } from "react";
// import { Dropdown } from "flowbite-react";
// import { FaShoppingBasket } from "react-icons/fa";
// import { BasketContext, UserContext } from "~/root";
// import { updateBasket } from "~/utils/updateBasket";

// const sumBasket = (basket) => {
//   return basket.reduce((acc, item) => acc + item.price * item.quantity, 0);
// };

// const Basket = ({ visible }: { visible: boolean }) => {
//   const user = useContext(UserContext) as User;
//   const basketData = useContext(BasketContext);

//   return (
//     <div className="text-rose-400">
//       {visible ? (
//         <Dropdown
//           arrowIcon={false}
//           inline={true}
//           dismissOnClick={true}
//           className="!min-w-[250px] rounded-xl bg-orange-200"
//           label={
//             <div className="flex items-center justify-center rounded-full border-2 border-rose-400 bg-orange-100 p-2 text-[24px] hover:border-rose-500 hover:text-rose-500">
//               <FaShoppingBasket />
//               {basketData.basket.length > 0 && (
//                 <span className="fixed block min-w-[32px] -translate-y-4 translate-x-5 rounded-full border-2 border-rose-400 bg-rose-300 p-1 text-center text-sm font-bold text-gray-700">
//                   {basketData.basket.reduce(
//                     (acc, item) => acc + item.quantity,
//                     0
//                   )}
//                 </span>
//               )}
//             </div>
//           }
//         >
//           <Dropdown.Header>
//             <span className="block text-sm">My Cart</span>
//           </Dropdown.Header>
//           <div className="flex max-h-[200px] flex-col overflow-y-auto">
//             {basketData.basket.length > 0 ? (
//               basketData.basket.map((item) => (
//                 <div key={item.id} className="text-xs text-gray-700">
//                   <div className="flex w-full items-center justify-between px-3">
//                     <img
//                       src={item.image.src}
//                       alt={item.image.alt}
//                       className="h-8 w-8 rounded-lg border-2 border-rose-400"
//                     />
//                     <div>
//                       <button
//                         className="w-8 rounded-full bg-gray-200 p-2 hover:bg-gray-600 hover:text-white"
//                         onClick={() =>
//                           updateBasket(
//                             user?.accessToken,
//                             basketData.basket,
//                             basketData.setBasket,
//                             item,
//                             item.quantity - 1
//                           )
//                         }
//                       >
//                         -
//                       </button>
//                       <span className="text-gray-400"> {item.quantity} </span>
//                       <button
//                         className="w-8 rounded-full bg-gray-200 p-2 hover:bg-gray-600 hover:text-white"
//                         onClick={() =>
//                           updateBasket(
//                             user?.accessToken,
//                             basketData.basket,
//                             basketData.setBasket,
//                             item,
//                             item.quantity + 1
//                           )
//                         }
//                       >
//                         +
//                       </button>
//                     </div>

//                     <span className="text-gray-400">
//                       (${(item.price * item.quantity).toFixed(2)})
//                     </span>
//                   </div>
//                   <div className="my-1 w-full border border-gray-100" />
//                 </div>
//               ))
//             ) : (
//               <div>
//                 <div className="flex items-center gap-1 p-3">
//                   <span>Empty!</span>
//                   <span className="text-rose-400">Waiting for your order!</span>
//                 </div>
//               </div>
//             )}
//           </div>
//           {basketData.basket.length > 0 && (
//             <Dropdown.Item>
//               <div className="flex items-center gap-1">
//                 <button>
//                   Make Order (${sumBasket(basketData.basket).toFixed(2)})
//                 </button>
//               </div>
//             </Dropdown.Item>
//           )}
//         </Dropdown>
//       ) : (
//         <div className="flex items-center justify-center rounded-full border-2 border-rose-400 bg-orange-100 p-2 text-[24px] hover:border-rose-500 hover:text-rose-500">
//           <FaShoppingBasket />
//           {basketData.basket.length > 0 && (
//             <span className="fixed block min-w-[32px] -translate-y-4 translate-x-5 rounded-full border-2 border-rose-400 bg-rose-300 p-1 text-center text-sm font-bold text-gray-700">
//               {basketData.basket.reduce((acc, item) => acc + item.quantity, 0)}
//             </span>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Basket;

import type { User } from "~/types";
import { useContext, useRef } from "react";
import { BasketContext, UserContext } from "~/root";
import { updateBasket } from "~/utils/updateBasket";
import useOnClickOutside from "~/hooks/useOnClickOutside";

const sumBasket = (basket) => {
  return basket.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

type BasketProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const Basket = ({ showModal, setShowModal }: BasketProps) => {
  const user = useContext(UserContext) as User;
  const basketData = useContext(BasketContext);

  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowModal(false));

  return (
    <div
      aria-hidden="false"
      className={
        " fixed left-0 right-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-60 md:inset-0 md:h-full " +
        (showModal ? "block" : "hidden")
      }
      data-testid="modal"
      role="dialog"
    >
      <div
        ref={ref}
        className="relative h-auto w-max rounded-xl bg-zinc-50 p-4 sm:w-1/3 sm:min-w-[400px] xl:w-1/5"
      >
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
        <div className="flex w-full flex-col items-center justify-center">
          <span className="block w-full text-center text-xl font-semibold text-orange-400">
            My Cart
          </span>
          <div className="my-2 w-full border border-gray-300" />
          <div className="flex max-h-[400px] w-full flex-col overflow-y-auto">
            {basketData.basket.length > 0 ? (
              basketData.basket.map((item) => (
                <>
                  <div key={item.id} className="mt-1 text-xs text-gray-700">
                    <div className="flex w-full items-center justify-center gap-7 px-3">
                      <img
                        src={item.image.src}
                        alt={item.image.alt}
                        className="h-20 w-20 rounded-lg border-2 border-orange-400"
                      />
                      <div>
                        <button
                          className="w-8 rounded-full bg-gray-200 p-2 hover:bg-gray-600 hover:text-white"
                          onClick={() =>
                            updateBasket(
                              user?.accessToken,
                              basketData.basket,
                              basketData.setBasket,
                              item,
                              item.quantity - 1
                            )
                          }
                        >
                          -
                        </button>
                        <span className="text-lg text-gray-400">
                          {" "}
                          {item.quantity}{" "}
                        </span>
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
                  </div>
                  <div className="mt-1 w-full border border-gray-100" />
                </>
              ))
            ) : (
              <div>
                <div className="flex w-full items-center justify-center gap-1 p-3">
                  <span>Empty!</span>
                  <span className="text-orange-400">
                    Waiting for your order!
                  </span>
                </div>
              </div>
            )}
          </div>
          {basketData.basket.length > 0 && (
            <div className="flex w-full flex-col items-center">
              <div className="mb-2 w-full border border-gray-300" />
              <button className="w-full rounded-xl bg-orange-400 px-4 py-2 font-semibold text-white hover:bg-orange-500">
                Make Order (${sumBasket(basketData.basket).toFixed(2)})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Basket;
