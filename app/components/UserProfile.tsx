import type { User } from "~/types";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "~/root";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import { FaRegUser, FaHistory } from "react-icons/fa";
import { Link } from "@remix-run/react";
import dayjs from "dayjs";
import { api } from "~/utils/api";

type UserProfileProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const UserProfile = ({ showModal, setShowModal }: UserProfileProps) => {
  const user = useContext(UserContext) as User;
  const loyaltyPoints = user?.info?.loyaltyPoints;

  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowModal(false));

  const [clientOrders, setClientOrders] = useState([]);

  useEffect(() => {
    const fetchClientOrders = async () => {
      const jwtToken = user?.jwtToken;
      const res = await api.get(`/order`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (res.status !== 200) {
        throw new Error("Error while fetching orders");
      }

      const ordersData = res.data.orders;
      setClientOrders(ordersData.reverse());
    };

    fetchClientOrders();
  }, []);

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
        className="relative mx-3 h-auto w-full rounded-xl bg-zinc-50 p-4 sm:w-1/3 sm:min-w-[400px] xl:w-1/5"
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
          {user?.name && (
            <>
              <span className="block w-full text-center text-xl font-semibold text-gray-600">
                {user?.name}
              </span>
              <div className="my-2 w-full border border-gray-300" />
            </>
          )}
          <div className="flex w-full flex-col items-center gap-2 rounded-xl bg-orange-100 p-2 text-gray-600">
            <div className="flex w-full justify-center gap-1 text-gray-600">
              <FaHistory className="my-auto h-full" />
              <span>My Orders</span>
            </div>
            <ul className="flex max-h-[300px] w-full flex-col gap-1 overflow-y-auto">
              {clientOrders.length === 0 ? (
                <li className="flex w-full justify-center rounded-xl bg-orange-300 py-2 text-white">
                  No orders yet
                </li>
              ) : (
                <>
                  {clientOrders.map((order) => (
                    <li
                      key={order?.id}
                      className="flex w-full justify-center rounded-xl bg-orange-300 py-2 hover:bg-orange-400"
                    >
                      <Link
                        to={`/orders/${order?.id}`}
                        prefetch="intent"
                        className="text-white"
                        onClick={() => setShowModal(false)}
                      >
                        {dayjs(order?.createdAt).format("DD.MM.YYYY HH:mm")};{" "}
                        {order?.orderedItems.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}{" "}
                        items; ${order?.totalPrice.toFixed(2)}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="my-2 w-full border border-gray-300" />
          <div className="item-center flex h-max w-full justify-center gap-2 rounded-xl bg-orange-300 px-4 py-2 font-semibold text-white">
            <FaRegUser className="my-auto h-full" />
            Current Loyalty Points: {loyaltyPoints}
          </div>
          <div className="my-2 w-full border border-gray-300" />
          <div className="w-full">
            <form action="/logout" method="post">
              <button
                type="submit"
                className="w-full rounded-xl bg-orange-400 px-4 py-2 font-semibold text-white hover:bg-orange-500"
              >
                Log Out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
