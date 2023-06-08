import type {
  LoaderFunction,
  ActionFunction,
  ActionArgs,
} from "@remix-run/node";
import type { Image, JobOffer } from "types";
import { json } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useState } from "react";
import invariant from "tiny-invariant";
import {
  getJobOffers,
  getJobApplicants,
  createJobApplication,
} from "~/models/jobs.server";
import { jobApplicationImage } from "~/images";

export const meta: V2_MetaFunction = () => [{ title: "Job Application" }];

type LoaderData = {
  jobOffers: Array<JobOffer>;
  jobApplicationImage: Image;
};
export const loader: LoaderFunction = async ({ params }) => {
  const jobOffers = await getJobOffers();
  return json<LoaderData>({
    jobOffers: jobOffers,
    jobApplicationImage: jobApplicationImage,
  });
};

type ActionData =
  | {
      firstName?: string;
      lastName?: string;
      age?: string;
      email?: string;
      prefferedSalary?: string;
      dataProcessingConsent?: string;
      emailExists?: string;
      success?: string;
    }
  | undefined;

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const email = formData.get("email");
  if (email) {
    invariant(typeof email === "string", "email must be string");
    const jobApplicants = await getJobApplicants();
    if (jobApplicants.includes(email)) {
      return json<ActionData>({
        emailExists: `Email: "${email}" already exists in our database.
      Please wait carefully for our response :)`,
      });
    }
  }

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const age = formData.get("age");
  const aboutMe = formData.get("aboutMe");
  const jobTitle = formData.get("jobTitle");
  const prefferedSalary = formData.get("prefferedSalary");
  const dataProcessingConsent = formData.get("dataProcessingConsent");

  const errors: ActionData = {
    firstName: firstName ? undefined : "First name is required",
    lastName: lastName ? undefined : "Last name is required",
    age: age ? undefined : "Age is required",
    email: email ? undefined : "Email is required",
    prefferedSalary: prefferedSalary
      ? undefined
      : "Preffered salary is required",
    dataProcessingConsent: dataProcessingConsent
      ? undefined
      : "Data processing consent is required",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(typeof firstName === "string", "first name must be string");
  invariant(typeof lastName === "string", "last name must be string");
  invariant(typeof age === "string", "age must be string");
  invariant(typeof email === "string", "email must be string");
  invariant(typeof aboutMe === "string", "about me must be string");
  invariant(typeof jobTitle === "string", "job title must be string");
  invariant(
    typeof prefferedSalary === "string",
    "preffered salary must be numeric"
  );
  invariant(
    typeof dataProcessingConsent === "string",
    "data processing consent must be string"
  );
  await createJobApplication({
    firstName: firstName,
    lastName: lastName,
    age: Number(age),
    email: email,
    resumee: [],
    aboutMe: aboutMe,
    jobTitle: jobTitle,
    prefferedSalary: Number(prefferedSalary),
  });

  return json({
    success: "Your application has been sent successfully!",
  });
};

export default function JobApplicationRoute() {
  const data = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [jobTitle, setJobTitle] = useState({
    title: data.jobOffers[0].title,
    salary: data.jobOffers[0].salary,
  });
  const [prefferedSalary, setPrefferedSalary] = useState(
    (jobTitle.salary.min + jobTitle.salary.max) / 2
  );

  return (
    <div className="mb-12 mt-8 flex w-5/6 max-w-screen-lg flex-col items-center justify-center gap-5 rounded-xl border-rose-300 bg-orange-100 p-4 md:w-4/6 lg:flex-row">
      {actionData?.emailExists ? (
        <div className="flex flex-col gap-4 text-center text-rose-400">
          <h2 className="text-5xl font-bold">Oops!</h2>
          <p className="text-xl">{actionData.emailExists}</p>
        </div>
      ) : actionData?.success ? (
        <div className="flex flex-col gap-2 text-center text-rose-400">
          <h2 className="text-5xl font-bold">Success!</h2>
          <p className="text-xl">{actionData.success}</p>
        </div>
      ) : (
        <>
          <Form
            method="post"
            className="flex w-full flex-col items-center gap-6 lg:w-1/2"
            encType="multipart/form-data"
          >
            <div className="grid w-full grid-cols-2 gap-2">
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
                  <label className="pl-3 text-gray-500" htmlFor="age">
                    Age:
                    {actionData?.age ? (
                      <em className="text-red-600"> {actionData.age}</em>
                    ) : null}
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
                    About me:
                  </label>
                  <textarea
                    name="aboutMe"
                    className="resize-y rounded-xl border-rose-400 bg-orange-50 focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
              </div>
              <label className="hidden pl-3 text-gray-500" htmlFor="jobTitle">
                Job Title:
              </label>
              <input type="hidden" name="jobTitle" value={jobTitle.title} />
              {data.jobOffers.map((jobOffer) => (
                <button
                  type="button"
                  key={jobOffer.id}
                  onClick={() => {
                    setJobTitle({
                      title: jobOffer.title,
                      salary: {
                        min: jobOffer.salary.min,
                        max: jobOffer.salary.max,
                      },
                    });
                    setPrefferedSalary(
                      (jobOffer.salary.min + jobOffer.salary.max) / 2
                    );
                  }}
                  disabled={jobTitle.title === jobOffer.title}
                  className={
                    " flex flex-col items-start justify-start rounded-2xl border py-3 pl-3 pr-5 " +
                    (jobTitle.title === jobOffer.title
                      ? " border-rose-400"
                      : "border-gray-500 hover:border-gray-700")
                  }
                >
                  <h3 className="text-left">{jobOffer.title}</h3>
                  <span className="font-bold">
                    ${jobOffer.salary.min} - ${jobOffer.salary.max}
                  </span>
                </button>
              ))}
            </div>
            <div className="w-full">
              <label htmlFor="prefferedSalary">
                Preffered salary:{" "}
                <span className="font-semibold">${prefferedSalary}</span>
              </label>
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
              Get Your Dream Job Today
            </h1>
            <img
              src={data.jobApplicationImage.src}
              alt={data.jobApplicationImage.alt}
              className="w-1/2 lg:w-5/6"
            />
          </div>
        </>
      )}
    </div>
  );
}
