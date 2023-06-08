import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { getClientsOrdersByRestaurant } from "~/models/order.server";
import { getUserInformation } from "~/models/user.server";
import { UserContext } from "~/root";
import { api } from "~/utils/api";

const statuses: any = {
  EMPLOYEE: [
    "NOT_APPROVED",
    "APPROVED",
    "IN_PROGRESS",
    "DELIVERY",
    "EMPLOYEE_CANCELLED",
  ],
  DELIVERY: ["DELIVERY", "COMPLETED"],
};

const ordersFake = [...Array(10).keys()].map((key) => ({
  id: key,
  createdAt: "2023-06-08T12:25:57.958Z",
  updatedAt: "2023-06-08T12:25:57.958Z",
  status: "NOT_APPROVED",
  userEmail: "string",
  address: {
    street: "string",
    houseNumber: 0,
    apartment: 0,
    city: "string",
    country: "string",
  },
  restaurantId: "string",
  orderedItems: [
    [
      {
        itemId: 0,
        name: "string",
        photoUrl: "string",
        description: "string",
        ingredients: "string",
        quantity: 0,
        price: 0,
      },
    ],
  ],
  totalPrice: 0,
  currency: "string",
}));

export const meta: V2_MetaFunction = () => [{ title: "Employee Panel" }];

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css",
  },
];

export const loader: LoaderFunction = async () => {
  const user = await getUserInformation();
  let orders = [];
  if (user?.employeeData?.restaurantId) {
    orders = await getClientsOrdersByRestaurant(
      user?.employeeData?.restaurantId
    );
  }
  return json({ user, orders });
};

const InfoItem = ({ big, label, value }: any) => {
  return (
    <div
      className={clsx("flex items-center gap-2", big ? "text-lg" : "text-sm")}
    >
      <p className="font-semibold text-gray-500">{`${label}:`}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
};

const OrderItem = ({ order, onChange, role }: any) => {
  const date = dayjs(order.createdAt).format("DD.MM.YYYY");
  const { street, houseNumber, apartment } = order.address;
  const addressLine = `${street} ${houseNumber}${
    apartment ? `/${apartment}` : ""
  }`;
  console.log(order.orderedItems);

  return (
    <div className="flex items-start justify-between gap-8 rounded-2xl bg-orange-200 px-10 py-6">
      <div className="flex flex-col gap-1">
        <div className="mb-2 flex items-center gap-3">
          <p className="text-lg font-bold">{`Zamówienie #${order.id}`}</p>
          <div className="rounded-xl bg-rose-500 px-2 py-1">
            <span className="block text-xs font-bold text-white">
              {order.status}
            </span>
          </div>
        </div>
        <InfoItem label="Order date" value={date} />
        <InfoItem label="Restaurant ID" value={order.restaurantId} />
        <InfoItem label="Street and house number" value={addressLine} />
        <InfoItem label="City" value={order.address.city} />
        <InfoItem label="Country" value={order.address.country} />
        <div className="my-2 h-[1px] bg-orange-900"></div>
        <p className="text-sm font-semibold text-gray-500">Ordered items:</p>
        <ul className="ml-4 list-disc text-sm font-bold">
          {order.orderedItems.map((item: any) => (
            <li key={item.id}>
              {item.name}
              <span className="text-gray-500">{` (${item.quantity} quantity)`}</span>
            </li>
          ))}
        </ul>
      </div>
      <select
        className="rounded-lg border-4 border-rose-400 bg-orange-100 bg-transparent p-2 font-bold focus:border-rose-500 focus:ring-0"
        defaultValue={order.status}
        name="status"
        onChange={onChange}
      >
        {statuses[role].map((status: any, index: number) => {
          const roleIndex = statuses[role].findIndex(
            (status: any) => status === order.status
          );

          if (roleIndex !== -1 && index < roleIndex) return null;

          return (
            <option key={status} className="bg-rose-300" value={status}>
              {status}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default function EmployeePanelRoute() {
  const {
    user: userRes,
    orders: { orders: ordersData },
  } = useLoaderData();
  const { jwtToken } = useContext(UserContext) as any;
  const configEssunia = {
    headers: { Authorization: `Bearer ${jwtToken}` },
  };
  const [orders, setOrders] = useState(ordersData);
  const { userData: user, employeeData: employee } = userRes;

  const handleChange = async (id: any, value: any) => {
    try {
      await api.patch(`/order/${id}/${value}`, undefined, configEssunia);
      const res = await api.get(
        `/order/restaurant/${employee.restaurantId}`,
        configEssunia
      );
      setOrders(res.data.orders);
    } catch {}
  };

  return (
    <div className="mb-12 mt-8 flex w-5/6 max-w-screen-lg flex-col gap-9 rounded-xl border-rose-300 bg-orange-100 p-4 md:w-4/6">
      <h1 className=" w-full text-center text-2xl font-bold text-rose-400 sm:text-4xl lg:col-span-2 lg:text-5xl">
        Employee Panel
      </h1>
      <h2 className="text-center text-2xl font-bold text-gray-500">
        Your account
      </h2>
      <div className="flex flex-col gap-2 px-6">
        <InfoItem big label="User ID" value={user.userId} />
        <InfoItem big label="E-mail address" value={user.userEmail} />
        <InfoItem big label="Role" value={user.userRole} />
        <InfoItem big label="Restaurant ID" value={employee?.restaurantId} />
      </div>
      <h2 className="text-center text-2xl font-bold text-gray-500">Orders</h2>
      <div className="h-full min-h-[600px] w-full break-all">
        <div className="flex flex-col gap-6">
          {!!orders.length &&
            orders.map((order: any) => {
              if (user.userRole === "DELIVERY" && order.status !== "DELIVERY") {
                return null;
              }

              if (
                user.userRole === "EMPLOYEE" &&
                (order.status === "COMPLETED" || order.status === "DELIVERY")
              ) {
                return null;
              }

              return (
                <OrderItem
                  key={order.id}
                  role={user.userRole}
                  order={order}
                  onChange={(e: any) => handleChange(order.id, e.target.value)}
                />
              );
            })}
          {!orders.length && (
            <p className="px-6 text-gray-500">No orders in this restaurant</p>
          )}
        </div>
      </div>
    </div>
  );
}
