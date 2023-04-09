import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Dropdown } from "flowbite-react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [user, setUser] = useState(undefined); // test
  const [menuDropdown, setMenuDropdown] = useState(false);

  useEffect(() => {
    const fetchAuthMe = async () => {
      const res = await axios.get("/.auth/me");
      const userData = res.data.clientPrincipal;

      if (!userData) {
        setUser(undefined);
        return;
      }

      setUser(userData.userDetails);
    };

    fetchAuthMe();
  }, []);

  return (
    <nav className="bg-orange-100">
      <div className="mx-auto flex w-full max-w-screen-lg flex-wrap items-center justify-around py-6 font-sans md:w-4/6 md:justify-between">
        <a href="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-2xl font-bold text-gray-700">
            Foodsi
          </span>
        </a>
        <div className="flex md:order-2">
          {!user ? (
            <a
              href="/login"
              target="_self"
              type="button"
              className="text-md mr-3 rounded-xl border border-rose-400 p-1 px-4 text-center font-semibold text-rose-400 hover:border-rose-600 hover:text-rose-600 md:mr-0"
            >
              Login
            </a>
          ) : (
            <Dropdown
              arrowIcon={false}
              inline={true}
              className="rounded-xl bg-orange-200"
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded={true}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  {user}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          )}
          <button
            type="button"
            className="ml-1 inline-flex items-center rounded-lg p-1 text-sm text-gray-500 focus:ring-2 active:outline-none active:ring-gray-200 md:hidden"
            onClick={() => setMenuDropdown(!menuDropdown)}
          >
            <span className="sr-only">Open main menu</span>
            <GiHamburgerMenu />
          </button>
        </div>
        <div
          className="w-full items-center justify-between md:order-1 md:flex md:w-auto"
          hidden={!menuDropdown}
        >
          <ul className="mt-4 flex flex-col items-center rounded-lg bg-orange-200 p-4 font-semibold text-gray-500 underline-offset-4 md:mt-0  md:flex-row md:space-x-8  md:bg-inherit md:p-0">
            <li>
              <a
                href="/"
                className="block rounded py-2 pl-3 pr-4 text-black underline md:bg-transparent md:p-0 "
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block rounded py-2 pl-3 pr-4 hover:text-black hover:underline md:p-0"
              >
                Offer
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block rounded py-2 pl-3 pr-4 hover:text-black hover:underline md:p-0"
              >
                Service
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block rounded py-2 pl-3 pr-4 hover:text-black hover:underline md:p-0"
              >
                Menu
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block rounded py-2 pl-3 pr-4 hover:text-black hover:underline md:p-0"
              >
                About Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
