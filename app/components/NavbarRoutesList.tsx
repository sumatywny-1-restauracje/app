import { Link, useLocation } from "@remix-run/react";

const NavbarRoutesList = ({
  setMenuDropdown,
  userRole,
}: {
  setMenuDropdown: (arg: boolean) => void;
  userRole: string;
}) => {
  const location = useLocation();

  return (
    <ul className="mt-4 flex w-full flex-col items-center justify-center rounded-lg bg-orange-200 p-4 font-semibold text-gray-500 underline-offset-4 md:mt-0  md:flex-row md:space-x-8  md:bg-inherit md:p-0">
      <li>
        <Link
          to="/"
          prefetch="intent"
          onClick={() => setMenuDropdown(false)}
          className={
            " block rounded py-2 pl-3 pr-4 md:bg-transparent md:p-0 " +
            (location.pathname === "/"
              ? "text-black underline"
              : "hover:text-black hover:underline")
          }
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/locals"
          prefetch="intent"
          onClick={() => setMenuDropdown(false)}
          className={
            " block rounded py-2 pl-3 pr-4 md:bg-transparent md:p-0 " +
            (location.pathname === "/locals"
              ? "text-black underline"
              : "hover:text-black hover:underline")
          }
        >
          Locals
        </Link>
      </li>
      <li>
        <Link
          to="/menu"
          prefetch="intent"
          onClick={() => setMenuDropdown(false)}
          className={
            " block rounded py-2 pl-3 pr-4 md:bg-transparent md:p-0 " +
            (location.pathname.includes("/menu")
              ? "text-black underline"
              : "hover:text-black hover:underline")
          }
        >
          Menu
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          prefetch="intent"
          onClick={() => setMenuDropdown(false)}
          className={
            " block rounded py-2 pl-3 pr-4 md:bg-transparent md:p-0 " +
            (location.pathname === "/about"
              ? "text-black underline"
              : "hover:text-black hover:underline")
          }
        >
          About Us
        </Link>
      </li>
      {["BOSS", "EMPLOYEE", "DELIVERY".includes(userRole)] && (
        <li>
          <Link
            to="/employee"
            prefetch="intent"
            onClick={() => setMenuDropdown(false)}
            className={
              " block rounded py-2 pl-3 pr-4 md:bg-transparent md:p-0 " +
              (location.pathname === "/employee"
                ? "text-black underline"
                : "hover:text-black hover:underline")
            }
          >
            Employee Panel
          </Link>
        </li>
      )}
    </ul>
  );
};

export default NavbarRoutesList;
