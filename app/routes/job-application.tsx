import type {
  LoaderFunction,
  ActionFunction,
  ActionArgs,
} from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { Form, useSubmit } from "@remix-run/react";
import { useState } from "react";
import { jobApplicationImage } from "~/images";

export const meta: V2_MetaFunction = () => [{ title: "Job Application" }];

export const loader: LoaderFunction = async ({ params }) => {
  return null;
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  // const formData = await request.formData();
  const j = await request.json();
  // console.log({
  //   firstName: formData.get("firstName"),
  //   lastName: formData.get("lastName"),
  //   age: formData.get("age"),
  //   email: formData.get("email"),
  //   aboutMe: formData.get("aboutMe"),
  //   resumee: formData.get("resumee"),
  //   jobTitle: formData.get("jobTitle"),
  //   prefferedSalary: formData.get("prefferedSalary"),
  //   dataProcessingConsent: formData.get("dataProcessingConsent"),
  // });
  console.log(j);
  return null;
};

export default function JobApplicationRoute() {
  const submit = useSubmit();

  const [jobTitle, setJobTitle] = useState({
    title: "Chef",
    salary: {
      min: 50,
      max: 100,
    },
  });
  const [prefferedSalary, setPrefferedSalary] = useState(
    (jobTitle.salary.min + jobTitle.salary.max) / 2
  );

  const handleSubmit = (e: any) => {
    submit(
      { target: e?.currentTarget, arbitraryData: jobTitle.title },
      { method: "post", action: "/job-title" }
    );
  };

  return (
    <div className="mb-12 mt-8 flex w-5/6 max-w-screen-lg flex-col items-center justify-center gap-5 rounded-xl border-rose-300 bg-orange-100 p-4 md:w-4/6 lg:flex-row">
      <Form
        onSubmit={handleSubmit}
        method="post"
        className="flex w-full flex-col gap-6 lg:w-1/2"
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2 mb-2 flex flex-col gap-2 rounded-xl border border-rose-400 p-2">
            <div className="flex flex-col gap-1">
              <label className="pl-3 text-gray-500" htmlFor="firstName">
                First Name:
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
              </label>
              <input
                type="text"
                name="lastName"
                className="rounded-xl border-rose-400 bg-orange-50 focus:border-rose-500 focus:ring-rose-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="pl-3 text-gray-500" htmlFor="age">
                Age:
              </label>
              <input
                type="number"
                name="age"
                className="rounded-xl border-rose-400 bg-orange-50 focus:border-rose-500 focus:ring-rose-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="pl-3 text-gray-500" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                name="email"
                className="rounded-xl border-rose-400 bg-orange-50 focus:border-rose-500 focus:ring-rose-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="pl-3 text-gray-500" htmlFor="aboutMe">
                About me:
              </label>
              <textarea
                name="aboutMe"
                className="resize-y rounded-xl border-rose-400 bg-orange-50 focus:border-rose-500 focus:ring-rose-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="pl-3 text-gray-500" htmlFor="resumee">
                Resumee [PDF]:
              </label>
              <input
                type="file"
                accept=".pdf"
                name="resumee"
                className="text-grey-500 file:text-md text-sm file:mr-5 file:rounded-full file:border-0 file:px-10 file:py-3 file:font-semibold file:text-white hover:file:cursor-pointer hover:file:opacity-80"
              />
            </div>
          </div>
          <button
            name="jobTitle"
            value={jobTitle.title}
            onClick={() => {
              setJobTitle({
                title: "Chef",
                salary: { min: 50, max: 100 },
              });
              setPrefferedSalary((50 + 100) / 2);
            }}
            disabled={jobTitle.title === "Chef"}
            className={
              " flex flex-col items-start justify-start rounded-2xl border py-3 pl-3 pr-5 " +
              (jobTitle.title === "Chef"
                ? " border-rose-400"
                : "border-gray-500 hover:border-gray-700")
            }
          >
            <h3 className="text-left">Chef</h3>
            <span className="font-bold">$50 - $100</span>
          </button>
          <button
            onClick={() => {
              setJobTitle({
                title: "Chef's Assistant",
                salary: { min: 24, max: 40 },
              });
              setPrefferedSalary((24 + 40) / 2);
            }}
            disabled={jobTitle.title === "Chef's Assistant"}
            className={
              " flex flex-col items-start justify-start rounded-2xl border py-3 pl-3 pr-5 " +
              (jobTitle.title === "Chef's Assistant"
                ? " border-rose-400"
                : "border-gray-500 hover:border-gray-700")
            }
          >
            <h3 className="text-left">{"Chef's Assistant"}</h3>
            <span className="font-bold">$24 - $40</span>
          </button>
          <button
            onClick={() => {
              setJobTitle({
                title: "Food Delivery Driver",
                salary: { min: 24, max: 40 },
              });
              setPrefferedSalary((24 + 40) / 2);
            }}
            disabled={jobTitle.title === "Food Delivery Driver"}
            className={
              " flex flex-col items-start justify-start rounded-2xl border py-3 pl-3 pr-5 " +
              (jobTitle.title === "Food Delivery Driver"
                ? " border-rose-400"
                : "border-gray-500 hover:border-gray-700")
            }
          >
            <h3 className="text-left">Food Delivery Driver</h3>
            <span className="font-bold">$24 - $40</span>
          </button>
          <button
            onClick={() => {
              setJobTitle({
                title: "Manager",
                salary: { min: 80, max: 150 },
              });
              setPrefferedSalary((80 + 150) / 2);
            }}
            disabled={jobTitle.title === "Manager"}
            className={
              " flex flex-col items-start justify-start rounded-2xl border py-3 pl-3 pr-5 " +
              (jobTitle.title === "Manager"
                ? " border-rose-400"
                : "border-gray-500 hover:border-gray-700")
            }
          >
            <h3 className="text-left">Manager</h3>
            <span className="font-bold">$80 - $150</span>
          </button>
        </div>
        <div>
          <p>
            Preffered salary:{" "}
            <span className="font-semibold">${prefferedSalary}</span>
          </p>
          <input
            type="range"
            name="prefferedSalary"
            className="w-full bg-inherit accent-rose-400 active:accent-rose-400"
            min={jobTitle.salary.min}
            max={jobTitle.salary.max}
            value={prefferedSalary}
            onChange={(e) => setPrefferedSalary(Number(e.target.value))}
          />
        </div>
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
            <span className="text-rose-400">Foodsi</span> for the purposes of
            the recruitment process.
          </p>
        </div>
        <button
          type="submit"
          className="mx-auto w-max rounded-xl bg-rose-400 px-4 py-2 text-lg text-white hover:bg-rose-500"
        >
          Start Now!
        </button>
      </Form>
      <div className="flex h-full w-full flex-row items-center gap-8 max-lg:order-first lg:w-1/2 lg:flex-col">
        <h1 className="lg-w-full w-1/2 text-center text-3xl font-bold text-rose-400 sm:text-5xl lg:w-full lg:text-6xl">
          Get Your Dream Job Today
        </h1>
        <img
          src={jobApplicationImage.src}
          alt={jobApplicationImage.alt}
          className="w-1/2 lg:w-5/6"
        />
      </div>
    </div>
  );
}
