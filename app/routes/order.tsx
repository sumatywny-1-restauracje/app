import type { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData, useActionData } from "@remix-run/react";
import type {
  LoaderFunction,
  ActionFunction,
  ActionArgs,
} from "@remix-run/node";
import type { Location } from "~/types";
import { json } from "@remix-run/node";
import type { User } from "~/types";
import { Form, useNavigation, Link } from "@remix-run/react";
import { useContext, useState, useEffect } from "react";
import { BasketContext, UserContext } from "~/root";
import {
  updateBasket,
  deleteItemFromBasket,
  clearBasket,
} from "~/utils/handleBasket";
import { BsTrash } from "react-icons/bs";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { getLocations } from "~/models/locations.server";
import { api } from "~/utils/api";
import { createOrder } from "~/models/order.server";

export const meta: V2_MetaFunction = () => [{ title: "Make order" }];

type LoaderData = {
  restaurants: Array<Location>;
};

export const loader: LoaderFunction = async () => {
  const restaurants = await getLocations();

  return json<LoaderData>({ restaurants: restaurants });
};

type ActionData =
  | {
      userEmail?: string;
      street?: string;
      houseNumber?: string;
      city?: string;
      country?: string;
      restaurantId?: string;
      orderedItems?: string;
      totalPrice?: string;
      deliveryMethod?: string;
      paymentMethod?: string;
    }
  | undefined;

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const userEmail = formData.get("userEmail");
  const street = formData.get("street");
  const houseNumber = formData.get("houseNumber");
  const apartment = formData.get("apartment");
  const city = formData.get("city");
  const country = formData.get("country");
  const restaurantId = formData.get("restaurantId");
  const orderedItems = formData.get("orderedItems");
  const totalPrice = formData.get("totalPrice");
  const deliveryMethod = formData.get("deliveryMethod");
  const paymentMethod = formData.get("paymentMethod");

  const errors: ActionData = {
    userEmail: userEmail ? undefined : "User email is required",
    street: street ? undefined : "required",
    houseNumber: houseNumber ? undefined : "required",
    city: city ? undefined : "required",
    country: country ? undefined : "required",
    restaurantId: restaurantId ? undefined : "Restaurant Name is required",
    orderedItems:
      JSON.parse(orderedItems).length > 0
        ? undefined
        : "Add items to your basket",
    totalPrice: totalPrice ? undefined : "Total price is required",
    deliveryMethod: deliveryMethod ? undefined : "Delivery method is required",
    paymentMethod: paymentMethod ? undefined : "Payment method is required",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<ActionData>(errors);
  }

  const items = JSON.parse(orderedItems);
  const preparedItems = items.map((item) => ({
    itemId: item.id,
    name: item.name,
    photoUrl: item.image.src,
    description: item.description,
    ingredients: item.ingredients,
    quantity: item.quantity,
    price: item.price,
  }));

  const res = await createOrder({
    deliveryMethod: deliveryMethod,
    paymentMethod: paymentMethod,
    userEmail: userEmail,
    address: {
      street: street,
      houseNumber: Number(houseNumber),
      apartment: Number(apartment),
      city: city,
      country: country,
    },
    restaurantId: restaurantId,
    orderedItems: preparedItems,
    totalPrice: Number(totalPrice),
  });

  if (res.status === 201) {
    return json({
      success: res?.data?.order?.id,
    });
  } else {
    return json({
      restaurantIsClosed:
        "Selected restaurant is closing soon / already closed, please select another one.",
    });
  }
};

export default function OrderRoute() {
  const data = useLoaderData<LoaderData>();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [showCart, setShowCart] = useState(true);
  const [showClientInfo, setShowClientInfo] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [restaurantChoice, setRestaurantChoice] = useState("");
  const [showDeliveryMethod, setShowDeliveryMethod] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPaymentMethod, setShowPaymentMethod] = useState(true);

  const user = useContext(UserContext) as User;
  const basketData = useContext(BasketContext);

  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const [userGeoLocation, setUserGeoLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [restaurantsInRange, setRestaurantsInRange] = useState(null);

  const success = (pos) => {
    var crd = pos.coords;
    setUserGeoLocation({
      latitude: crd.latitude,
      longitude: crd.longitude,
    });
  };

  const errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, {
              enableHighAccuracy: true,
            });
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, {
              enableHighAccuracy: true,
            });
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchRestaurantInRange = async () => {
      const res = await api.get(
        `/restaurant/filter/range?userLat=${userGeoLocation.latitude}&userLon=${userGeoLocation.longitude}`
      );

      if (res.status !== 200) {
        throw new Error("Error while fetching order");
      }

      const locals = res.data.restaurants;
      setRestaurantsInRange(locals);
    };

    if (userGeoLocation.latitude !== null) {
      fetchRestaurantInRange();
    }
  }, [userGeoLocation]);

  const handleDiscountCode = async () => {
    const res = await api.get(`/coupon/validate?code=${discountCode}`);

    if (res.status !== 200) {
      throw new Error("Error while validating coupon");
    }

    const coupon = res.data.coupon;

    if (coupon?.categoryName === null) {
      const totalPrice = basketData?.basket?.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      setDiscount(totalPrice * (1 - coupon.discount));
    } else {
      const items = basketData?.basket?.filter((item) => {
        return item.categoryName === coupon.categoryName;
      });

      const itemsPrice = items?.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      setDiscount(itemsPrice * (1 - coupon.discount));
    }
  };

  useEffect(() => {
    if (actionData?.success) {
      clearBasket(user, basketData?.setBasket);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <div className="mb-12 mt-8 w-5/6 max-w-screen-lg rounded-xl border-rose-300 bg-orange-100 text-gray-700 md:w-4/6">
      {actionData?.success ? (
        <div className="flex h-full w-full flex-col justify-center gap-4 text-center text-rose-400">
          <h2 className="text-3xl font-bold">We Have Received Your Order!</h2>
          <a
            href={`/orders/${actionData.success}`}
            className="mx-auto w-max rounded-xl bg-rose-400 p-2 text-xl text-white hover:bg-rose-500"
          >
            Check Status
          </a>
        </div>
      ) : (
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
                <input
                  type="hidden"
                  name="orderedItems"
                  value={JSON.stringify(basketData?.basket)}
                />
                {showCart && (
                  <ul
                    className={
                      " mx-auto flex w-full flex-col  gap-2 px-4 sm:w-2/3 md:grid " +
                      (basketData?.basket?.length > 1
                        ? "md:w-full md:grid-cols-2"
                        : "md:2/3 items-center md:grid-cols-1")
                    }
                  >
                    {actionData?.orderedItems ? (
                      <em className="w-full text-center text-red-600">
                        {" "}
                        {actionData.orderedItems}
                      </em>
                    ) : null}
                    {basketData?.basket?.map((item) => (
                      <li
                        key={item?.id}
                        className="flex gap-3 rounded-lg border border-gray-700 bg-orange-100 p-1"
                      >
                        <img
                          src={item?.image.src}
                          alt={item?.image.alt}
                          className="aspect-square w-1/3 rounded-lg border-2 border-gray-700 sm:w-1/5 md:w-1/3"
                        />
                        <div className="flex w-7/12 flex-col justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-xl font-bold">
                              {item?.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              ${item?.price?.toFixed(2)}
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
                    {showClientInfo ? (
                      <TiArrowSortedDown />
                    ) : (
                      <TiArrowSortedUp />
                    )}
                  </span>
                </button>
                <div
                  className="border border-orange-100"
                  hidden={!showClientInfo}
                />
                {showClientInfo && (
                  <div className="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col items-center justify-center">
                      <label htmlFor="userEmail" className="text-gray-500">
                        Email:
                        {actionData?.userEmail ? (
                          <em className="text-red-600">
                            {" "}
                            {actionData.userEmail}
                          </em>
                        ) : null}
                      </label>
                      <input
                        type="email"
                        name="userEmail"
                        id="userEmail"
                        className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                        defaultValue={user?.email}
                        readOnly={true}
                      />{" "}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <label htmlFor="street" className="text-gray-500">
                        Street:
                        {actionData?.street ? (
                          <em className="text-red-600"> {actionData.street}</em>
                        ) : null}
                      </label>
                      <input
                        type="text"
                        name="street"
                        id="street"
                        className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                      />{" "}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <label htmlFor="houseNumber" className="text-gray-500">
                        House Number:
                        {actionData?.houseNumber ? (
                          <em className="text-red-600">
                            {" "}
                            {actionData.houseNumber}
                          </em>
                        ) : null}
                      </label>
                      <input
                        type="number"
                        min={0}
                        name="houseNumber"
                        id="houseNumber"
                        className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <label htmlFor="apartment" className="text-gray-500">
                        Apartment:{" "}
                        {actionData?.apartment ? (
                          <em className="text-red-600">
                            {" "}
                            {actionData.apartment}
                          </em>
                        ) : null}
                        <span className="text-gray-400">(Optional)</span>
                      </label>
                      <input
                        type="number"
                        min={0}
                        name="apartment"
                        id="apartment"
                        className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <label htmlFor="city" className="text-gray-500">
                        City:
                        {actionData?.city ? (
                          <em className="text-red-600"> {actionData.city}</em>
                        ) : null}
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <label htmlFor="country" className="text-gray-500">
                        Country:
                        {actionData?.country ? (
                          <em className="text-red-600">
                            {" "}
                            {actionData.country}
                          </em>
                        ) : null}
                      </label>
                      <input
                        type="text"
                        name="country"
                        id="country"
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
                    {actionData?.deliveryMethod ? (
                      <em className="w-full text-center text-red-600">
                        {" "}
                        {actionData.deliveryMethod}
                      </em>
                    ) : null}
                    {actionData?.restaurantId ? (
                      <em className="w-full text-center text-red-600">
                        {" "}
                        {actionData.restaurantId}
                      </em>
                    ) : null}
                    {actionData?.restaurantIsClosed ? (
                      <em className="w-full text-center text-red-600">
                        {" "}
                        {actionData.restaurantIsClosed}
                      </em>
                    ) : null}
                    <fieldset className="w-full bg-orange-200">
                      <div className="mx-auto flex w-max flex-col items-center justify-center gap-2 rounded-lg border border-gray-700 bg-orange-100 sm:flex-row sm:px-4">
                        <div className="flex items-center gap-2 border-b border-gray-700 px-4 py-2 max-sm:w-full sm:border-0 sm:px-0 sm:py-0">
                          <input
                            type="radio"
                            id="deliveryMethodChoice1"
                            name="deliveryMethod"
                            value="SELF_PICKUP"
                            checked={deliveryMethod === "restaurant"}
                            onClick={() => setDeliveryMethod("restaurant")}
                          />
                          <label
                            htmlFor="deliveryMethodChoice1"
                            className="border-gray-700 py-2 text-xs font-bold sm:border-r sm:pr-2 sm:text-sm lg:text-base"
                          >
                            Pickup at the Restaurant{" "}
                          </label>
                        </div>
                        <div className="flex items-center gap-2 px-4 pb-2 pt-1 sm:px-0 sm:py-0">
                          <input
                            type="radio"
                            id="deliveryMethodChoice2"
                            name="deliveryMethod"
                            value="COURIER"
                            checked={deliveryMethod === "courier"}
                            onClick={() => setDeliveryMethod("courier")}
                          />
                          <label
                            htmlFor="deliveryMethodChoice2"
                            className="py-2 text-xs font-bold sm:text-sm lg:text-base"
                          >
                            Courier Delivery (10km range){" "}
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
                        name="restaurantId"
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
                    {deliveryMethod === "courier" && (
                      <>
                        {restaurantsInRange === null && (
                          <p className="text-center text-gray-700">
                            Loading...
                          </p>
                        )}
                        {restaurantsInRange?.length === 0 && (
                          <p className="text-center text-gray-700">
                            There are no restaurants in your area.
                          </p>
                        )}
                        {restaurantsInRange?.length > 0 && (
                          <select
                            className="mx-auto w-max rounded-lg border border-gray-700 bg-orange-100 p-2"
                            name="restaurantId"
                            value={restaurantChoice}
                            onChange={(e) =>
                              setRestaurantChoice(e.target.value)
                            }
                          >
                            <option value="" disabled selected>
                              Select a Restaurant
                            </option>
                            {restaurantsInRange.map((res) => (
                              <option
                                key={res?.restaurant?.restaurantId}
                                value={res?.restaurant?.restaurantId}
                                className="text-gray-700"
                              >
                                {res?.restaurant?.address?.street}{" "}
                                {res?.restaurant?.address?.streetNo},{" "}
                                {res?.restaurant?.address?.city}, (
                                {res?.distanceKm.toFixed(3)}km)
                              </option>
                            ))}
                          </select>
                        )}
                      </>
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
                    {actionData?.paymentMethod ? (
                      <em className="w-full text-center text-red-600">
                        {" "}
                        {actionData.paymentMethod}
                      </em>
                    ) : null}
                    <fieldset className="w-full bg-orange-200">
                      <div className="mx-auto flex w-max flex-col items-center justify-center gap-2 rounded-lg border border-gray-700 bg-orange-100 sm:flex-row sm:px-4">
                        <div className="flex items-center gap-2 border-b border-gray-700 px-4 py-2 sm:border-0 sm:px-0 sm:py-0">
                          <input
                            type="radio"
                            id="paymentMethodChoice1"
                            name="paymentMethod"
                            value="CASH"
                            checked={paymentMethod === "CASH"}
                            onClick={() => setPaymentMethod("CASH")}
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
                            value="CARD"
                            checked={paymentMethod === "CARD"}
                            onClick={() => setPaymentMethod("CARD")}
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
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          className="rounded-lg border border-gray-700 bg-orange-100 text-center text-xs text-gray-700 sm:p-2 sm:text-sm"
                        />{" "}
                        <button
                          className="rounded-xl bg-rose-400 px-3 py-2 font-semibold text-white"
                          type="button"
                          onClick={handleDiscountCode}
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
                  <input
                    type="hidden"
                    name="totalPrice"
                    value={
                      basketData?.basket?.reduce((acc, item) => {
                        return acc + item.price * item.quantity;
                      }, 0) +
                      (deliveryMethod === "courier" ? 5.0 : 0.0) -
                      discount
                    }
                  />
                  <span className="font-bold">
                    $
                    {(
                      basketData?.basket?.reduce((acc, item) => {
                        return acc + item.price * item.quantity;
                      }, 0) +
                      (deliveryMethod === "courier" ? 5.0 : 0.0) -
                      discount
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
      )}
    </div>
  );
}
