import { useState, useContext } from "react";
import FormModal from "./FormModal";
import { api } from "~/utils/api";
import { UserContext } from "~/root";
import dayjs from "dayjs";

const JobApplicationsPanel = ({ jobApplications }: any) => {
  const user = useContext(UserContext);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [jobApplicationsData, setJobApplicationsData] =
    useState(jobApplications);

  const handleClear = async (applicationId) => {
    const jwtToken = user?.jwtToken;
    console.log(jwtToken);
    const res = await api.patch(
      `/application/job/${applicationId}`,
      {},
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

    if (res.status === 200) {
      setJobApplicationsData((jobApplicationsData) =>
        jobApplicationsData.filter(
          (application) => application.id !== applicationId
        )
      );
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">Job Applications</h1>
      <ul className="mx-auto flex w-full flex-col  gap-2">
        {jobApplicationsData?.map((jobApplication) => (
          <li
            key={jobApplication?.id}
            className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-700 bg-orange-100 p-1 pr-3"
          >
            <div className="flex w-full flex-col gap-1 sm:flex-row">
              <span className="w-max text-xs font-semibold sm:text-sm">
                {jobApplication?.firstName?.charAt(0)?.toUpperCase() +
                  jobApplication?.firstName?.slice(1)}
              </span>
              <span className="w-max text-xs font-semibold sm:text-sm">
                {jobApplication?.lastName?.charAt(0)?.toUpperCase() +
                  jobApplication?.lastName?.slice(1)}
              </span>
              <span className="w-full break-all text-xs font-semibold text-gray-500 sm:text-sm">
                ({jobApplication?.email})
              </span>
            </div>
            <div className="flex w-max items-center justify-end gap-4">
              <button
                onClick={() => {
                  setSelectedApplication(jobApplication);
                  setShowDetailsModal(true);
                }}
                className="w-max rounded-lg border border-rose-400 px-3 py-1 text-xs text-rose-400 hover:bg-rose-500 hover:text-white sm:text-base"
              >
                Details
              </button>
              <button
                onClick={() => handleClear(jobApplication?.id)}
                className="w-max rounded-lg border border-rose-400 px-3 py-1 text-xs text-rose-400 hover:bg-rose-500 hover:text-white sm:text-base"
              >
                Clear
              </button>
            </div>
          </li>
        ))}
      </ul>
      <FormModal
        showModal={showDetailsModal}
        setShowModal={setShowDetailsModal}
      >
        <div className="max-h-[600px] overflow-y-auto p-4 sm:max-h-max">
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
              <p className="text-gray-500">Age:</p>
              <p className="w-[217px] rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                {selectedApplication?.age}
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
              <p className="text-gray-500">Job Title:</p>
              <p className="w-[217px] rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                {selectedApplication?.jobTitle}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Preffered Salary:</p>
              <p className="w-[217px] rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700">
                ${selectedApplication?.prefferedSalary}
              </p>
            </div>
          </div>
        </div>
      </FormModal>
    </div>
  );
};

export default JobApplicationsPanel;
