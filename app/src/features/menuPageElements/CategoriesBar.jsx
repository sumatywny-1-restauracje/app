import { useState } from "react";
import { isMobile } from "react-device-detect";
import useInterval from "../../hooks/useInterval";
import HamburgerPath from "../../assets/hamburger.png";
import ChickenPizzaPath from "../../assets/pizza-slice.png";
import FrenchFriesPath from "../../assets/french-fries.png";

const CategoriesBar = ({ selectedCategory, setSelectedCategory }) => {
  const [autoScroll, setAutoScroll] = useState(true);
  const [scrollDirection, setScrollDirection] = useState("right");

  useInterval(() => {
    const element = document.getElementById("scroll");
    const scrollMax = element.scrollWidth - element.clientWidth;
    if (!autoScroll) return;

    if (scrollDirection === "right") {
      element.scrollLeft += 72;
    } else {
      element.scrollLeft -= 72;
    }

    if (element.scrollLeft === 0) {
      setScrollDirection("right");
    } else if (element.scrollLeft === scrollMax) {
      console.log(element.scrollLeft, scrollMax);
      setScrollDirection("left");
    }
  }, 2000);

  const handleStopAutoScroll = () => {
    setAutoScroll(false);
  };

  return (
    <div
      id="scroll"
      onFocus={handleStopAutoScroll}
      className={
        " mt-4 flex w-full gap-3 " +
        (isMobile
          ? "justify-start overflow-x-auto scroll-smooth"
          : "flex-wrap justify-center md:flex-nowrap xl:flex-nowrap")
      }
    >
      <div
        className={
          " flex gap-3 " +
          (isMobile
            ? "w-max flex-row flex-nowrap justify-start"
            : "w-full flex-wrap justify-center sm:flex-nowrap sm:justify-around")
        }
      >
        <button
          className={
            " flex flex-col rounded-3xl px-2 py-3 " +
            (selectedCategory === "all"
              ? "bg-orange-400"
              : "bg-orange-200 hover:bg-orange-300")
          }
          onClick={() => setSelectedCategory("all")}
          disabled={selectedCategory === "all"}
        >
          <div className="rounded-full bg-zinc-100 p-3">
            <img
              src={ChickenPizzaPath}
              alt="all"
              className="w-8 max-w-max md:w-5 lg:w-[26px] xl:w-8"
            />
          </div>
          <span className="mt-2 text-sm font-bold md:text-xs xl:text-sm">
            All
          </span>
        </button>
        <button
          className={
            " flex flex-col rounded-3xl px-2 py-3 " +
            (selectedCategory === "burgers"
              ? "bg-orange-400"
              : "bg-orange-200 hover:bg-orange-300")
          }
          onClick={() => setSelectedCategory("burgers")}
          disabled={selectedCategory === "burgers"}
        >
          <div className="rounded-full bg-zinc-100 p-3">
            <img
              src={HamburgerPath}
              alt="burger"
              className="w-8 max-w-max md:w-5 lg:w-[26px] xl:w-8"
            />
          </div>
          <span className="mt-2 text-sm font-bold md:text-xs xl:mt-2 xl:text-sm">
            Burger
          </span>
        </button>
        <button
          className={
            " flex flex-col rounded-3xl px-2 py-3 " +
            (selectedCategory === "fries"
              ? "bg-orange-400"
              : "bg-orange-200 hover:bg-orange-300")
          }
          onClick={() => setSelectedCategory("fries")}
          disabled={selectedCategory === "fries"}
        >
          <div className="rounded-full bg-zinc-100 p-3">
            <img
              src={FrenchFriesPath}
              alt="fries"
              className="w-8 max-w-max md:w-5 lg:w-[26px] xl:w-8"
            />
          </div>
          <span className="mt-2 text-sm font-bold md:text-xs xl:mt-2 xl:text-sm">
            Fries
          </span>
        </button>
        <button
          className={
            " flex flex-col rounded-3xl px-2 py-3 " +
            (selectedCategory === "pizzas"
              ? "bg-orange-400"
              : "bg-orange-200 hover:bg-orange-300")
          }
          onClick={() => setSelectedCategory("pizzas")}
          disabled={selectedCategory === "pizzas"}
        >
          <div className="rounded-full bg-zinc-100 p-3">
            <img
              src={ChickenPizzaPath}
              alt="pizza"
              className="w-8 max-w-max md:w-5 lg:w-[26px] xl:w-8"
            />
          </div>
          <span className="mt-2 text-sm font-bold md:text-xs xl:mt-2 xl:text-sm">
            Pizza
          </span>
        </button>
        <button
          className={
            " flex flex-col rounded-3xl px-2 py-3 " +
            (selectedCategory === "burger1"
              ? "bg-orange-400"
              : "bg-orange-200 hover:bg-orange-300")
          }
          onClick={() => setSelectedCategory("burger1")}
          disabled={selectedCategory === "burger1"}
        >
          <div className="rounded-full bg-zinc-100 p-3">
            <img
              src={HamburgerPath}
              alt="burger"
              className="w-8 max-w-max md:w-5 lg:w-[26px] xl:w-8"
            />
          </div>
          <span className="mt-2 text-sm font-bold md:text-xs xl:mt-2 xl:text-sm">
            Burger
          </span>
        </button>
      </div>
      <div
        className={
          " flex gap-3 " +
          (isMobile
            ? "w-max flex-row flex-nowrap justify-start"
            : "w-full flex-wrap justify-center sm:flex-nowrap sm:justify-around")
        }
      >
        <button
          className={
            " flex flex-col rounded-3xl px-2 py-3 " +
            (selectedCategory === "fries1"
              ? "bg-orange-400"
              : "bg-orange-200 hover:bg-orange-300")
          }
          onClick={() => setSelectedCategory("fries1")}
          disabled={selectedCategory === "fries1"}
        >
          <div className="rounded-full bg-zinc-100 p-3">
            <img
              src={FrenchFriesPath}
              alt="fries"
              className="w-8 max-w-max md:w-5 lg:w-[26px] xl:w-8"
            />
          </div>
          <span className="mt-2 text-sm font-bold md:text-xs xl:mt-2 xl:text-sm">
            Fries
          </span>
        </button>
        <button
          className={
            " flex flex-col rounded-3xl px-2 py-3 " +
            (selectedCategory === "pizza2"
              ? "bg-orange-400"
              : "bg-orange-200 hover:bg-orange-300")
          }
          onClick={() => setSelectedCategory("pizza2")}
          disabled={selectedCategory === "pizza2"}
        >
          <div className="rounded-full bg-zinc-100 p-3">
            <img
              src={ChickenPizzaPath}
              alt="pizza"
              className="w-8 max-w-max md:w-5 lg:w-[26px] xl:w-8"
            />
          </div>
          <span className="mt-2 text-sm font-bold md:text-xs xl:mt-2 xl:text-sm">
            Pizza
          </span>
        </button>
        <button
          className={
            " flex flex-col rounded-3xl px-2 py-3 " +
            (selectedCategory === "burger2"
              ? "bg-orange-400"
              : "bg-orange-200 hover:bg-orange-300")
          }
          onClick={() => setSelectedCategory("burger2")}
          disabled={selectedCategory === "burger2"}
        >
          <div className="rounded-full bg-zinc-100 p-3">
            <img
              src={HamburgerPath}
              alt="burger"
              className="w-8 max-w-max md:w-5 lg:w-[26px] xl:w-8"
            />
          </div>
          <span className="mt-2 text-sm font-bold md:text-xs xl:mt-2 xl:text-sm">
            Burger
          </span>
        </button>
        <button
          className={
            " flex flex-col rounded-3xl px-2 py-3 " +
            (selectedCategory === "fries2"
              ? "bg-orange-400"
              : "bg-orange-200 hover:bg-orange-300")
          }
          onClick={() => setSelectedCategory("fries2")}
          disabled={selectedCategory === "fries2"}
        >
          <div className="rounded-full bg-zinc-100 p-3">
            <img
              src={FrenchFriesPath}
              alt="fries"
              className="w-8 max-w-max md:w-5 lg:w-[26px] xl:w-8"
            />
          </div>
          <span className="mt-2 text-sm font-bold md:text-xs xl:mt-2 xl:text-sm">
            Fries
          </span>
        </button>
        <button
          className={
            " flex flex-col rounded-3xl px-2 py-3 " +
            (selectedCategory === "pizza3"
              ? "bg-orange-400"
              : "bg-orange-200 hover:bg-orange-300")
          }
          onClick={() => setSelectedCategory("pizza3")}
          disabled={selectedCategory === "pizza3"}
        >
          <div className="rounded-full bg-zinc-100 p-3">
            <img
              src={ChickenPizzaPath}
              alt="pizza"
              className="w-8 max-w-max md:w-5 lg:w-[26px] xl:w-8"
            />
          </div>
          <span className="mt-2 text-sm font-bold md:text-xs xl:mt-2 xl:text-sm">
            Pizza
          </span>
        </button>
      </div>
    </div>
  );
};

export default CategoriesBar;
