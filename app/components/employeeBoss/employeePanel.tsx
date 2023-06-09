import { useState } from "react";

const EmployeePanel = ({ employees, restaurants }: any) => {
  const [currentRestaurant, setCurrentRestaurant] = useState(
    restaurants?.[0]?.restaurantId
  );

  console.log(employees[0]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">Employees</h1>
      <div className="flex w-full justify-end gap-4">
        <select
          className="w-max rounded-lg border border-rose-400 bg-inherit px-3 py-1 text-base text-rose-400 focus:border-rose-400 focus:ring-0"
          defaultValue={currentRestaurant || "Restaurants"}
          onChange={(e) => setCurrentRestaurant(e.target.value)}
        >
          {restaurants?.map((restaurant) => (
            <option
              key={restaurant?.restaurantId}
              value={restaurant?.restaurantId}
              className="bg-orange-100"
            >
              {restaurant?.address?.street} {restaurant?.address?.streetNo},{" "}
              {restaurant?.address?.city}
            </option>
          ))}
        </select>
        <button className="w-max rounded-lg border border-gray-700 bg-rose-400 px-3 py-1 text-base text-white hover:bg-rose-500 hover:text-white">
          Add
        </button>
      </div>
      <ul className="mx-auto flex w-full flex-col  gap-2">
        {employees
          ?.filter(
            (employee) =>
              employee?.restaurant?.restaurantId === currentRestaurant
          )
          ?.map((employee) => (
            <li
              key={employee?.employeeId}
              className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-700 bg-orange-100 p-1 pr-3"
            >
              <div className="flex w-full gap-1">
                <span className="w-max text-sm font-semibold">
                  {employee?.firstName?.charAt(0)?.toUpperCase() +
                    employee?.firstName?.slice(1)}
                </span>
                <span className="w-max text-sm font-semibold">
                  {employee?.lastName?.charAt(0)?.toUpperCase() +
                    employee?.lastName?.slice(1)}
                </span>
                <span className="w-max text-sm font-semibold text-gray-500">
                  ({employee?.restaurant?.address?.street}{" "}
                  {employee?.restaurant?.address?.streetNo},{" "}
                  {employee?.restaurant?.address?.city})
                </span>
              </div>
              <div className="flex w-max items-center justify-end gap-4">
                <button className="w-max rounded-lg border border-rose-400 px-3 py-1 text-base text-rose-400 hover:bg-rose-500 hover:text-white">
                  Edit
                </button>
                <button className="w-max rounded-lg border border-rose-400 px-3 py-1 text-base text-rose-400 hover:bg-rose-500 hover:text-white">
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default EmployeePanel;
