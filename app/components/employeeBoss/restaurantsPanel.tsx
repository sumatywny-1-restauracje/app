import { useState, useContext } from "react";
import FormModal from "./FormModal";
import { api } from "~/utils/api";
import { UserContext } from "~/root";

const RestaurantsPanel = ({ restaurants, managers }: any) => {
  const user = useContext(UserContext);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [restaurantData, setRestaurantData] = useState(restaurants);

  const handleAdd = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const geoLat = formData.get("geoLat");
    const geoLon = formData.get("geoLon");
    const managerId = formData.get("managerId");
    const street = formData.get("street");
    const streetNo = formData.get("streetNo");
    const city = formData.get("city");
    const postalCode = formData.get("postalCode");
    const country = formData.get("country");
    const photoUrl = formData.get("photoUrl");
    const phoneNumber = formData.get("phoneNumber");

    const dayMondayStart = `1970-01-01T${formData.get(
      "dayMondayStart"
    )}:00.000Z`;
    const dayMondayEnd = `1970-01-01T${formData.get("dayMondayEnd")}:00.000Z`;
    const dayTuesdayStart = `1970-01-01T${formData.get(
      "dayTuesdayStart"
    )}:00.000Z`;
    const dayTuesdayEnd = `1970-01-01T${formData.get("dayTuesdayEnd")}:00.000Z`;
    const dayWednesdayStart = `1970-01-01T${formData.get(
      "dayWednesdayStart"
    )}:00.000Z`;
    const dayWednesdayEnd = `1970-01-01T${formData.get(
      "dayWednesdayEnd"
    )}:00.000Z`;
    const dayThursdayStart = `1970-01-01T${formData.get(
      "dayThursdayStart"
    )}:00.000Z`;
    const dayThursdayEnd = `1970-01-01T${formData.get(
      "dayThursdayEnd"
    )}:00.000Z`;
    const dayFridayStart = `1970-01-01T${formData.get(
      "dayFridayStart"
    )}:00.000Z`;
    const dayFridayEnd = `1970-01-01T${formData.get("dayFridayEnd")}:00.000Z`;
    const daySaturdayStart = `1970-01-01T${formData.get(
      "daySaturdayStart"
    )}:00.000Z`;
    const daySaturdayEnd = `1970-01-01T${formData.get(
      "daySaturdayEnd"
    )}:00.000Z`;
    const daySundayStart = `1970-01-01T${formData.get(
      "daySundayStart"
    )}:00.000Z`;
    const daySundayEnd = `1970-01-01T${formData.get("daySundayEnd")}:00.000Z`;

    const manager =
      managerId === "empty" ? undefined : { connect: { managerId: managerId } };

    const jwtToken = user?.jwtToken;
    const res = await api.post(
      "/restaurant",
      {
        geoLat: Number(geoLat),
        geoLon: Number(geoLon),
        manager: manager,
        address: {
          create: {
            street: street,
            streetNo: streetNo,
            city: city,
            postalCode: postalCode,
            country: country,
          },
        },
        openingHours: {
          create: [
            {
              weekday: "Monday",
              startHourUtc: dayMondayStart,
              endHourUtc: dayMondayEnd,
            },
            {
              weekday: "Tuesday",
              startHourUtc: dayTuesdayStart,
              endHourUtc: dayTuesdayEnd,
            },
            {
              weekday: "Wednesday",
              startHourUtc: dayWednesdayStart,
              endHourUtc: dayWednesdayEnd,
            },
            {
              weekday: "Thursday",
              startHourUtc: dayThursdayStart,
              endHourUtc: dayThursdayEnd,
            },
            {
              weekday: "Friday",
              startHourUtc: dayFridayStart,
              endHourUtc: dayFridayEnd,
            },
            {
              weekday: "Saturday",
              startHourUtc: daySaturdayStart,
              endHourUtc: daySaturdayEnd,
            },
            {
              weekday: "Sunday",
              startHourUtc: daySundayStart,
              endHourUtc: daySundayEnd,
            },
          ],
        },
        photoUrl: photoUrl,
        phoneNumber: phoneNumber,
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

    console.log(res);

    if (res.status === 201) {
      setRestaurantData((restaurantData) => [
        ...restaurantData,
        res.data?.restaurant,
      ]);
    }

    e.target.reset();
    setShowAddModal(false);
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const geoLat = formData.get("geoLat");
    const geoLon = formData.get("geoLon");
    const managerId = formData.get("managerId");
    const street = formData.get("street");
    const streetNo = formData.get("streetNo");
    const city = formData.get("city");
    const postalCode = formData.get("postalCode");
    const country = formData.get("country");
    const photoUrl = formData.get("photoUrl");
    const phoneNumber = formData.get("phoneNumber");

    const dayMondayStart = `1970-01-01T${formData.get(
      "dayMondayStart"
    )}:00.000Z`;
    const dayMondayEnd = `1970-01-01T${formData.get("dayMondayEnd")}:00.000Z`;
    const dayTuesdayStart = `1970-01-01T${formData.get(
      "dayTuesdayStart"
    )}:00.000Z`;
    const dayTuesdayEnd = `1970-01-01T${formData.get("dayTuesdayEnd")}:00.000Z`;
    const dayWednesdayStart = `1970-01-01T${formData.get(
      "dayWednesdayStart"
    )}:00.000Z`;
    const dayWednesdayEnd = `1970-01-01T${formData.get(
      "dayWednesdayEnd"
    )}:00.000Z`;
    const dayThursdayStart = `1970-01-01T${formData.get(
      "dayThursdayStart"
    )}:00.000Z`;
    const dayThursdayEnd = `1970-01-01T${formData.get(
      "dayThursdayEnd"
    )}:00.000Z`;
    const dayFridayStart = `1970-01-01T${formData.get(
      "dayFridayStart"
    )}:00.000Z`;
    const dayFridayEnd = `1970-01-01T${formData.get("dayFridayEnd")}:00.000Z`;
    const daySaturdayStart = `1970-01-01T${formData.get(
      "daySaturdayStart"
    )}:00.000Z`;
    const daySaturdayEnd = `1970-01-01T${formData.get(
      "daySaturdayEnd"
    )}:00.000Z`;
    const daySundayStart = `1970-01-01T${formData.get(
      "daySundayStart"
    )}:00.000Z`;
    const daySundayEnd = `1970-01-01T${formData.get("daySundayEnd")}:00.000Z`;

    const manager =
      managerId === "empty" ? undefined : { connect: { managerId: managerId } };

    const jwtToken = user?.jwtToken;
    const res = await api.patch(
      `/restaurant/${selectedRestaurant?.restaurantId}`,
      {
        geoLat: Number(geoLat),
        geoLon: Number(geoLon),
        manager: manager,
        address: {
          create: {
            street: street,
            streetNo: streetNo,
            city: city,
            postalCode: postalCode,
            country: country,
          },
        },
        openingHours: {
          create: [
            {
              weekday: "Monday",
              startHourUtc: dayMondayStart,
              endHourUtc: dayMondayEnd,
            },
            {
              weekday: "Tuesday",
              startHourUtc: dayTuesdayStart,
              endHourUtc: dayTuesdayEnd,
            },
            {
              weekday: "Wednesday",
              startHourUtc: dayWednesdayStart,
              endHourUtc: dayWednesdayEnd,
            },
            {
              weekday: "Thursday",
              startHourUtc: dayThursdayStart,
              endHourUtc: dayThursdayEnd,
            },
            {
              weekday: "Friday",
              startHourUtc: dayFridayStart,
              endHourUtc: dayFridayEnd,
            },
            {
              weekday: "Saturday",
              startHourUtc: daySaturdayStart,
              endHourUtc: daySaturdayEnd,
            },
            {
              weekday: "Sunday",
              startHourUtc: daySundayStart,
              endHourUtc: daySundayEnd,
            },
          ],
        },
        photoUrl: photoUrl,
        phoneNumber: phoneNumber,
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

    if (res.status === 200) {
      setRestaurantData((restaurantData) =>
        restaurantData.map((restaurant) =>
          restaurant?.restaurantId === res.data?.restaurant?.restaurantId
            ? res.data?.restaurant
            : restaurant
        )
      );
    }

    setShowEditModal(false);
  };

  const handleDelete = async (restaurantId) => {
    const jwtToken = user?.jwtToken;
    const res = await api.delete(`/restaurant/${restaurantId}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    if (res.status === 200) {
      setRestaurantData((restaurantData) =>
        restaurantData.filter(
          (restaurant) => restaurant?.restaurantId !== restaurantId
        )
      );
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">Restaurants</h1>
      <div className="flex w-full justify-end">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-max rounded-lg border border-gray-700 bg-rose-400 px-3 py-1 text-base text-white hover:bg-rose-500 hover:text-white"
        >
          Add
        </button>
      </div>
      <ul className="mx-auto flex w-full flex-col  gap-2">
        {restaurantData?.map((restaurant) => (
          <li
            key={restaurant?.restaurantId}
            className="flex w-full items-center gap-3 rounded-lg border border-gray-700 bg-orange-100 p-1 pr-3"
          >
            <img
              src={restaurant?.photoUrl}
              alt={restaurant?.name}
              className="aspect-square w-12 rounded-lg border-2 border-gray-700"
            />
            <span className="w-full text-xl font-bold">
              {restaurant?.address?.street} {restaurant?.address?.streetNo},{" "}
              {restaurant?.address?.city}
            </span>
            <div className="flex w-max items-center justify-end gap-4">
              <button
                onClick={() => {
                  setSelectedRestaurant(restaurant);
                  setShowEditModal(true);
                }}
                className="w-max rounded-lg border border-rose-400 px-3 py-1 text-base text-rose-400 hover:bg-rose-500 hover:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(restaurant?.restaurantId)}
                className="w-max rounded-lg border border-rose-400 px-3 py-1 text-base text-rose-400 hover:bg-rose-500 hover:text-white"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <FormModal showModal={showAddModal} setShowModal={setShowAddModal}>
        <form className="p-4" onSubmit={handleAdd}>
          <div className="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="street" className="text-gray-500">
                Street:
              </label>
              <input
                type="text"
                name="street"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="streetNo" className="text-gray-500">
                Street Number:{" "}
              </label>
              <input
                type="text"
                name="streetNo"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="city" className="text-gray-500">
                City:{" "}
              </label>
              <input
                type="text"
                name="city"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="postalCode" className="text-gray-500">
                Postal Code:
              </label>
              <input
                type="text"
                min={0}
                name="postalCode"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="country" className="text-gray-500">
                Country:{" "}
              </label>
              <input
                type="text"
                name="country"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="photoUrl" className="text-gray-500">
                Photo Url:{" "}
              </label>
              <input
                type="text"
                name="photoUrl"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="phoneNumber" className="text-gray-500">
                Phone Number:{" "}
              </label>
              <input
                type="text"
                name="phoneNumber"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="geoLat" className="text-gray-500">
                Latitude:
              </label>
              <input
                type="number"
                step={0.0000000000000001}
                name="geoLat"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="geoLon" className="text-gray-500">
                Longitude:
              </label>
              <input
                type="number"
                step={0.0000000000000001}
                name="geoLon"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="managerId" className="text-gray-500">
                Manager:
              </label>
              <select
                name="managerId"
                required
                className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700 focus:border-gray-700 focus:ring-0"
              >
                <option value={"empty"} className="bg-orange-100">
                  Empty
                </option>
                {managers?.map((manager) => (
                  <option
                    key={manager?.managerId}
                    value={manager?.managerId}
                    className="bg-orange-100"
                  >
                    {manager?.employee?.firstName?.charAt(0)?.toUpperCase() +
                      manager?.employee?.firstName?.slice(1)}{" "}
                    {manager?.employee?.lastName?.charAt(0)?.toUpperCase() +
                      manager?.employee?.lastName?.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Monday:</p>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="dayMondayStart"
                  required
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />
                <span>-</span>
                <input
                  type="time"
                  name="dayMondayEnd"
                  required
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Tuesday:</p>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="dayTuesdayStart"
                  required
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />
                <span>-</span>
                <input
                  type="time"
                  name="dayTuesdayEnd"
                  required
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Wednesday:</p>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="dayWednesdayStart"
                  required
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />
                <span>-</span>
                <input
                  type="time"
                  name="dayWednesdayEnd"
                  required
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Thursday:</p>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="dayThursdayStart"
                  required
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />
                <span>-</span>
                <input
                  type="time"
                  name="dayThursdayEnd"
                  required
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Friday:</p>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="dayFridayStart"
                  required
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />
                <span>-</span>
                <input
                  type="time"
                  name="dayFridayEnd"
                  required
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Saturday:</p>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="daySaturdayStart"
                  required
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />
                <span>-</span>
                <input
                  type="time"
                  name="daySaturdayEnd"
                  required
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Sunday:</p>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="daySundayStart"
                  required
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />
                <span>-</span>
                <input
                  type="time"
                  name="daySundayEnd"
                  required
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />{" "}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button
              type="submit"
              className="mt-8 w-max rounded-lg bg-rose-400 px-10 py-1 text-base text-white hover:bg-rose-500"
            >
              Add
            </button>
          </div>
        </form>
      </FormModal>
      <FormModal showModal={showEditModal} setShowModal={setShowEditModal}>
        <form className="p-4" onSubmit={handleEdit}>
          <div className="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="street" className="text-gray-500">
                Street:
              </label>
              <input
                type="text"
                name="street"
                defaultValue={selectedRestaurant?.address?.street}
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="streetNo" className="text-gray-500">
                Street Number:{" "}
              </label>
              <input
                type="text"
                name="streetNo"
                required
                defaultValue={selectedRestaurant?.address?.streetNo}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="city" className="text-gray-500">
                City:{" "}
              </label>
              <input
                type="text"
                name="city"
                required
                defaultValue={selectedRestaurant?.address?.city}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="postalCode" className="text-gray-500">
                Postal Code:
              </label>
              <input
                type="text"
                min={0}
                name="postalCode"
                required
                defaultValue={selectedRestaurant?.address?.postalCode}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="country" className="text-gray-500">
                Country:{" "}
              </label>
              <input
                type="text"
                name="country"
                required
                defaultValue={selectedRestaurant?.address?.country}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="photoUrl" className="text-gray-500">
                Photo Url:{" "}
              </label>
              <input
                type="text"
                name="photoUrl"
                required
                defaultValue={selectedRestaurant?.photoUrl}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="phoneNumber" className="text-gray-500">
                Phone Number:{" "}
              </label>
              <input
                type="text"
                name="phoneNumber"
                required
                defaultValue={selectedRestaurant?.phoneNumber}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="geoLat" className="text-gray-500">
                Latitude:
              </label>
              <input
                type="number"
                name="geoLat"
                step={0.0000000000000001}
                required
                defaultValue={selectedRestaurant?.geoLat}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="geoLon" className="text-gray-500">
                Longitude:
              </label>
              <input
                type="number"
                step={0.0000000000000001}
                name="geoLon"
                required
                defaultValue={selectedRestaurant?.geoLon}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="managerId" className="text-gray-500">
                Manager:
              </label>
              <select
                name="managerId"
                required
                className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700 focus:border-gray-700 focus:ring-0"
              >
                <option
                  value={"empty"}
                  selected={selectedRestaurant?.managerId === null}
                  className="bg-orange-100"
                >
                  Empty
                </option>
                {managers?.map((manager) => (
                  <option
                    key={manager?.managerId}
                    value={manager?.managerId}
                    selected={
                      manager?.managerId === selectedRestaurant?.managerId
                    }
                    className="bg-orange-100"
                  >
                    {manager?.employee?.firstName?.charAt(0)?.toUpperCase() +
                      manager?.employee?.firstName?.slice(1)}{" "}
                    {manager?.employee?.lastName?.charAt(0)?.toUpperCase() +
                      manager?.employee?.lastName?.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Monday:</p>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="dayMondayStart"
                  required
                  value={new Date(
                    selectedRestaurant?.openingHours?.find(
                      (day) => day?.weekday === "Monday"
                    )?.startHourUtc
                  ).toLocaleTimeString("en", {
                    timeStyle: "short",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />
                <span>-</span>
                <input
                  type="time"
                  name="dayMondayEnd"
                  required
                  value={new Date(
                    selectedRestaurant?.openingHours?.find(
                      (day) => day?.weekday === "Monday"
                    )?.endHourUtc
                  ).toLocaleTimeString("en", {
                    timeStyle: "short",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Tuesday:</p>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="dayTuesdayStart"
                  required
                  value={new Date(
                    selectedRestaurant?.openingHours?.find(
                      (day) => day?.weekday === "Tuesday"
                    )?.startHourUtc
                  ).toLocaleTimeString("en", {
                    timeStyle: "short",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />
                <span>-</span>
                <input
                  type="time"
                  name="dayTuesdayEnd"
                  required
                  value={new Date(
                    selectedRestaurant?.openingHours?.find(
                      (day) => day?.weekday === "Tuesday"
                    )?.endHourUtc
                  ).toLocaleTimeString("en", {
                    timeStyle: "short",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Wednesday:</p>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="dayWednesdayStart"
                  required
                  value={new Date(
                    selectedRestaurant?.openingHours?.find(
                      (day) => day?.weekday === "Wednesday"
                    )?.startHourUtc
                  ).toLocaleTimeString("en", {
                    timeStyle: "short",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />
                <span>-</span>
                <input
                  type="time"
                  name="dayWednesdayEnd"
                  required
                  value={new Date(
                    selectedRestaurant?.openingHours?.find(
                      (day) => day?.weekday === "Wednesday"
                    )?.endHourUtc
                  ).toLocaleTimeString("en", {
                    timeStyle: "short",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Thursday:</p>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="dayThursdayStart"
                  required
                  value={new Date(
                    selectedRestaurant?.openingHours?.find(
                      (day) => day?.weekday === "Thursday"
                    )?.startHourUtc
                  ).toLocaleTimeString("en", {
                    timeStyle: "short",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />
                <span>-</span>
                <input
                  type="time"
                  name="dayThursdayEnd"
                  required
                  value={new Date(
                    selectedRestaurant?.openingHours?.find(
                      (day) => day?.weekday === "Thursday"
                    )?.endHourUtc
                  ).toLocaleTimeString("en", {
                    timeStyle: "short",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Friday:</p>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="dayFridayStart"
                  required
                  value={new Date(
                    selectedRestaurant?.openingHours?.find(
                      (day) => day?.weekday === "Friday"
                    )?.startHourUtc
                  ).toLocaleTimeString("en", {
                    timeStyle: "short",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />
                <span>-</span>
                <input
                  type="time"
                  name="dayFridayEnd"
                  required
                  value={new Date(
                    selectedRestaurant?.openingHours?.find(
                      (day) => day?.weekday === "Friday"
                    )?.endHourUtc
                  ).toLocaleTimeString("en", {
                    timeStyle: "short",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Saturday:</p>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="daySaturdayStart"
                  required
                  value={new Date(
                    selectedRestaurant?.openingHours?.find(
                      (day) => day?.weekday === "Saturday"
                    )?.startHourUtc
                  ).toLocaleTimeString("en", {
                    timeStyle: "short",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />
                <span>-</span>
                <input
                  type="time"
                  name="daySaturdayEnd"
                  required
                  value={new Date(
                    selectedRestaurant?.openingHours?.find(
                      (day) => day?.weekday === "Saturday"
                    )?.endHourUtc
                  ).toLocaleTimeString("en", {
                    timeStyle: "short",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Sunday:</p>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="daySundayStart"
                  required
                  value={new Date(
                    selectedRestaurant?.openingHours?.find(
                      (day) => day?.weekday === "Sunday"
                    )?.startHourUtc
                  ).toLocaleTimeString("en", {
                    timeStyle: "short",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />
                <span>-</span>
                <input
                  type="time"
                  name="daySundayEnd"
                  required
                  value={new Date(
                    selectedRestaurant?.openingHours?.find(
                      (day) => day?.weekday === "Sunday"
                    )?.endHourUtc
                  ).toLocaleTimeString("en", {
                    timeStyle: "short",
                    hour12: false,
                    timeZone: "UTC",
                  })}
                  className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
                />{" "}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button
              type="submit"
              className="mt-8 w-max rounded-lg bg-rose-400 px-10 py-1 text-base text-white hover:bg-rose-500"
            >
              Update
            </button>
          </div>
        </form>
      </FormModal>
    </div>
  );
};

export default RestaurantsPanel;
