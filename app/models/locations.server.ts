import type { Location } from "types";
import { api } from "~/utils/api";

export async function getLocations() {
  const res = await api.get(`/restaurant`);

  if (res.status !== 200) {
    throw new Error("Error while fetching locations");
  }

  const locationsData = res.data.restaurants as Location[];
  return locationsData;
}

export async function createLocation(location) {
  const res = await api.post(`/restaurant`, location);

  if (res.status !== 200) {
    throw new Error("Error while creating location");
  }

  const locationData = res.data;
  return locationData;
}

export async function updateLocation(location) {
  const res = await api.patch(`/restaurant/${location.id}`, location);

  if (res.status !== 200) {
    throw new Error("Error while updating location");
  }

  const locationData = res.data;
  return locationData;
}

export async function deleteLocation(locationId) {
  const res = await api.delete(`/restaurant/${locationId}`);

  if (res.status !== 200) {
    throw new Error("Error while deleting location");
  }

  const locationData = res.data;
  return locationData;
}

export async function getLocationsInRange(userLat, userLon) {
  const res = await api.get(`/restaurant?lat=${userLat}&lon=${userLon}`);

  if (res.status !== 200) {
    throw new Error("Error while fetching locations");
  }

  const locationsData = res.data;
  return locationsData;
}
