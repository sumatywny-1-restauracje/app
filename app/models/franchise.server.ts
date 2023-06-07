import { api } from "~/utils/api";

export async function getFranchiseApplications() {
  const res = await api.get(`/aplication/franchise`);

  if (res.status !== 200) {
    throw new Error("Error while fetching franchise applications");
  }

  const franchiseApplicationsData = res.data;
  return franchiseApplicationsData;
}

export async function createFranchiseApplication(franchiseApplication) {
  const res = await api.post(`/aplication/franchise`, franchiseApplication);

  if (res.status !== 200) {
    throw new Error("Error while creating franchise application");
  }

  const franchiseApplicationData = res.data;
  return franchiseApplicationData;
}

export async function markFranchiseApplicationAsResponded(
  franchiseApplicationId: string
) {
  const res = await api.patch(
    `/aplication/franchise/${franchiseApplicationId}`
  );

  if (res.status !== 200) {
    throw new Error("Error while updating franchise application");
  }

  const franchiseApplicationData = res.data;
  return franchiseApplicationData;
}
