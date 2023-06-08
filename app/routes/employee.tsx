import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import dayjs from "dayjs";
import { getUserInformation } from "~/models/user.server";

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
  // const orders = await getClientsPendingOrders();

  return json({ user, orders: ordersFake });
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

const OrderItem = ({ order }: any) => {
  const date = dayjs(order.createdAt).format("DD.MM.YYYY");

  return (
    <div className="flex gap-8 rounded-2xl bg-orange-200 px-10 py-6 hover:bg-orange-300">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <p className="text-lg font-bold">{`Zamówienie #${order.id}`}</p>
          <div className="rounded-xl bg-rose-500 px-2 py-1">
            <span className="block text-xs font-bold text-white">
              {order.status}
            </span>
          </div>
        </div>
        <InfoItem label="Data złożenia" value={date} />
        <InfoItem label="ID restauracji" value={order.restaurantId} />
        <InfoItem label="Adres" value={JSON.stringify(order.address)} />
      </div>
    </div>
  );
};

export default function EmployeePanelRoute() {
  const { user: userRes, orders } = useLoaderData();
  const { userData: user, employeeData: employee } = userRes;

  console.log(employee);

  // userData: {
  //   userId: '73f74fa2-a75a-4362-8c19-9610150400c6',
  //   createdAt: '2023-06-08T11:51:14.877Z',
  //   userEmail: '236614@edu.p.lodz.pl',
  //   userRole: 'CLIENT',
  //   loyaltyPoints: 0
  // }

  return (
    <div className="mb-12 mt-8 flex w-5/6 max-w-screen-lg flex-col gap-9 rounded-xl border-rose-300 bg-orange-100 p-4 md:w-4/6">
      <h1 className=" w-full text-center text-2xl font-bold text-rose-400 sm:text-4xl lg:col-span-2 lg:text-5xl">
        Employee Panel
      </h1>
      <h2 className="text-center text-2xl font-bold text-gray-500">
        Twoje konto
      </h2>
      <div className="flex flex-col gap-2 px-4">
        <InfoItem big label="ID użytkownika" value={user.userId} />
        <InfoItem big label="Adres e-mail" value={user.userEmail} />
        <InfoItem big label="Rola" value={user.userRole} />
        <InfoItem big label="ID restauracji" value={employee.restaurantId} />
      </div>
      <h2 className="text-center text-2xl font-bold text-gray-500">
        Zamówienia
      </h2>
      <div className="h-full min-h-[600px] w-full break-all">
        <div className="flex flex-col gap-6">
          {orders.map((order: any) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
