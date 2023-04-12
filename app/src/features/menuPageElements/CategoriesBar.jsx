import { useState } from "react";
import { isMobile } from "react-device-detect";
import useInterval from "../../hooks/useInterval";

const CategoriesBar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
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
      setScrollDirection("left");
    }
  }, 2000);

  const handleStopAutoScroll = () => {
    setAutoScroll(false);
  };

  const categoryButton = (id, name, image) => {
    return (
      <button
        key={id}
        className={
          " flex flex-col rounded-3xl px-2 py-3 " +
          (selectedCategory === name
            ? "bg-orange-400"
            : "bg-orange-200 hover:bg-orange-300")
        }
        onClick={() => setSelectedCategory(name)}
        disabled={selectedCategory === name}
      >
        <div className="flex items-center justify-center rounded-full bg-zinc-100 p-3">
          <img
            src={image}
            alt={name}
            className="w-8 max-w-max md:w-8 lg:w-[26px] xl:w-8"
          />
        </div>
        <span className="mt-2 text-sm font-bold xl:mt-2">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </span>
      </button>
    );
  };

  return (
    <div
      id="scroll"
      onFocus={handleStopAutoScroll}
      className={
        " mt-4 flex gap-3 " +
        (isMobile
          ? "w-full justify-start overflow-x-auto scroll-smooth"
          : "w-full flex-wrap justify-center md:w-5/6 md:flex-nowrap lg:w-full")
      }
    >
      <div
        className={
          " flex gap-3 " +
          (isMobile
            ? "w-max flex-row flex-nowrap justify-start"
            : "w-full flex-wrap justify-center lg:flex-nowrap lg:justify-around")
        }
      >
        {categories.map((category) => {
          return categoryButton(category.id, category.name, category.image);
        })}
      </div>
    </div>
  );
};

export default CategoriesBar;
