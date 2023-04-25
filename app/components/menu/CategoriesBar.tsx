import type { Category } from "types";
import { useState } from "react";
import useInterval from "~/hooks/useInterval";
import CategoryButton from "./CategoryButton";

type CategoriesBarProps = {
  categories: Array<Category>;
  selectedCategory: string | null;
  sortBy: string | null;
};

const CategoriesBar = ({
  categories,
  selectedCategory,
  sortBy,
}: CategoriesBarProps) => {
  const [autoScroll, setAutoScroll] = useState(true);
  const [scrollDirection, setScrollDirection] = useState("right");

  useInterval(() => {
    const element = document.getElementById("scroll") as HTMLElement;
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

  return (
    <div
      id="scroll"
      onFocus={handleStopAutoScroll}
      className="mt-4 flex w-full flex-wrap justify-center gap-3 max-md:justify-start max-md:overflow-x-auto max-md:scroll-smooth md:w-5/6 md:flex-nowrap lg:w-full"
    >
      <div className=" flex w-full flex-wrap justify-center gap-3 max-md:w-max max-md:flex-row max-md:flex-nowrap max-md:justify-start lg:flex-nowrap lg:justify-around">
        {categories.map((category) => {
          return (
            <CategoryButton
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesBar;
