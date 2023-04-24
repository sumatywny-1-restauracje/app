import { Link, useLocation } from "react-router-dom";

const NavbarRoutesList = () => {
  const location = useLocation();
  const locationPath = location.pathname;

  return (
    <ul className="mt-4 flex w-full flex-col items-center justify-center rounded-lg bg-orange-200 p-4 font-semibold text-gray-500 underline-offset-4 md:mt-0  md:flex-row md:space-x-8  md:bg-inherit md:p-0">
      <li>
        <Link
          to="/"
          className={
            " block rounded py-2 pl-3 pr-4 md:bg-transparent md:p-0 " +
            (locationPath === "/"
              ? "text-black underline"
              : "hover:text-black hover:underline")
          }
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="block rounded py-2 pl-3 pr-4 hover:text-black hover:underline md:p-0"
        >
          Service
        </Link>
      </li>
      <li>
        <Link
          to="/menu"
          className={
            " block rounded py-2 pl-3 pr-4 md:bg-transparent md:p-0 " +
            (locationPath === "/menu"
              ? "text-black underline"
              : "hover:text-black hover:underline")
          }
        >
          Menu
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="block rounded py-2 pl-3 pr-4 hover:text-black hover:underline md:p-0"
        >
          About Us
        </Link>
      </li>
    </ul>
  );
};

export default NavbarRoutesList;
