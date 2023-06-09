import { useState, useContext } from "react";
import FormModal from "./FormModal";
import { api } from "~/utils/api";
import { UserContext } from "~/root";

const CouponsPanel = ({ coupons, categories }: any) => {
  const user = useContext(UserContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [couponsData, setCouponsData] = useState(coupons);

  const handleAdd = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const code = formData.get("code");
    const categoryId = formData.get("category");
    const discount = formData.get("discount");

    const jwtToken = user?.jwtToken;
    const res = await api.post(
      "/coupon",
      {
        name: name,
        code: code,
        categoryId: categoryId,
        discount: Number(discount) / 100,
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

    if (res.status === 201) {
      setCouponsData((couponsData) => [...couponsData, res.data?.coupon]);
    }
  };

  const handleDelete = async (couponId) => {
    const jwtToken = user?.jwtToken;
    const res = await api.delete(`/coupon/${couponId}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    if (res.status === 200) {
      setCouponsData((couponsData) =>
        couponsData.filter((coupon) => coupon.id !== couponId)
      );
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">Coupons</h1>
      <div className="flex w-full justify-end">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-max rounded-lg border border-gray-700 bg-rose-400 px-3 py-1 text-base text-white hover:bg-rose-500 hover:text-white"
        >
          Add
        </button>
      </div>
      <ul className="mx-auto flex w-full flex-col  gap-2">
        {couponsData?.map((coupon) => (
          <li
            key={coupon?.id}
            className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-700 bg-orange-100 p-1 pr-3"
          >
            <div className="flex w-full gap-1">
              <span className="w-max text-sm font-semibold">
                {coupon?.name}
              </span>
              <span className="w-max text-sm font-semibold text-gray-500">
                ({coupon?.categoryName === null ? "All" : coupon?.categoryName})
              </span>
            </div>
            <div className="flex w-max items-center justify-end gap-4">
              <button
                onClick={() => {
                  setSelectedCoupon(coupon);
                  setShowDetailsModal(true);
                }}
                className="w-max rounded-lg border border-rose-400 px-3 py-1 text-base text-rose-400 hover:bg-rose-500 hover:text-white"
              >
                Details
              </button>
              <button
                onClick={() => handleDelete(coupon?.id)}
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
              <label htmlFor="name" className="text-gray-500">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="code" className="text-gray-500">
                Code:{" "}
              </label>
              <input
                type="text"
                name="code"
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="houseNumber" className="text-gray-500">
                Category:
              </label>
              <select className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700 focus:border-gray-700 focus:ring-0">
                <option value={"All"} className="bg-orange-100">
                  All
                </option>
                {categories?.map((category) => (
                  <option
                    key={category?.id}
                    value={category?.id}
                    className="bg-orange-100"
                  >
                    {category?.name?.charAt(0)?.toUpperCase() +
                      category?.name?.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="discount" className="text-gray-500">
                Discount (%):
              </label>
              <input
                type="number"
                min={0}
                max={100}
                name="discount"
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button
              type="submit"
              onClick={() => setShowAddModal(false)}
              className="mt-8 w-max rounded-lg bg-rose-400 px-10 py-1 text-base text-white hover:bg-rose-500"
            >
              Add
            </button>
          </div>
        </form>
      </FormModal>
      <FormModal
        showModal={showDetailsModal}
        setShowModal={setShowDetailsModal}
      >
        <div className="p-4">
          <div className="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Name:</p>
              <p className="w-[217px] overflow-auto rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                {selectedCoupon?.name}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Code: </p>
              <p className="w-[217px] overflow-auto rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                {selectedCoupon?.code}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Category:</p>
              <p className="w-[217px] rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                {selectedCoupon?.categoryName === null
                  ? "All"
                  : selectedCoupon?.categoryName}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Discount:</p>
              <p className="w-[217px] rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                {selectedCoupon?.discount * 100}%
              </p>
            </div>
          </div>
        </div>
      </FormModal>
    </div>
  );
};

export default CouponsPanel;
