import type { Image } from "types";
import { TbTruckDelivery } from "react-icons/tb";
import { FiRefreshCcw, FiShoppingCart } from "react-icons/fi";
import { TbCashOff } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { Avatar } from "flowbite-react";
import { Link } from "@remix-run/react";

type TeaserProps = {
  homeHeaderAvatar: Image;
  homeHeaderImg: Image;
};

const Teaser = ({ homeHeaderAvatar, homeHeaderImg }: TeaserProps) => {
  return (
    <div className="flex w-full justify-center rounded-b-3xl bg-orange-100 pt-10">
      <div className="flex w-full max-w-screen-2xl flex-col items-center">
        <div className="flex w-4/6 flex-col items-center justify-between gap-6 text-gray-700 max-sm:text-center sm:flex-row">
          <div className="flex w-full flex-col gap-8 max-sm:items-center sm:w-[55%] xl:w-2/3">
            <h1 className="w-5/6 bg-clip-text text-3xl font-extrabold text-rose-400 md:text-4xl lg:text-5xl">
              All Fast Food is Available at{" "}
              <span className="underline decoration-amber-400 decoration-4 underline-offset-4">
                Foodsi
              </span>
            </h1>
            <div className="flex w-3/4 flex-col gap-6 lg:gap-8 xl:gap-11">
              <div className="flex items-center gap-4">
                <Avatar
                  alt={homeHeaderAvatar.alt}
                  img={homeHeaderAvatar.src}
                  rounded={true}
                  className="min-w-max max-sm:my-3"
                />
                <span className="text-left text-xs text-gray-500 xl:text-base">
                  We Are Just A Click Away From You. Order Your Favourite Food
                </span>
              </div>
              <div className="flex flex-col gap-3 max-sm:items-center sm:flex-row sm:gap-6">
                <Link
                  to="/menu"
                  prefetch="intent"
                  className="flex items-center gap-3 rounded-3xl bg-rose-400 p-2 hover:bg-rose-500 max-sm:w-5/6"
                >
                  <div className="rounded-full bg-amber-400 p-2">
                    <FiShoppingCart />
                  </div>
                  <span className="pr-2 text-xs font-bold text-white  xl:text-base">
                    Order Now!
                  </span>
                </Link>
                <button className="flex items-center gap-3 rounded-3xl border-4 border-rose-400 p-2 hover:border-rose-500 max-sm:w-5/6">
                  <div className="rounded-full bg-amber-400 p-2">
                    <FaPlay />
                  </div>
                  <span className="pr-2 text-xs font-bold  xl:text-base">
                    How To Order
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-1/2 max-sm:mt-2 sm:h-0 sm:w-[45%] sm:pb-[45%] xl:w-[33.3%] xl:pb-[33.3%]">
            <img
              src={homeHeaderImg.src}
              alt={homeHeaderImg.alt}
              className=" w-full rotate-90"
            />
          </div>
        </div>
        <div className="w-4/6 translate-y-12 rounded-xl bg-zinc-50 p-4 shadow-xl lg:p-5 xl:p-6">
          <ul className="flex flex-row justify-center gap-5 max-sm:flex-wrap">
            <li className="flex w-1/3 min-w-[8rem] flex-col gap-1 max-lg:items-center max-lg:text-center lg:flex-row lg:gap-3">
              <div className="flex items-center">
                <div className="rounded-full bg-amber-400 p-2 text-xl text-gray-600 lg:p-3 lg:text-2xl xl:p-4 xl:text-3xl">
                  <TbTruckDelivery />
                </div>
              </div>
              <div className="flex flex-col gap-1 lg:gap-2 xl:gap-3">
                <h4 className="font-bold md:text-base lg:text-xl xl:text-2xl">
                  Fast Delivery
                </h4>
                <span className="text-xs">
                  The Food Will Be Delivered To Your Home Within 1-2Hours Of
                  Your Ordering.
                </span>
              </div>
            </li>
            <li className="flex w-1/3 min-w-[8rem] flex-col gap-1 max-lg:items-center max-lg:text-center lg:flex-row lg:gap-3">
              <div className="flex items-center">
                <div className="rounded-full bg-amber-400 p-2 text-xl text-gray-600 lg:p-3 lg:text-2xl xl:p-4 xl:text-3xl">
                  <FiRefreshCcw />
                </div>
              </div>
              <div className="flex flex-col gap-1 lg:gap-2 xl:gap-3">
                <h4 className="font-bold md:text-base lg:text-xl xl:text-2xl">
                  Fresh Food
                </h4>
                <span className="text-xs">
                  Your Food WIll Be Delivered 100% Fresh To Your Home. We Do Not
                  Deliver Stale Food.
                </span>
              </div>
            </li>
            <li className="flex w-1/3 min-w-[8rem] flex-col gap-1 max-lg:items-center max-lg:text-center lg:flex-row lg:gap-3">
              <div className="flex items-center">
                <div className="rounded-full bg-amber-400 p-2 text-xl text-gray-600 lg:p-3 lg:text-2xl xl:p-4 xl:text-3xl">
                  <TbCashOff />
                </div>
              </div>
              <div className="flex flex-col gap-1 lg:gap-2 xl:gap-3">
                <h4 className="font-bold md:text-base lg:text-xl xl:text-2xl">
                  Free Delivery
                </h4>
                <span className="text-xs">
                  Your Food Delivery Is Absolutely Free. No Cost Just Order And
                  Enjoy.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Teaser;
