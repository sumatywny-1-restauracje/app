const JOB_OFFERS = [
  {
    id: 1,
    title: "Chef",
    salary: {
      min: 50,
      max: 100,
    },
  },
  {
    id: 2,
    title: "Chef's Assistant",
    salary: {
      min: 24,
      max: 40,
    },
  },
  {
    id: 3,
    title: "Food Delivery Driver",
    salary: {
      min: 24,
      max: 40,
    },
  },
  {
    id: 4,
    title: "Manager",
    salary: {
      min: 80,
      max: 150,
    },
  },
];

let JOB_APPLICATIONS = [
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

export function getJobOffers() {
  return JOB_OFFERS;
}

export function getJobApplicants() {
  return JOB_APPLICATIONS.map((application) => {
    return application.email;
  });
}

export function createJobApplication(application) {
  JOB_APPLICATIONS.push(application);
}
