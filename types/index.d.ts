type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
  numberOfRatings: number;
  image: string;
  added: string;
};

type Category = {
  id: number;
  name: string;
  image: Image;
};

type SortBy = {
  label: string;
  value: string;
};

type Image = {
  src: string;
  alt: string;
};

type ImagesObject = {
  [key: string]: Image;
};

type SpecialOffer = {
  id: number;
  image: Image;
  value: string;
  discountCode: string;
};

type JobOffer = {
  id: number;
  title: string;
  salary: {
    min: number;
    max: number;
  };
};

type JobApplication = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  aboutMe: string | null;
  resumee: string | null;
  jobTitle: string;
  prefferedSalary: number;
  dataProcessingConsent: boolean;
};

type Location = {
  id: number;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  workingHours: string;
  phone: string;
  image: Image;
};

type SelectedLocation = {
  latitude: number;
  longitude: number;
};

type User = {
  email: string;
  name: string;
  accessToken: string;
  roles: string[];
  basket: Product[];
} | null;

type BasketItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: Image;
};

export {
  Product,
  Category,
  SortBy,
  Image,
  ImagesObject,
  SpecialOffer,
  JobOffer,
  JobApplication,
  Location,
  SelectedLocation,
  User,
  BasketItem,
};
