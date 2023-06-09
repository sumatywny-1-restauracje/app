import type { V2_MetaFunction } from "@remix-run/react";
import type { User } from "./types";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useContext, useState } from "react";
import { UserContext } from "~/root";
import invariant from "tiny-invariant";
import { getClientOrderById } from "~/models/order.server";
import { authenticator } from "~/services/auth.server";
import { getLocations } from "~/models/locations.server";
import VoteProductPopup from "~/components/VoteProductPopup";
import { api } from "~/utils/api";

export const meta: V2_MetaFunction = () => [{ title: "Order Details" }];

type LoaderData = {
  order: any;
};

export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderArgs) => {
  const user = (await authenticator.isAuthenticated(request)) as User;
  if (!user) {
    return redirect("/");
  }

  invariant(params.id, "order id not found");
  const order = await getClientOrderById(params.id);
  const restaurants = await getLocations();
  const restaurant = restaurants.find(
    (restaurant) => restaurant.restaurantId === order.restaurantId
  );
  order.restaurantAddress = `${restaurant?.address.street} ${restaurant?.address.streetNo}, ${restaurant?.address.city}`;

  if (!order) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ order });
};

export default function HistoryOrderRoute() {
  const data = useLoaderData() as LoaderData;
  const user = useContext(UserContext);

  const [rateProduct, setRateProduct] = useState(null);
  const [ratedProducts, setRatedProducts] = useState([]);
  const [viewRatePopup, setViewRatePopup] = useState(false);

  const handleCancelOrder = async () => {
    const jwtToken = user?.jwtToken;
    const res = await api.delete(`/order/${data?.order?.id}/`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    if (res.status === 200) {
      window.location.reload();
    }
  };

  return (
    <div className="mb-12 mt-8 w-5/6 max-w-screen-lg rounded-xl border-rose-300 bg-orange-100 text-gray-700 md:w-4/6">
      <div className="flex h-full w-full flex-col justify-center pb-6">
        <div className="flex w-full flex-col gap-4">
          <h2 className="w-full p-4 text-center text-base font-bold sm:text-xl">
            Order Id: {data?.order?.id}
          </h2>
          <div className="mx-auto flex flex-col items-end justify-around sm:w-3/4 sm:flex-row md:w-2/3 lg:w-1/2">
            <div className="max-sm:mx-auto">
              <p className="w-full text-center font-bold text-gray-700 max-sm:text-sm">
                Current Status:
              </p>
              <p className="mx-auto w-max rounded-xl border-2 border-gray-600 px-4 py-2 text-lg font-bold capitalize text-gray-600 max-sm:text-sm">
                {data?.order?.status?.includes("_")
                  ? data?.order?.status?.replace("_", " ")
                  : data?.order?.status}
              </p>
            </div>
            <button
              className="h-max w-max rounded-xl border-2 border-gray-600 bg-orange-200 px-4 py-2 text-lg text-gray-600 hover:bg-orange-300 max-sm:mx-auto max-sm:mt-4 max-sm:text-sm"
              hidden={data?.order?.status !== "NOT_APPROVED"}
              disabled={data?.order?.status !== "NOT_APPROVED"}
              onClick={handleCancelOrder}
            >
              Cancel Order
            </button>
          </div>
          <div className="flex w-full flex-col gap-4 bg-orange-200 py-3">
            <p className="w-full text-center font-bold text-gray-700">
              Order Details{" "}
            </p>
            <div className="border border-orange-100" />
            <div>
              <ul
                className={
                  " mx-auto flex w-full flex-col  gap-2 px-4 sm:w-2/3 md:grid " +
                  (data?.order?.orderedItems?.length > 1
                    ? "md:w-full md:grid-cols-2"
                    : "md:2/3 items-center md:grid-cols-1")
                }
              >
                {data?.order?.orderedItems?.map((item) => (
                  <li
                    key={item?.itemId}
                    className="flex gap-3 rounded-lg border border-gray-700 bg-orange-100 p-1"
                  >
                    <img
                      src={item?.photoUrl}
                      alt={item?.name}
                      className="aspect-square w-1/3 rounded-lg border-2 border-gray-700 sm:w-1/5 md:w-1/3"
                    />
                    <div className="flex w-full flex-col justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-xl font-bold">{item?.name}</span>
                        <span className="text-sm text-gray-500">
                          ${item?.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex w-full justify-between pr-3 text-xs">
                        <div className="flex w-full items-center justify-between">
                          <span className="text-sm text-gray-700">
                            Quantity: {item?.quantity}
                          </span>
                          <button
                            onClick={() => {
                              setRateProduct(item);
                              setViewRatePopup(true);
                            }}
                            className="w-max rounded-xl bg-rose-400 px-3 py-1 text-xs text-white hover:bg-rose-500"
                            hidden={
                              ratedProducts.includes(item?.itemId) ||
                              data?.order?.status !== "COMPLETED"
                            }
                          >
                            Rate
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex w-full flex-col gap-4 bg-orange-200 py-3">
                <div className="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-gray-500">Email:</p>
                    <div className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                      {data?.order?.userEmail}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-gray-500">Street:</p>
                    <div className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                      {data?.order?.address?.street}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-gray-500">House Number:</p>
                    <div className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                      {data?.order?.address?.houseNumber}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-gray-500">Apartment:</p>
                    <div className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                      {data?.order?.address?.apartment}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-gray-500">City:</p>
                    <div className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                      {data?.order?.address?.city}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-gray-500">Country:</p>
                    <div className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                      {data?.order?.address?.country}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-3">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-gray-500">Delivery Method:</p>
                  <div className="flex h-full w-full items-center justify-center rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                    {data?.order?.deliveryMethod === "SELF_PICKUP" &&
                      "Self Pickup"}
                    {data?.order?.deliveryMethod === "DELIVERY" && "Delivery"}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-gray-500">Restaurant:</p>
                  <div className="flex h-full w-full items-center justify-center  rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                    {data?.order?.restaurantAddress}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-gray-500">Payment Method:</p>
                  <div className="flex h-full w-full items-center  justify-center rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                    {data?.order?.paymentMethod === "CASH" && "Cash"}
                    {data?.order?.paymentMethod === "CARD" && "Card"}
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-center sm:col-span-3">
                  <p className="text-gray-500">Total Price:</p>
                  <div className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                    ${data?.order?.totalPrice}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {viewRatePopup && (
        <VoteProductPopup
          item={rateProduct}
          showModal={viewRatePopup}
          setShowModal={setViewRatePopup}
          setRatedProducts={setRatedProducts}
        />
      )}
    </div>
  );
}
