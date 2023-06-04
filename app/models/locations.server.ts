import type { Location } from "types";
import { api } from "~/utils/api";

const LOCATIONS: Array<Location> = [
  {
    id: 1,
    latitude: 52.22977,
    longitude: 21.01178,
    address: "ul. Marszałkowska 111",
    city: "Warszawa",
    workingHours: "Monday - Friday: 8:00 - 20:00",
    phone: "+48 22 123 45 67",
    image: {
      src: "https://media-cdn.tripadvisor.com/media/photo-s/06/5f/dd/4e/local-restaurant.jpg",
      alt: "Local in Warsaw",
    },
  },
  {
    id: 2,
    latitude: 51.32124,
    longitude: 19.94771,
    address: "ul. Piotrkowska 123",
    city: "Łódź",
    workingHours: "Monday - Friday: 8:00 - 20:00",
    phone: "+48 42 123 45 67",
    image: {
      src: "https://media-cdn.tripadvisor.com/media/photo-s/06/5f/dd/4e/local-restaurant.jpg",
      alt: "Local in Lodz",
    },
  },
  {
    id: 3,
    latitude: 50.06143,
    longitude: 19.93658,
    address: "ul. Floriańska 123",
    city: "Kraków",
    workingHours: "Monday - Friday: 8:00 - 20:00",
    phone: "+48 12 123 45 67",
    image: {
      src: "https://media-cdn.tripadvisor.com/media/photo-s/06/5f/dd/4e/local-restaurant.jpg",
      alt: "Local in Krakow",
    },
  },
];

export function getLocations() {
  return LOCATIONS;
}

export async function getLocations2() {
  const res = await api.get(`/restaurant`);

  if (res.status !== 200) {
    throw new Error("Error while fetching locations");
  }

  const locationsData = res.data;
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
