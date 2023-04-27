import type { V2_MetaFunction } from "@remix-run/react";
import {
  Form,
  useActionData,
  useNavigation,
  useLoaderData,
} from "@remix-run/react";

export const meta: V2_MetaFunction = () => [{ title: "Job Application" }];

export default function JobApplicationRoute() {
  const data = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="mb-12 mt-8 flex w-5/6 max-w-screen-lg flex-col items-center justify-center gap-5 rounded-xl border-rose-300 bg-orange-100 p-4 md:w-4/6 lg:flex-row">
      {actionData?.success ? (
        <div className="flex flex-col gap-2 text-center text-rose-400">
          <h2 className="text-5xl font-bold">Success!</h2>
          <p className="text-xl">{actionData.success}</p>
        </div>
      ) : (
        <>
          <Form
            method="post"
            className="flex w-full flex-col items-center gap-6 lg:w-1/2"
          >
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
                    <em className="text-red-600"> {actionData.phoneNumber}</em>
                  ) : null}
                </label>
                <input
                  type="number"
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
                </label>
                <textarea
                  name="aboutMe"
                  className="resize-y rounded-xl border-rose-400 bg-orange-50 focus:border-rose-500 focus:ring-rose-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="pl-3 text-gray-500"
                  htmlFor="reasonForOpening"
                >
                  Why do you think opening a franchise in the location of your
                  choice will be successful?:
                </label>
                <textarea
                  name="reasonForOpening"
                  className="resize-y rounded-xl border-rose-400 bg-orange-50 focus:border-rose-500 focus:ring-rose-500"
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
          </Form>
          <div className="flex h-full w-full flex-row items-center justify-center gap-8 max-lg:order-first lg:w-1/2 lg:flex-col">
            <h1 className="lg-w-full w-1/2 text-center text-3xl font-bold text-rose-400 sm:text-5xl lg:w-full lg:text-6xl">
              Select the Location
            </h1>
            <img alt="Interactive Map" className="w-1/2 lg:w-5/6" />
          </div>
        </>
      )}
    </div>
  );
}
