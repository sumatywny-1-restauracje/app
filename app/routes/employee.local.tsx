import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import { useContext } from "react";
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

export const meta: V2_MetaFunction = () => [{ title: "Employee Local" }];

export const loader: LoaderFunction = async () => {
  const user = await getUserInformation();
  const userRole = user?.userData?.userRole;
  let ordersData = {};
  if (user?.employeeData?.restaurantId) {
    ordersData = await getClientsOrdersByRestaurant(
      user?.employeeData?.restaurantId
    );
  }

  const preparedOrders = ordersData?.orders?.filter((order: any) => {
    if (userRole === "DELIVERY" && order?.status !== "DELIVERY") {
      return false;
    }

    if (
      userRole === "EMPLOYEE" &&
      (order?.status === "COMPLETED" ||
        order?.status === "DELIVERY" ||
        order?.status === "EMPLOYEE_CANCELLED" ||
        order?.status === "CLIENT_CANCELLED")
    ) {
      return false;
    }

    return true;
  });

  return json({ user: user, ordersData: preparedOrders });
};

export default function EmployeeLocalRoute() {
  const data = useLoaderData();
  const userRole = data?.user?.userData?.userRole;
  const { jwtToken } = useContext(UserContext) as any;
  const configEssunia = {
    headers: { Authorization: `Bearer ${jwtToken}` },
  };

  const handleChange = async (id: string, value: string) => {
    try {
      await api.patch(`/order/${id}/${value}`, {}, configEssunia);
      const res = await api.get(
        `/order/restaurant/${data?.user?.userData?.employee?.restaurantId}`,
        configEssunia
      );
      window.location.reload();
    } catch {}
  };

  return (
    <div className="mb-12 mt-8 flex w-5/6 max-w-screen-lg flex-col items-center justify-center gap-5 rounded-xl border-rose-300 bg-orange-100 py-6 md:w-4/6 lg:flex-row">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="h-full w-full flex-1 px-4">
          <h2 className="text-center text-2xl font-bold text-gray-500">
            Orders
          </h2>
          <ul className="mx-auto mt-4 flex w-full flex-col gap-6">
            {data?.ordersData.map((order: any) => {
              return (
                <li
                  key={order?.id}
                  className="flex w-full flex-col items-center gap-3 rounded-lg border-2 border-gray-700 bg-orange-100 py-2"
                >
                  <div className="flex w-full items-end justify-between px-4">
                    <div className="flex flex-col gap-4">
                      <span className="w-full text-xl font-bold">
                        Order ID: {order?.id}
                      </span>
                      <p className="w-max rounded-xl border-2 border-gray-600 px-4 py-2 text-lg font-bold capitalize text-gray-600 max-sm:text-sm">
                        {order?.status?.includes("_")
                          ? order?.status?.replace("_", " ")
                          : order?.status}
                      </p>
                    </div>
                    <div className="flex w-max justify-end gap-4">
                      <form>
                        <select
                          className="h-max rounded-xl border-4 border-rose-400 bg-orange-100 bg-transparent p-2 font-bold focus:border-rose-500 focus:ring-0"
                          name="status"
                          onChange={(e) =>
                            handleChange(order?.id, e.target.value)
                          }
                        >
                          {statuses[userRole].map((status, index) => {
                            const roleIndex = statuses[userRole].findIndex(
                              (status: any) => status === order.status
                            );

                            if (roleIndex !== -1 && index < roleIndex)
                              return null;
                            return (
                              <option
                                key={status}
                                className="bg-rose-300"
                                value={status}
                                selected={order?.status === status}
                              >
                                {status?.includes("_")
                                  ? status?.replace("_", " ")
                                  : status}
                              </option>
                            );
                          })}
                        </select>
                      </form>
                    </div>
                  </div>
                  <div className="my-1 w-full border border-gray-700" />
                  <div className="flex flex-col">
                    <p className="mx-auto text-sm font-semibold text-gray-700">
                      Date: {dayjs(order.createdAt).format("DD.MM.YYYY HH:mm")}
                    </p>
                    <p className="mx-auto mt-4 text-sm font-bold text-gray-700">
                      Ordered items:
                    </p>
                    <ul className="ml-4 mt-1 list-disc text-sm font-bold">
                      {order?.orderedItems.map((item: any) => (
                        <li key={item.id} className="flex flex-wrap">
                          {item.quantity} {item.name}
                          <span className="text-gray-500">{` (${item.ingredients})`}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
            {!data?.ordersData.length && (
              <p className="mx-auto px-6 text-gray-500">No new orders</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
