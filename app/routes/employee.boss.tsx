import type { LoaderFunction } from "@remix-run/node";
import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getCategories } from "~/models/categories.server";
import { getProducts } from "~/models/products.server";
import { getEmployees } from "~/models/employees.server";
import { getFranchiseApplications } from "~/models/franchise.server";
import { getJobApplications } from "~/models/jobs.server";
import { getLocations } from "~/models/locations.server";
import { getCoupons } from "~/models/coupons.server";
import CategoriesPanel from "~/components/employeeBoss/CategoriesPanel";
import MenuPanel from "~/components/employeeBoss/MenuPanel";
import EmployeePanel from "~/components/employeeBoss/EmployeePanel";
import FranchiseApplicationsPanel from "~/components/employeeBoss/FranchiseApplicationsPanel";
import JobApplicationsPanel from "~/components/employeeBoss/JobApplicationsPanel";
import RestaurantsPanel from "~/components/employeeBoss/RestaurantsPanel";
import CouponsPanel from "~/components/employeeBoss/CouponsPanel";

export const loader: LoaderFunction = async () => {
  const categories = await getCategories();
  const products = await getProducts();
  const employees = await getEmployees();
  const franchiseApplications = await getFranchiseApplications();
  const jobApplications = await getJobApplications();
  const restaurants = await getLocations();
  const coupons = await getCoupons();

  return json({
    categories: categories,
    products: products,
    employees: employees,
    franchiseApplications: franchiseApplications,
    jobApplications: jobApplications,
    restaurants: restaurants,
    coupons: coupons,
  });
};

export default function MenuCategoryRoute() {
  const data = useLoaderData();
  const [employeeView, setEmployeeView] = useState("Categories");

  const currentView = {
    Categories: <CategoriesPanel categories={data?.categories} />,
    Menu: <MenuPanel products={data?.products} categories={data?.categories} />,
    Employees: (
      <EmployeePanel
        employees={data?.employees}
        restaurants={data?.restaurants}
      />
    ),
    "Franchise Applications": (
      <FranchiseApplicationsPanel
        franchiseApplications={data?.franchiseApplications}
      />
    ),
    "Job Applications": (
      <JobApplicationsPanel jobApplications={data?.jobApplications} />
    ),
    Restaurants: <RestaurantsPanel restaurants={data?.restaurants} />,
    Coupons: (
      <CouponsPanel coupons={data?.coupons} categories={data?.categories} />
    ),
  };

  return (
    <div className="mb-12 mt-8 flex w-5/6 max-w-screen-lg flex-col items-center justify-center gap-5 rounded-xl border-rose-300 bg-orange-100 py-6 md:w-4/6 lg:flex-row">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex w-full flex-wrap items-center justify-center gap-3 px-5">
          {[
            "Categories",
            "Menu",
            "Employees",
            "Franchise Applications",
            "Job Applications",
            "Restaurants",
            "Coupons",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setEmployeeView(item)}
              disabled={employeeView === item}
              className={
                " w-max rounded-lg border border-rose-400 px-3 py-1 text-xl " +
                (employeeView === item
                  ? "bg-rose-400 text-white"
                  : "text-rose-400 hover:bg-rose-400 hover:text-white")
              }
            >
              {item}
            </button>
          ))}
        </div>
        <div className="my-4 w-full border border-gray-300" />
        <div className="h-full w-full flex-1 px-4">
          {currentView[employeeView]}
        </div>
      </div>
    </div>
  );
}
