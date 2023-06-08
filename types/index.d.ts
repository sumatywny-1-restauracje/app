type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  numberOfRatings: number;
  image: string;
  added: string;
};

type ApiProductsData = {
  itemsAvailable: number;
  menuItems: Array<{
    itemId: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    photoUrl: string;
    description: string;
    price: number;
    rating: number;
    numberOfRatings: number;
    ingredients: string;
    available: boolean;
    categoryId: string;
    category: {
      categoryId: string;
      createdAt: string;
      available: boolean;
      categoryName: string;
      photoUrl: string;
    };
  }>;
};

type Category = {
  id: number;
  name: string;
  image: Image;
};

type ApiCategoriesData = {
  numCategories: number;
  categories: Array<{
    categoryId: number;
    createdAt: string;
    available: boolean;
    categoryName: string;
    photoUrl: string;
  }>;
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

type ApiJobOffersData = {
  jobs: Array<{
    jobId: number;
    createdAt: string;
    updatedAt: string;
    jobTitle: string;
    minSalary: number;
    maxSalary: number;
    role: string;
  }>;
};

type JobApplication = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  aboutMe: string | null;
  resumee: File;
  jobTitle: string;
  prefferedSalary: number;
  dataProcessingConsent: boolean;
};

type LocationOpeningHours = {
  openingHoursId: string;
  weekday: string;
  startHourUtc: string;
  endHourUtc: string;
  restaurantId: string;
};

type Location = {
  restaurantId: string;
  createdAt: string;
  available: boolean;
  geoLat: number;
  geoLon: number;
  managerId: string;
  addressId: string;
  openingHoursPretty: string;
  address: {
    addressId: string;
    street: string;
    streetNo: string;
    city: string;
    postalCode: string;
    country: string;
  };
  openingHours: LocationOpeningHours[];
  photoUrl: string;
  phoneNumber: string;
};

type SelectedLocation = {
  latitude: number;
  longitude: number;
};

type ApiLocationsData = {
  restaurantsAvailable: number;
  restaurants: Array<{
    restaurantId: string;
    createdAt: string;
    available: boolean;
    geoLat: number;
    geoLon: number;
    managerId: string | null;
    addressId: string;
    address: {
      addressId: string;
      street: string;
      streetNo: string;
      city: string;
      postalCode: string;
      country: string;
    };
    openingHours: Array<{
      openingHoursId: string;
      weekday: string;
      startHoursUtc: string;
      endHoursUtc: string;
      restaurantId: string;
    }>;
  }>;
};

type User = any;

type BasketItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: Image;
};

type FranchiseApplication = {
  id: string;
  createdAt: string;
  respondedTo: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  aboutMe: string;
  reasonForOpening: string;
  longitude: number;
  latitude: number;
};

type FranchiseApplicationsData = {
  franchiseApplications: FranchiseApplication[];
};

type CreateFranchise = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  aboutMe: string;
  reasonForOpening: string;
  longitude: number;
  latitude: number;
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
  LocationOpeningHours,
  SelectedLocation,
  User,
  BasketItem,
  ApiCategoriesData,
  ApiJobOffersData,
  ApiLocationsData,
  ApiProductsData,
  FranchiseApplication,
  FranchiseApplicationsData,
  CreateFranchise,
};
