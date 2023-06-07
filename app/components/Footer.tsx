import type { User } from "types";
import { useContext } from "react";
import { Link } from "@remix-run/react";
import { UserContext, BasketContext } from "~/root";
import {
  BsPinterest,
  BsFacebook,
  BsTwitter,
  BsInstagram,
} from "react-icons/bs";

const Footer = () => {
  const user = useContext(UserContext) as User;

  return (
    <footer>
      <div className="flex h-max flex-col items-center self-center bg-orange-100 font-sans">
        <div className="flex w-full max-w-screen-lg justify-around py-6 md:w-4/6 md:flex-row md:justify-between">
          <div className="hidden gap-8 md:flex md:flex-col">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-rose-400">Foodsi</h2>
              <span className="text-sm text-gray-500 sm:text-center">
                <a href="/">Foodsi</a> © 2023 all rights reserved.
              </span>
            </div>
            <div>
              <h2 className="mb-4 text-3xl font-bold text-rose-400">
                Follow Us On
              </h2>
              <div className="flex gap-5 text-lg text-gray-500">
                <a href="/" className="hover:text-gray-700">
                  <BsPinterest />
                </a>
                <a href="/" className="hover:text-gray-700">
                  <BsInstagram />
                </a>
                <a href="/" className="hover:text-gray-700">
                  <BsTwitter />
                </a>
                <a href="/" className="hover:text-gray-700">
                  <BsFacebook />
                </a>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-bold text-rose-400 md:text-3xl">
              Menu
            </h2>
            <ul className="text-sm font-medium text-gray-500 md:text-sm">
              <li className="mb-4">
                <Link to="/" prefetch="intent" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/menu" prefetch="intent" className="hover:underline">
                  Offers
                </Link>
              </li>
              {user && (
                <li className="mb-4">
                  <Link
                    to="/order"
                    prefetch="intent"
                    className="hover:underline"
                  >
                    Your Basket
                  </Link>
                </li>
              )}
              <li className="mb-4">
                <Link to="/about" prefetch="intent" className="hover:underline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-bold text-rose-400 md:text-3xl">
              Information
            </h2>
            <ul className="md:text-md text-sm font-medium text-gray-500">
              <li className="mb-4">
                <Link
                  to="/locals"
                  prefetch="intent"
                  className="hover:underline"
                >
                  Locals
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/job-application"
                  prefetch="intent"
                  className="hover:underline"
                >
                  Job Application
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/franchise-application"
                  prefetch="intent"
                  className="hover:underline"
                >
                  Franchise Application
                </Link>
              </li>
              <li className="mb-4">
                <a href="mailto:info@foodsi.com" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-3 mt-4 flex w-full flex-col items-center md:hidden">
          <div>
            <div className="mb-2 flex justify-center gap-5 text-lg text-gray-500">
              <a href="/" className="hover:text-gray-700">
                <BsPinterest />
              </a>
              <a href="/" className="hover:text-gray-700">
                <BsInstagram />
              </a>
              <a href="/" className="hover:text-gray-700">
                <BsTwitter />
              </a>
              <a href="/" className="hover:text-gray-700">
                <BsFacebook />
              </a>
            </div>
            <span className="text-sm text-gray-500 sm:text-center">
              <a href="/">Foodsi</a> © 2023 all rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
