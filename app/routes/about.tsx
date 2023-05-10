import type { ImagesObject } from "types";
import type { V2_MetaFunction } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { HiOutlineRefresh } from "react-icons/hi";
import { SlSpeedometer } from "react-icons/sl";
import { BsPiggyBank } from "react-icons/bs";
import { TfiShoppingCart } from "react-icons/tfi";

export const meta: V2_MetaFunction = () => [{ title: "About" }];

type LoaderData = {
  images: ImagesObject;
};

export const loader: LoaderFunction = () => {
  const images = {
    aboutUs: {
      src: "https://images.pexels.com/photos/9543813/pexels-photo-9543813.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "about us",
    },
    ourLocals: {
      src: "https://images.pexels.com/photos/1449775/pexels-photo-1449775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "our locals",
    },
    ourStaff: {
      src: "https://images.pexels.com/photos/4350081/pexels-photo-4350081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "our staff",
    },
    events: {
      src: "https://images.pexels.com/photos/3171795/pexels-photo-3171795.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "local events",
    },
    experience: {
      src: "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "our experience",
    },
    tastyFood: {
      src: "https://images.pexels.com/photos/534285/pexels-photo-534285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "tasty food",
    },
    quickFood: {
      src: "https://images.pexels.com/photos/5920666/pexels-photo-5920666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "quick food",
    },
    placeToStay: {
      src: "https://images.pexels.com/photos/1269025/pexels-photo-1269025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "place to stay",
    },
  };

  return json<LoaderData>({ images: images });
};

export default function AboutRoute() {
  const { images } = useLoaderData<LoaderData>();
  return (
    <div className="mb-12 mt-8 flex w-5/6 max-w-screen-lg flex-col gap-9 rounded-xl border-rose-300 bg-orange-100 pb-6 pt-4 text-gray-700 md:w-4/6">
      <h2 className="w-full text-center text-2xl font-bold text-rose-400 sm:text-4xl lg:text-5xl">
        About Us
      </h2>
      <p className="mx-auto w-2/3 text-center text-xs">
        At our fast food restaurant, we are committed to providing custom food
        solutions that satisfy your cravings and drive your taste buds wild.
      </p>
      <div className="bg-orange-200">
        <div className="mx-auto flex w-11/12 flex-col gap-6 py-4 lg:flex-row">
          <img
            className="max-h-[400px] w-full rounded-xl border-2 border-rose-400 lg:w-1/2"
            src={images?.aboutUs.src}
            alt={images?.aboutUs.alt}
          />
          <div className="flex w-full flex-col gap-6 text-justify text-sm lg:w-1/2">
            <p>
              We are a fast food restaurant that prides itself on serving
              high-quality meals at affordable prices. Our menu is packed with a
              variety of options to satisfy all tastes, from juicy burgers to
              crispy fries. We use only the freshest ingredients to prepare our
              food, ensuring that each meal is packed with flavor. We understand
              that speed is crucial for fast food, so we strive to serve our
              meals as quickly as possible without compromising quality.
            </p>
            <p>
              {`Our goal is to create a welcoming atmosphere that complements our
              delicious food. Our friendly staff is always ready to assist with
              any questions or concerns you may have, and we are committed to
              providing excellent customer service. Whether you're stopping in
              for a quick meal or enjoying a sit-down dinner with friends, we
              want to make your experience at our restaurant an enjoyable one.
              Come and see for yourself why we're the go-to spot for fast food
              in the area.`}
            </p>
            <Link
              to="/menu"
              prefetch="intent"
              className="w-max rounded-xl border-2 border-rose-400 px-4 py-2 text-sm font-bold text-rose-400 hover:border-rose-500 hover:text-rose-500"
            >
              Check Our Offer
            </Link>
          </div>
        </div>
      </div>
      <h2 className="w-full text-center text-2xl font-bold text-rose-400 sm:text-4xl lg:text-5xl">
        Why Choose Us
      </h2>
      <p className="mx-auto w-2/3 text-center text-xs">
        At our fast food restaurant, we believe in providing customized food
        solutions that not only satisfy your cravings but also excite your taste
        buds with unique and delicious flavors.
      </p>
      <div className="mx-auto -mt-4 flex w-11/12 flex-col gap-6 py-4 sm:grid sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl bg-orange-200 p-3">
          <div className="h-max w-max rounded-full bg-orange-100 p-2 text-4xl">
            <HiOutlineRefresh />
          </div>
          <div className="flex flex-col gap-2 text-xs font-bold ">
            Freshness
            <p className="font-normal">
              We source only the freshest ingredients to ensure that every meal
              is bursting with flavor.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-orange-200 p-3">
          <div className="h-max w-max rounded-full bg-orange-100 p-2 text-4xl">
            <TfiShoppingCart />
          </div>
          <div className="flex flex-col gap-2 text-xs font-bold ">
            Variety
            <p className="font-normal">
              Our extensive menu offers a wide range of options to satisfy all
              tastes and dietary preferences.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-orange-200 p-3">
          <div className="h-max w-max rounded-full bg-orange-100 p-2 text-4xl">
            <SlSpeedometer />
          </div>
          <div className="flex flex-col gap-2 text-xs font-bold ">
            Speed
            <p className="font-normal">
              {`We pride ourselves on serving fast food that doesn't compromise on
              quality or taste, so you can get back to your day quickly.`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-orange-200 p-3">
          <div className="h-max w-max rounded-full bg-orange-100 p-2 text-4xl">
            <BsPiggyBank />
          </div>
          <div className="flex flex-col gap-2 text-xs font-bold ">
            Affordability
            <p className="font-normal">
              Our meals are priced competitively to provide a budget-friendly
              option without compromising on quality or taste.
            </p>
          </div>
        </div>
        <Link
          to="/job-application"
          prefetch="intent"
          className="col-span-2 mx-auto w-max rounded-xl border-2 border-rose-400 px-4 py-2 text-sm font-bold text-rose-400 hover:border-rose-500 hover:text-rose-500"
        >
          Want to Become One of Us?
        </Link>
      </div>

      <div className="bg-orange-200">
        <div className="mx-auto flex w-10/12 flex-col gap-6 py-4 md:flex-row">
          <div className="flex w-full flex-col gap-4 md:w-1/2">
            <h2 className="text-2xl font-bold text-rose-400 sm:text-4xl lg:text-5xl">
              Many Locals
            </h2>
            <p className="w-4/5 text-xs">
              Many locals consider our fast food restaurant their go-to spot for
              delicious and satisfying meals.
            </p>
            <Link
              to="/locals"
              prefetch="intent"
              className="w-max rounded-xl border-2 border-rose-400 px-4 py-2 text-sm font-bold text-rose-400 hover:border-rose-500 hover:text-rose-500"
            >
              Check Our Locals
            </Link>
            <img
              className="max-h-[400px] rounded-xl border-2 border-rose-400"
              src={images?.ourLocals.src}
              alt={images?.ourLocals.src}
            />
          </div>
          <div className="flex w-full flex-col gap-6 text-justify text-sm md:w-1/2">
            <div className="flex items-center gap-2">
              <img
                className="h-12 w-12 rounded-lg border border-rose-400 object-fill"
                src={images?.quickFood.src}
                alt={images?.quickFood.alt}
              />
              <div className="flex flex-col gap-2 text-xs font-bold">
                Many Locals Choose Us as Their Go-To Spot
                <p className="font-normal">
                  Our fast food restaurant is a favorite among locals who are
                  looking for delicious food that is prepared quickly and served
                  with a smile.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <img
                className="h-12 w-12 rounded-lg border border-rose-400 object-fill"
                src={images?.tastyFood.src}
                alt={images?.tastyFood.alt}
              />
              <div className="flex flex-col gap-2 text-xs font-bold">
                A Local Gem
                <p className="font-normal">
                  We have become a local gem in the community, known for our
                  high-quality meals, affordable prices, and excellent customer
                  service.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <img
                className="h-12 w-12 rounded-lg border border-rose-400 object-fill"
                src={images?.placeToStay.src}
                alt={images?.placeToStay.alt}
              />
              <div className="flex flex-col gap-2 text-xs font-bold">
                A Place to Call Home
                <p className="font-normal">
                  {`Our restaurant is more than just a place to grab a quick bite;
                  it's a welcoming environment where locals can come to relax,
                  unwind, and enjoy great food.`}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <img
                className="h-12 w-12 rounded-lg border border-rose-400 object-fill"
                src={images?.events.src}
                alt={images?.events.alt}
              />
              <div className="flex flex-col gap-2 text-xs font-bold">
                {`We're a Part of the Community`}
                <p className="font-normal">
                  We take pride in being a part of the local community and
                  strive to give back by supporting local events and businesses.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <img
                className="h-12 w-12 rounded-lg border border-rose-400 object-fill"
                src={images?.ourStaff.src}
                alt={images?.ourStaff.alt}
              />
              <div className="flex flex-col gap-2 text-xs font-bold">
                A Staff of Locals
                <p className="font-normal">
                  Our team is made up of friendly locals who know the community
                  well and are passionate about providing top-notch service.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <img
                className="h-12 w-12 rounded-lg border border-rose-400 object-fill"
                src={images?.experience.src}
                alt={images?.experience.alt}
              />
              <div className="flex flex-col gap-2 text-xs font-bold">
                We Understand What Locals Want
                <p className="font-normal">
                  {`Our restaurant has been serving the community for years, and
                  we've learned what locals want when it comes to fast food:
                  fresh, tasty meals that are priced affordably.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
