import type { JobOffer, JobApplication, ApiJobOffersData } from "types";
import { api } from "~/utils/api";

let JOB_APPLICATIONS: Array<JobApplication> = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 25,
    email: "john.doe@example.com",
    aboutMe: "I am a hard working person.",
    resumee: "https://www.google.com",
    jobTitle: "Chef",
    prefferedSalary: 50,
    dataProcessingConsent: true,
  },
];

export async function getJobOffers() {
  const res = await api.get(`/job`);

  if (res.status !== 200) {
    throw new Error("Error while fetching job offers");
  }

  const jobOffersData = res.data as ApiJobOffersData;
  const job_offers = jobOffersData.jobs.map((job) => {
    return {
      id: job.jobId,
      title: job.jobTitle,
      salary: {
        min: job.minSalary,
        max: job.maxSalary,
      },
    };
  });
  return job_offers as Array<JobOffer>;
}

export function getJobApplicants() {
  return JOB_APPLICATIONS.map((application) => {
    return application.email;
  });
}

type createJobApplicationParams = {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  aboutMe?: string;
  resumee?: string;
  jobTitle: string;
  prefferedSalary: string;
  dataProcessingConsent: string;
};

const isNumeric = (val: string): boolean => {
  return !isNaN(Number(val));
};

// export function createJobApplication(application: createJobApplicationParams) {
//   // JOB_APPLICATIONS.push(application);
// }

export async function getJobApplications() {
  const res = await api.get(`/aplication/job`);

  if (res.status !== 200) {
    throw new Error("Error while fetching job applications");
  }

  const jobApplicationsData = res.data;
  return jobApplicationsData;
}

export async function createJobApplication(JobApplication) {
  const res = await api.post(`/aplication/job`, JobApplication);

  if (res.status !== 200) {
    throw new Error("Error while creating job application");
  }

  const JobApplicationData = res.data;
  return JobApplicationData;
}

export async function markJobApplicationAsResponded(JobApplicationId: string) {
  const res = await api.patch(`/aplication/job/${JobApplicationId}`);

  if (res.status !== 200) {
    throw new Error("Error while updating job application");
  }

  const JobApplicationData = res.data;
  return JobApplicationData;
}
