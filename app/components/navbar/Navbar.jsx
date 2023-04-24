import { useEffect, useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
// import { Avatar, Dropdown } from "flowbite-react";
// import { FaRegUser, FaHistory } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import NavbarRoutesList from "./NavbarRoutesList";

const Navbar = () => {
  // const [user, setUser] = useState(undefined); // test
  const [menuDropdown, setMenuDropdown] = useState(false);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // need to add debounce
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    // console.log(currentScrollPos, prevScrollPos);

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  // useEffect(() => {
  //   const fetchAuthMe = async () => {
  //     const res = await axios.get("/.auth/me");
  //     const userData = res.data.clientPrincipal;

  //     if (!userData) {
  //       setUser(undefined);
  //       return;
  //     }

  //     setUser(userData.userDetails);
  //   };

  //   fetchAuthMe();
  // }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <nav
      className={
        " delay-400 sticky top-0 z-20 h-min transform bg-orange-100 py-6 transition-all duration-500 ease-in-out " +
        (visible
          ? "flex h-screen -translate-y-0 flex-col"
          : "-translate-y-full")
      }
    >
      <div className="mx-auto flex w-4/6 max-w-screen-lg flex-wrap items-center justify-between font-sans">
        <Link to="/" className="flex items-center max-md:hidden">
          <span className="self-center whitespace-nowrap text-2xl font-bold text-gray-700">
            Foodsi
          </span>
        </Link>
        <button
          type="button"
          className="ml-1 inline-flex items-center rounded-lg p-1 text-sm text-gray-500 focus:ring-2 active:outline-none active:ring-gray-200 md:hidden"
          onClick={() => setMenuDropdown(!menuDropdown)}
        >
          <span className="sr-only">Open main menu</span>
          <div className="text-lg">
            <GiHamburgerMenu />
          </div>
        </button>
        <div className="flex justify-center gap-1 md:order-2">
          {/* {!user ? (
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
              </Dropdown.Header>
              <Dropdown.Item>
                <div className="flex items-center gap-1">
                  <FaHistory />
                  <span>Orders</span>
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div className="flex items-center gap-1">
                  <FaRegUser />
                  <span>Profile</span>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          )} */}
        </div>
        <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
          <NavbarRoutesList />
        </div>
      </div>
      {menuDropdown && (
        <div className="flex w-full flex-auto md:hidden">
          <NavbarRoutesList />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
