import type { User } from "types";
import { useEffect, useState, useContext } from "react";
import { Link } from "@remix-run/react";
import { Avatar, Dropdown } from "flowbite-react";
import { FaRegUser, FaHistory, FaShoppingBasket } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import NavbarRoutesList from "./NavbarRoutesList";
import LoginForm from "./LoginForm";
import { UserContext, BasketContext } from "~/root";
import Basket from "./Basket";
import UserProfile from "./UserProfile";

const sumBasket = (basket) => {
  return basket.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

type NavbarProps = {
  userPhoto: string;
};

const Navbar = ({ userPhoto }: NavbarProps) => {
  const user = useContext(UserContext) as User;
  const basketData = useContext(BasketContext);
  const [menuDropdown, setMenuDropdown] = useState(false);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // need to add debounce
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos && !menuDropdown) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBasketModal, setShowBasketModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <nav
        className={
          " delay-400 sticky top-0 z-20 h-max transform bg-orange-100 py-6 transition-all duration-500 ease-in-out " +
          (visible ? "flex -translate-y-0 flex-col" : "-translate-y-full")
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
            {!user ? (
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="text-md rounded-xl border border-rose-400 p-1 px-4 text-center font-semibold text-rose-400 hover:border-rose-600 hover:text-rose-600 md:mr-0"
              >
                Login
              </button>
            ) : (
              <div className="flex gap-3">
                {/* <Basket visible={visible} /> */}
                <button
                  className="flex items-center justify-center rounded-full border-2 border-rose-400 bg-orange-100 p-2 text-[24px] text-rose-400 hover:border-rose-500 hover:text-rose-500"
                  type="button"
                  onClick={() => setShowBasketModal(true)}
                >
                  <FaShoppingBasket />
                  {basketData.basket.length > 0 && (
                    <span className="fixed block min-w-[32px] -translate-y-4 translate-x-5 rounded-full border-2 border-rose-400 bg-rose-300 p-1 text-center text-sm font-bold text-gray-700">
                      {basketData.basket.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}
                    </span>
                  )}
                </button>
                <button type="button" onClick={() => setShowUserModal(true)}>
                  <Avatar
                    alt="User profile"
                    className="rounded-full border-2 border-rose-400"
                    img={
                      userPhoto ||
                      "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    }
                    rounded={true}
                  />
                </button>
                {/* {visible ? (
                  <Dropdown
                    arrowIcon={false}
                    inline={true}
                    dismissOnClick={true}
                    className="rounded-xl bg-orange-200"
                    label={
                      <Avatar
                        alt="User profile"
                        className="rounded-full border-2 border-rose-400"
                        img={
                          userPhoto ||
                          "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        }
                        rounded={true}
                      />
                    }
                  >
                    {user?.name && (
                      <Dropdown.Header>
                        <span className="block text-sm">{user?.name}</span>
                      </Dropdown.Header>
                    )}
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
                    <Dropdown.Item>
                      <form action="/logout" method="post">
                        <button>Log out</button>
                      </form>
                    </Dropdown.Item>
                  </Dropdown>
                ) : (
                  <Avatar
                    alt="User profile"
                    className="rounded-full border-2 border-rose-400"
                    img={
                      userPhoto ||
                      "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    }
                    rounded={true}
                  />
                )} */}
              </div>
            )}
          </div>
          <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
            <NavbarRoutesList setMenuDropdown={setMenuDropdown} />
          </div>
        </div>
        {menuDropdown && (
          <div className="flex w-full flex-auto md:hidden">
            <NavbarRoutesList setMenuDropdown={setMenuDropdown} />
          </div>
        )}
      </nav>
      <LoginForm showModal={showLoginModal} setShowModal={setShowLoginModal} />
      <Basket showModal={showBasketModal} setShowModal={setShowBasketModal} />
      <UserProfile showModal={showUserModal} setShowModal={setShowUserModal} />
    </>
  );
};

export default Navbar;
