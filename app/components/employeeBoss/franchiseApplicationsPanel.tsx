import { useState, useContext } from "react";
import FormModal from "./FormModal";
import { api } from "~/utils/api";
import { UserContext } from "~/root";
import dayjs from "dayjs";

const FranchiseApplicationsPanel = ({ franchiseApplications }: any) => {
  const user = useContext(UserContext);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [franchiseApplicationsData, setFranchiseApplicationsData] = useState(
    franchiseApplications
  );

  const handleMarkAsRead = async (franchiseId) => {
    const jwtToken = user?.jwtToken;
    console.log(jwtToken);
    const res = await api.patch(
      `/application/franchise/${franchiseId}`,
      {},
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

    if (res.status === 200) {
      setFranchiseApplicationsData((franchiseApplicationsData) =>
        franchiseApplicationsData.filter(
          (franchise) => franchise.id !== franchiseId
        )
      );
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">Franchise Applications</h1>
      <ul className="mx-auto flex w-full flex-col  gap-2">
        {franchiseApplicationsData?.map((franchise) => (
          <li
            key={franchise?.id}
            className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-700 bg-orange-100 p-1 pr-3"
          >
            <div className="flex w-full gap-1">
              <span className="w-max text-sm font-semibold">
                {franchise?.firstName?.charAt(0)?.toUpperCase() +
                  franchise?.firstName?.slice(1)}
              </span>
              <span className="w-max text-sm font-semibold">
                {franchise?.lastName?.charAt(0)?.toUpperCase() +
                  franchise?.lastName?.slice(1)}
              </span>
              <span className="w-max text-sm font-semibold text-gray-500">
                ({franchise?.phoneNumber})
              </span>
            </div>
            <div className="flex w-max items-center justify-end gap-4">
              <button
                onClick={() => {
                  setSelectedApplication(franchise);
                  setShowDetailsModal(true);
                }}
                className="w-max rounded-lg border border-rose-400 px-3 py-1 text-base text-rose-400 hover:bg-rose-500 hover:text-white"
              >
                Details
              </button>
              <button
                onClick={() => handleMarkAsRead(franchise?.id)}
                className="w-max rounded-lg border border-rose-400 px-3 py-1 text-base text-rose-400 hover:bg-rose-500 hover:text-white"
              >
                Mark as Read
              </button>
            </div>
          </li>
        ))}
      </ul>
      <FormModal
        showModal={showDetailsModal}
        setShowModal={setShowDetailsModal}
      >
        <div className="p-4">
          <div className="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Created Date:</p>
              <p className="w-[217px] rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                {dayjs(selectedApplication?.createdAt).format("DD.MM.YYYY")}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">First Name:</p>
              <p className="w-[217px] overflow-auto rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                {selectedApplication?.firstName}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Last Name: </p>
              <p className="w-[217px] overflow-auto rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                {selectedApplication?.lastName}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Phone Number:</p>
              <p className="w-[217px] rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                {selectedApplication?.phoneNumber}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Email:</p>
              <p className="w-[217px] overflow-auto rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                {selectedApplication?.email}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">About Me:</p>
              <p className="w-[217px] overflow-auto rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                {selectedApplication?.aboutMe}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Reason For Opening:</p>
              <p className="w-[217px] overflow-auto rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                {selectedApplication?.reasonForOpening}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Longitude:</p>
              <p className="w-[217px] rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                {selectedApplication?.longitude}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Latitude:</p>
              <p className="w-[217px] rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                {selectedApplication?.latitude}
              </p>
            </div>
          </div>
        </div>
      </FormModal>
    </div>
  );
};

export default FranchiseApplicationsPanel;
