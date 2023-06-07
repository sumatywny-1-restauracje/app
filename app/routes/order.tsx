import type { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import type { Location } from "~/types";
import { json } from "@remix-run/node";
import type { User } from "~/types";
import { Form, useNavigation } from "@remix-run/react";
import { useContext, useState } from "react";
import { BasketContext, UserContext } from "~/root";
import { updateBasket, deleteItemFromBasket } from "~/utils/handleBasket";
import { BsTrash } from "react-icons/bs";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { getLocations } from "~/models/locations.server";

export const meta: V2_MetaFunction = () => [{ title: "Make order" }];

type LoaderData = {
  restaurants: Array<Location>;
};

export const loader: LoaderFunction = async () => {
  const restaurants = await getLocations();

  return json<LoaderData>({ restaurants: restaurants });
};

export default function JobApplicationRoute() {
  const data = useLoaderData<LoaderData>();
  // const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [showCart, setShowCart] = useState(false);
  const [showClientInfo, setShowClientInfo] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [restaurantChoice, setRestaurantChoice] = useState("");
  const [showDeliveryMethod, setShowDeliveryMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  const user = useContext(UserContext) as User;
  const basketData = useContext(BasketContext);

  return (
    <div className="mb-12 mt-8 w-5/6 max-w-screen-lg rounded-xl border-rose-300 bg-orange-100 text-gray-700 md:w-4/6">
      {/* {actionData?.success ? (
        <div className="flex flex-col gap-2 text-center text-rose-400">
          <h2 className="text-5xl font-bold">Success!</h2>
          <p className="text-xl">{actionData.success}</p>
        </div>
      ) : ( */}
      <>
        <Form
          method="post"
          action="/order"
          className="flex h-full w-full flex-col justify-center pb-6"
        >
          <div className="flex w-full flex-col gap-4">
            <h2 className="w-full p-4 text-center  text-3xl font-bold">
              Order Details
            </h2>
            <div className="flex w-full flex-col gap-4 bg-orange-200 py-3">
              <button
                className="relative flex w-full items-center justify-center bg-orange-200 font-bold text-gray-700"
                type="button"
                onClick={() => setShowCart(!showCart)}
              >
                My Cart{" "}
                <span className="absolute right-0 block text-4xl">
                  {showCart ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
                </span>
              </button>
              <div className="border border-orange-100" hidden={!showCart} />
              {showCart && (
                <ul
                  className={
                    " mx-auto flex w-full flex-col  gap-2 px-4 sm:w-2/3 md:grid " +
                    (basketData.basket.length > 1
                      ? "md:w-full md:grid-cols-2"
                      : "md:2/3 items-center md:grid-cols-1")
                  }
                >
                  {basketData?.basket?.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-3 rounded-lg border border-gray-700 bg-orange-100 p-1"
                    >
                      <img
                        src={item.image.src}
                        alt={item.image.alt}
                        className="aspect-square w-1/3 rounded-lg border-2 border-gray-700 sm:w-1/5 md:w-1/3"
                      />
                      <div className="flex w-7/12 flex-col justify-between">
                        <div className="flex flex-col gap-1">
                          <span className="text-xl font-bold">{item.name}</span>
                          <span className="text-sm text-gray-500">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex w-full justify-between pr-3 text-xs">
                          <div>
                            <button
                              type="button"
                              className="w-8 rounded-full bg-orange-300 p-2 hover:bg-orange-400 hover:text-white"
                              onClick={() =>
                                updateBasket(
                                  user,
                                  basketData.basket,
                                  basketData.setBasket,
                                  item,
                                  item.quantity - 1
                                )
                              }
                            >
                              -
                            </button>
                            <span className="text-lg text-gray-700">
                              {" "}
                              {item.quantity}{" "}
                            </span>
                            <button
                              type="button"
                              className="w-8 rounded-full bg-orange-300 p-2 hover:bg-orange-400 hover:text-white"
                              onClick={() =>
                                updateBasket(
                                  user,
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
                          <button
                            type="button"
                            className="text-base text-gray-700"
                            onClick={() =>
                              deleteItemFromBasket(
                                user,
                                basketData.basket,
                                basketData.setBasket,
                                item.id
                              )
                            }
                          >
                            <BsTrash />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex w-full flex-col gap-4 bg-orange-200 py-3">
              <button
                className="relative flex w-full items-center justify-center bg-orange-200 font-bold text-gray-700"
                type="button"
                onClick={() => setShowClientInfo(!showClientInfo)}
              >
                Client Information{" "}
                <span className="absolute right-0 block text-4xl">
                  {showClientInfo ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
                </span>
              </button>
              <div
                className="border border-orange-100"
                hidden={!showClientInfo}
              />
              {showClientInfo && (
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col items-center justify-center">
                    <label htmlFor="firstName" className="text-gray-500">
                      First Name:
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                      defaultValue={user?.name.split(" ")[0]}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <label htmlFor="lastName" className="text-gray-500">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                      defaultValue={user?.name.split(" ")[1]}
                    />{" "}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <label htmlFor="email" className="text-gray-500">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                      value={user?.email}
                      disabled
                    />{" "}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <label htmlFor="phone" className="text-gray-500">
                      Phone:
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                    />{" "}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <label htmlFor="city" className="text-gray-500">
                      City:
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                    />{" "}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <label htmlFor="street" className="text-gray-500">
                      Street and House Number:
                    </label>
                    <input
                      type="text"
                      name="street"
                      id="street"
                      className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <label htmlFor="flatNumber" className="text-gray-500">
                      Flat Number:
                    </label>
                    <input
                      type="number"
                      name="flatNumber"
                      id="flatNumber"
                      className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <label htmlFor="companyName" className="text-gray-500">
                      Company Name:{" "}
                      <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <label htmlFor="NIP" className="text-gray-500">
                      NIP: <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="NIP"
                      id="NIP"
                      className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex w-full flex-col gap-4 bg-orange-200 py-3">
              <button
                className="relative flex w-full items-center justify-center bg-orange-200 font-bold text-gray-700"
                type="button"
                onClick={() => setShowDeliveryMethod(!showDeliveryMethod)}
              >
                Delivery Method{" "}
                <span className="absolute right-0 block text-4xl">
                  {showDeliveryMethod ? (
                    <TiArrowSortedDown />
                  ) : (
                    <TiArrowSortedUp />
                  )}
                </span>
              </button>
              <div
                className="border border-orange-100"
                hidden={!showDeliveryMethod}
              />
              {showDeliveryMethod && (
                <div className="flex flex-col gap-3">
                  <fieldset className="w-full bg-orange-200">
                    <div className="mx-auto flex w-max flex-col items-center justify-center gap-2 rounded-lg border border-gray-700 bg-orange-100 sm:flex-row sm:px-4">
                      <div className="flex items-center gap-2 border-b border-gray-700 px-4 py-2 sm:border-0 sm:px-0 sm:py-0">
                        <input
                          type="radio"
                          id="deliveryMethodChoice1"
                          name="deliveryMethod"
                          value="cash"
                          checked={deliveryMethod === "restaurant"}
                          onClick={() => setDeliveryMethod("restaurant")}
                        />
                        <label
                          htmlFor="deliveryMethodChoice1"
                          className="border-gray-700 py-2 font-bold sm:border-r sm:pr-2"
                        >
                          Pickup at the Restaurant{" "}
                        </label>
                      </div>
                      <div className="flex items-center gap-2 px-4 pb-2 pt-1 sm:px-0 sm:py-0">
                        <input
                          type="radio"
                          id="deliveryMethodChoice2"
                          name="deliveryMethod"
                          checked={deliveryMethod === "courier"}
                          onClick={() => setDeliveryMethod("courier")}
                        />
                        <label
                          htmlFor="deliveryMethodChoice2"
                          className="py-2 font-bold"
                        >
                          Courier Delivery{" "}
                          <span className="font-normal text-gray-400">
                            ($5.00)
                          </span>
                        </label>
                      </div>
                    </div>
                  </fieldset>
                  {deliveryMethod === "restaurant" && (
                    <select
                      className="mx-auto w-max rounded-lg border border-gray-700 bg-orange-100 p-2"
                      name="restaurantChoice"
                      value={restaurantChoice}
                      onChange={(e) => setRestaurantChoice(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Select a Restaurant
                      </option>
                      {data.restaurants.map((restaurant) => (
                        <option
                          key={restaurant.restaurantId}
                          value={restaurant.restaurantId}
                          className="text-gray-700"
                        >
                          {restaurant.address.street}{" "}
                          {restaurant.address.streetNo},{" "}
                          {restaurant.address.city}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}
            </div>
            <div className="flex w-full flex-col gap-4 bg-orange-200 py-3">
              <button
                className="relative flex items-center justify-center font-bold text-gray-700"
                type="button"
                onClick={() => setShowPaymentMethod(!showPaymentMethod)}
              >
                Payment Method{" "}
                <span className="absolute right-0 block text-4xl">
                  {showPaymentMethod ? (
                    <TiArrowSortedDown />
                  ) : (
                    <TiArrowSortedUp />
                  )}
                </span>
              </button>
              <div
                className="border border-orange-100"
                hidden={!showPaymentMethod}
              />
              {showPaymentMethod && (
                <>
                  <fieldset className="w-full bg-orange-200">
                    <div className="mx-auto flex w-max flex-col items-center justify-center gap-2 rounded-lg border border-gray-700 bg-orange-100 sm:flex-row sm:px-4">
                      <div className="flex items-center gap-2 border-b border-gray-700 px-4 py-2 sm:border-0 sm:px-0 sm:py-0">
                        <input
                          type="radio"
                          id="paymentMethodChoice1"
                          name="paymentMethod"
                          value="cash"
                          checked={paymentMethod === "cash"}
                          onClick={() => setPaymentMethod("cash")}
                        />
                        <label
                          htmlFor="paymentMethodChoice1"
                          className="border-gray-700 py-2 font-bold sm:border-r sm:pr-2"
                        >
                          Cash{" "}
                          <span className="font-normal text-gray-400">
                            (on receipt)
                          </span>
                        </label>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-1 sm:px-0 sm:py-0">
                        <input
                          type="radio"
                          id="paymentMethodChoice2"
                          name="paymentMethod"
                          checked={paymentMethod === "card"}
                          onClick={() => setPaymentMethod("card")}
                        />
                        <label
                          htmlFor="paymentMethodChoice2"
                          className="py-2 font-bold"
                        >
                          Card{" "}
                          <span className="font-normal text-gray-400">
                            (on receipt)
                          </span>
                        </label>
                      </div>
                    </div>
                  </fieldset>
                  <div className="mx-auto flex w-7/12 flex-col items-center justify-center gap-2 text-sm">
                    <label htmlFor="discountCode" className="sr-only">
                      Discount Code:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="string"
                        name="discountCode"
                        id="discountCode"
                        placeholder="Discount Code"
                        className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                      />{" "}
                      <button
                        className="rounded-xl bg-rose-400 px-3 py-2 font-semibold text-white"
                        type="button"
                      >
                        Check Code
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <h3 className="w-full p-4 text-center text-xl font-bold">
              Order Summary
            </h3>
            <div className="mx-auto flex w-2/5 flex-col gap-3 pb-6 text-base text-gray-700">
              <div className="flex w-full justify-between">
                <span className="text-gray-500">Subtotal:</span>
                <span className="font-semibold">
                  $
                  {basketData?.basket
                    ?.reduce((acc, item) => {
                      return acc + item.price * item.quantity;
                    }, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex w-full justify-between">
                <span className="text-gray-500">Delivery:</span>
                <span className="font-semibold">
                  {deliveryMethod === "courier" ? "$5.00" : "$0.00"}
                </span>
              </div>
              <div className="flex w-full justify-between">
                <span className="text-gray-500">Total:</span>
                <span className="font-bold">
                  $
                  {(
                    basketData?.basket?.reduce((acc, item) => {
                      return acc + item.price * item.quantity;
                    }, 0) + (deliveryMethod === "courier" ? 5.0 : 0.0)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mx-auto w-max rounded-xl bg-rose-400 px-4 py-2 text-lg text-white hover:bg-rose-500"
          >
            {isSubmitting ? "Processing..." : "Order Now!"}
          </button>
        </Form>
      </>
      {/* )} */}
    </div>
  );
}
