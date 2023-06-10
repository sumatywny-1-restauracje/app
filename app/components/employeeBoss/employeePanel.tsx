import { useState, useContext } from "react";
import FormModal from "./FormModal";
import { api } from "~/utils/api";
import { UserContext } from "~/root";

const EmployeePanel = ({ employees, restaurants, jobs }: any) => {
  const user = useContext(UserContext);
  const [currentRestaurant, setCurrentRestaurant] = useState(
    restaurants?.[0]?.restaurantId
  );
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [employeesData, setEmployeesData] = useState(employees);

  const [selectedJobTitle, setSelectedJobTitle] = useState(
    jobs?.find((job) => job?.title === "Chef")?.id
  );

  const handleAdd = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const street = formData.get("street");
    const streetNo = formData.get("streetNo");
    const city = formData.get("city");
    const postalCode = formData.get("postalCode");
    const country = formData.get("country");
    const userEmail = formData.get("userEmail");
    const restaurantId = formData.get("restaurantId");
    const jobId = formData.get("jobId");
    const salary = formData.get("salary");

    const xd = await api.post("/auth/signin", {
      email: userEmail,
    });

    const jwtToken = user?.jwtToken;
    const res = await api.post(
      "/employee",
      {
        firstName: firstName,
        lastName: lastName,
        address: {
          create: {
            street: street,
            streetNo: streetNo,
            city: city,
            postalCode: postalCode,
            country: country,
          },
        },
        user: {
          connect: {
            userEmail: userEmail,
          },
        },
        restaurant: {
          connect: {
            restaurantId: restaurantId,
          },
        },
        job: {
          connect: {
            jobId: jobId,
          },
        },
        salary: Number(salary),
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

    if (res.status === 201) {
      setEmployeesData((employeesData) => [
        ...employeesData,
        res.data?.employeeData,
      ]);
    }

    e.target.reset();
    setShowAddModal(false);
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const street = formData.get("street");
    const streetNo = formData.get("streetNo");
    const city = formData.get("city");
    const postalCode = formData.get("postalCode");
    const country = formData.get("country");
    const restaurantId = formData.get("restaurantId");
    const jobId = formData.get("jobId");
    const salary = formData.get("salary");

    const jwtToken = user?.jwtToken;
    const res = await api.patch(
      `/employee/${selectedEmployee?.employeeId}`,
      {
        firstName: firstName,
        lastName: lastName,
        address: {
          create: {
            street: street,
            streetNo: streetNo,
            city: city,
            postalCode: postalCode,
            country: country,
          },
        },
        restaurant: {
          connect: {
            restaurantId: restaurantId,
          },
        },
        job: {
          connect: {
            jobId: jobId,
          },
        },
        salary: Number(salary),
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

    if (res.status === 200) {
      setEmployeesData((employeesData) =>
        employeesData.map((employee) =>
          employee?.employeeId === res.data?.employeeData?.employeeId
            ? res.data?.employeeData
            : employee
        )
      );
    }

    setShowEditModal(false);
  };

  const handleDelete = async (employeeId) => {
    const jwtToken = user?.jwtToken;
    const res = await api.delete(`/employee/${employeeId}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    if (res.status === 200) {
      setEmployeesData((employeesData) =>
        employeesData.filter((employee) => employee?.employeeId !== employeeId)
      );
    }
  };

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
        <button
          onClick={() => setShowAddModal(true)}
          className="w-max rounded-lg border border-gray-700 bg-rose-400 px-3 py-1 text-base text-white hover:bg-rose-500 hover:text-white"
        >
          Add
        </button>
      </div>
      <ul className="mx-auto flex w-full flex-col  gap-2">
        {employeesData
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
                  (
                  {
                    restaurants?.find(
                      (restaurant) =>
                        restaurant?.restaurantId ===
                        employee?.restaurant?.restaurantId
                    )?.address?.street
                  }{" "}
                  {
                    restaurants?.find(
                      (restaurant) =>
                        restaurant?.restaurantId ===
                        employee?.restaurant?.restaurantId
                    )?.address?.streetNo
                  }
                  ,{" "}
                  {
                    restaurants?.find(
                      (restaurant) =>
                        restaurant?.restaurantId ===
                        employee?.restaurant?.restaurantId
                    )?.address?.city
                  }
                  )
                </span>
              </div>
              <div className="flex w-max items-center justify-end gap-4">
                <button
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setSelectedJobTitle(employee?.job?.jobId);
                    setShowEditModal(true);
                  }}
                  className="w-max rounded-lg border border-rose-400 px-3 py-1 text-base text-rose-400 hover:bg-rose-500 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee?.employeeId)}
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
              <label htmlFor="firstName" className="text-gray-500">
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="lastName" className="text-gray-500">
                Last Name:{" "}
              </label>
              <input
                type="text"
                name="lastName"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="street" className="text-gray-500">
                Street:{" "}
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
                Street Number:
              </label>
              <input
                type="text"
                min={0}
                name="streetNo"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />
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
                Postal Code:{" "}
              </label>
              <input
                type="text"
                name="postalCode"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
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
              <label htmlFor="userEmail" className="text-gray-500">
                Email:{" "}
              </label>
              <input
                type="email"
                name="userEmail"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="salary" className="text-gray-500">
                Salary:{" "}
              </label>
              <input
                type="number"
                name="salary"
                step={0.01}
                required
                min={
                  jobs?.find((job) => job?.id === selectedJobTitle)?.salary?.min
                }
                max={
                  jobs?.find((job) => job?.id === selectedJobTitle)?.salary?.max
                }
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="restaurantId" className="text-gray-500">
                Restaurant:
              </label>
              <select
                name="restaurantId"
                required
                className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700 focus:border-gray-700 focus:ring-0"
              >
                {restaurants?.map((restaurant) => (
                  <option
                    key={restaurant?.restaurantId}
                    value={restaurant?.restaurantId}
                    className="bg-orange-100"
                  >
                    {restaurant?.address?.street}{" "}
                    {restaurant?.address?.streetNo}, {restaurant?.address?.city}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="jobId" className="text-gray-500">
                Job Title:
              </label>
              <select
                name="jobId"
                required
                onChange={(e) => setSelectedJobTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700 focus:border-gray-700 focus:ring-0"
              >
                {jobs?.map((job) => (
                  <option
                    key={job?.id}
                    value={job?.id}
                    className="bg-orange-100"
                    selected={job?.id === selectedJobTitle}
                  >
                    {job?.title}
                  </option>
                ))}
              </select>
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
              <label htmlFor="firstName" className="text-gray-500">
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                defaultValue={selectedEmployee?.firstName}
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="lastName" className="text-gray-500">
                Last Name:{" "}
              </label>
              <input
                type="text"
                name="lastName"
                defaultValue={selectedEmployee?.lastName}
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="street" className="text-gray-500">
                Street:{" "}
              </label>
              <input
                type="text"
                name="street"
                required
                defaultValue={selectedEmployee?.address?.street}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="streetNo" className="text-gray-500">
                Street Number:
              </label>
              <input
                type="text"
                min={0}
                name="streetNo"
                required
                defaultValue={selectedEmployee?.address?.streetNo}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="city" className="text-gray-500">
                City:{" "}
              </label>
              <input
                type="text"
                name="city"
                required
                defaultValue={selectedEmployee?.address?.city}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="postalCode" className="text-gray-500">
                Postal Code:{" "}
              </label>
              <input
                type="text"
                name="postalCode"
                required
                defaultValue={selectedEmployee?.address?.postalCode}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="country" className="text-gray-500">
                Country:{" "}
              </label>
              <input
                type="text"
                name="country"
                required
                defaultValue={selectedEmployee?.address?.country}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="salary" className="text-gray-500">
                Salary:{" "}
              </label>
              <input
                type="number"
                name="salary"
                step={0.01}
                required
                defaultValue={selectedEmployee?.salary}
                min={
                  jobs?.find((job) => job?.id === selectedJobTitle)?.salary?.min
                }
                max={
                  jobs?.find((job) => job?.id === selectedJobTitle)?.salary?.max
                }
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="restaurantId" className="text-gray-500">
                Restaurant:
              </label>
              <select
                name="restaurantId"
                required
                className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700 focus:border-gray-700 focus:ring-0"
              >
                {restaurants?.map((restaurant) => (
                  <option
                    key={restaurant?.restaurantId}
                    value={restaurant?.restaurantId}
                    selected={
                      restaurant?.restaurantId ===
                      selectedEmployee?.restaurant?.restaurantId
                    }
                    className="bg-orange-100"
                  >
                    {restaurant?.address?.street}{" "}
                    {restaurant?.address?.streetNo}, {restaurant?.address?.city}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="jobId" className="text-gray-500">
                Job Title:
              </label>
              <select
                name="jobId"
                required
                onChange={(e) => setSelectedJobTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700 focus:border-gray-700 focus:ring-0"
              >
                {jobs?.map((job) => (
                  <option
                    key={job?.id}
                    value={job?.id}
                    selected={job?.id === selectedJobTitle}
                    className="bg-orange-100"
                  >
                    {job?.title}
                  </option>
                ))}
              </select>
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

export default EmployeePanel;
