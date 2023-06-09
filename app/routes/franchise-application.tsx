import type { Location } from "types";
import type {
  LinksFunction,
  LoaderFunction,
  ActionFunction,
  ActionArgs,
} from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { useSubmit } from "@remix-run/react";
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigation,
  useLoaderData,
} from "@remix-run/react";

import { useState } from "react";
import { getLocations } from "~/models/locations.server";
import MapComponent from "~/components/map/Map";
import { createFranchiseApplication } from "~/models/franchise.server";

export const meta: V2_MetaFunction = () => [{ title: "Franchise Application" }];

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css",
  },
];

type LoaderData = {
  locations: Array<Location>;
};
export const loader: LoaderFunction = async () => {
  const locations = await getLocations();
  return json<LoaderData>({
    locations: locations,
  });
};

type ActionData =
  | {
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
      email?: string;
      aboutMe?: string;
      reasonForOpening?: string;
      dataProcessingConsent?: string;
      longitude?: string;
      latitude?: string;
    }
  | undefined;

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const phoneNumber = formData.get("phoneNumber");
  const email = formData.get("email");
  const aboutMe = formData.get("aboutMe");
  const reasonForOpening = formData.get("reasonForOpening");
  const dataProcessingConsent = formData.get("dataProcessingConsent");
  const longitude = formData.get("longitude");
  const latitude = formData.get("latitude");

  const errors: ActionData = {
    firstName: firstName ? undefined : "First name is required",
    lastName: lastName ? undefined : "Last name is required",
    phoneNumber: phoneNumber ? undefined : "Phone number is required",
    email: email ? undefined : "Email is required",
    aboutMe: aboutMe ? undefined : "User information is required",
    reasonForOpening: reasonForOpening
      ? undefined
      : "Reason for opening is required",
    dataProcessingConsent: dataProcessingConsent
      ? undefined
      : "Data processing consent is required",
    longitude: longitude ? undefined : "Longitude is required",
    latitude: latitude ? undefined : "Latitude is required",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(typeof firstName === "string", "first name must be string");
  invariant(typeof lastName === "string", "last name must be string");
  invariant(typeof phoneNumber === "string", "phone number must be string");
  invariant(typeof email === "string", "email must be string");
  invariant(typeof aboutMe === "string", "about me must be string");
  invariant(
    typeof reasonForOpening === "string",
    "future plans must be string"
  );
  invariant(
    typeof dataProcessingConsent === "string",
    "data processing consent must be string"
  );
  invariant(typeof longitude === "string", "longitude must be string");
  invariant(typeof latitude === "string", "latitude must be string");

  await createFranchiseApplication({
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email,
    aboutMe: aboutMe,
    reasonForOpening: reasonForOpening,
    longitude: Number(longitude),
    latitude: Number(latitude),
  });

  return json({
    success: "Your application has been sent successfully!",
  });
};

export default function FranchiseApplicationRoute() {
  const data = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 51.9189046,
    longitude: 19.1343786,
  });

  return (
    <div className="mb-12 mt-8 grid w-5/6 max-w-screen-lg grid-cols-1 gap-5 rounded-xl border-rose-300 bg-orange-100 p-4 md:w-4/6 lg:grid-cols-2">
      {actionData?.success ? (
        <div className="col-span-2 flex h-full flex-col justify-center gap-2 text-center text-rose-400">
          <h2 className="text-5xl font-bold">Success!</h2>
          <p className="text-xl">{actionData.success}</p>
        </div>
      ) : (
        <>
          <h1 className="w-full text-center text-2xl font-bold text-rose-400 sm:text-4xl lg:col-span-2 lg:text-5xl">
            Become a Foodsi Franchisee!
          </h1>
          <Form
            method="post"
            className="flex w-full flex-col gap-6 lg:col-span-2 lg:flex-row"
          >
            <div className="flex w-full flex-col items-center gap-6 max-lg:order-last">
              <div className="col-span-2 mb-2 flex flex-col gap-2 rounded-xl border border-rose-400 p-2">
                <div className="flex flex-col gap-1">
                  <label className="pl-3 text-gray-500" htmlFor="firstName">
                    First Name:
                    {actionData?.firstName ? (
                      <em className="text-red-600"> {actionData.firstName}</em>
                    ) : null}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="rounded-xl border-rose-400 bg-orange-50 focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="pl-3 text-gray-500" htmlFor="lastName">
                    Last Name:
                    {actionData?.lastName ? (
                      <em className="text-red-600"> {actionData.lastName}</em>
                    ) : null}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="rounded-xl border-rose-400 bg-orange-50 focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="pl-3 text-gray-500" htmlFor="phoneNumber">
                    Phone Number:
                    {actionData?.phoneNumber ? (
                      <em className="text-red-600">
                        {" "}
                        {actionData.phoneNumber}
                      </em>
                    ) : null}
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    className="rounded-xl border-rose-400 bg-orange-50 focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="pl-3 text-gray-500" htmlFor="email">
                    Email:
                    {actionData?.email ? (
                      <em className="text-red-600"> {actionData.email}</em>
                    ) : null}
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="rounded-xl border-rose-400 bg-orange-50 focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="pl-3 text-gray-500" htmlFor="aboutMe">
                    Tell us about yourself:
                    {actionData?.aboutMe ? (
                      <em className="text-red-600"> {actionData.aboutMe}</em>
                    ) : null}
                  </label>
                  <textarea
                    name="aboutMe"
                    className="resize-none rounded-xl border-rose-400 bg-orange-50 focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className="pl-3 text-gray-500"
                    htmlFor="reasonForOpening"
                  >
                    Why do you think opening a franchise in the location of your
                    choice will be successful?
                    {actionData?.reasonForOpening ? (
                      <em className="text-red-600">
                        {" "}
                        {actionData.reasonForOpening}
                      </em>
                    ) : null}
                  </label>
                  <textarea
                    name="reasonForOpening"
                    className="resize-none rounded-xl border-rose-400 bg-orange-50 focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
              </div>
              {actionData?.dataProcessingConsent ? (
                <em className="text-red-600">
                  {" "}
                  {actionData.dataProcessingConsent}
                </em>
              ) : null}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="dataProcessingConsent"
                  className="border-rose-400 text-rose-400 focus:border-rose-400 focus:ring-rose-400"
                  defaultChecked={true}
                />
                <p className="font-serif">
                  I hereby give consent for my personal data included in the
                  application to be processed by{" "}
                  <span className="text-rose-400">Foodsi</span> for the purposes
                  of the recruitment process.
                </p>
              </div>
              <button
                type="submit"
                className="mx-auto w-max rounded-xl bg-rose-400 px-4 py-2 text-lg text-white hover:bg-rose-500"
              >
                {isSubmitting ? "Sending..." : "Send!"}
              </button>
            </div>
            <div className="flex h-full w-full flex-col items-center gap-3">
              <div className="h-full w-full overflow-hidden rounded-2xl border border-rose-400">
                <MapComponent
                  locations={data?.locations}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                />
              </div>
              <p className="text-center text-base text-gray-700">
                Drag the marker to the desired location or enter its
                coordinates!
              </p>
              <div className="grid w-full grid-cols-2 gap-3">
                <div className="flex flex-col items-center">
                  <label className="hidden text-gray-500" htmlFor="longitude">
                    Longitude:
                  </label>
                  <input
                    type="number"
                    min={-180}
                    max={180}
                    name="longitude"
                    className="w-full rounded-xl border-rose-400 bg-orange-50 text-center [appearance:textfield] focus:border-rose-500 focus:ring-rose-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    value={selectedLocation.longitude}
                    onChange={(e) => {
                      setSelectedLocation({
                        ...selectedLocation,
                        longitude: Number(e.target.value),
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label className=" hidden text-gray-500" htmlFor="latitude">
                    Latitude:
                  </label>
                  <input
                    type="number"
                    min={-90}
                    max={90}
                    name="latitude"
                    className="w-full rounded-xl border-rose-400 bg-orange-50 text-center [appearance:textfield] focus:border-rose-500 focus:ring-rose-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    value={selectedLocation.latitude}
                    onChange={(e) => {
                      setSelectedLocation({
                        ...selectedLocation,
                        latitude: Number(e.target.value),
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </Form>
        </>
      )}
    </div>
  );
}
