import type { Category, SortBy, Image } from "types";
import { Form, useSubmit } from "@remix-run/react";
import { Avatar } from "flowbite-react";
import CategoriesBar from "./CategoriesBar";

type HeaderProps = {
  menuHeaderAvatar: Image;
  categories: Array<Category>;
  sortBy: string | null;
  sortByOptions: Array<SortBy>;
  selectedCategory: string | null;
};

const Header = ({
  menuHeaderAvatar,
  categories,
  sortBy,
  sortByOptions,
  selectedCategory,
}: HeaderProps) => {
  const submit = useSubmit();

  return (
    <div className="flex w-full justify-center rounded-b-3xl bg-orange-100 py-10">
      <div className="flex w-full max-w-screen-2xl flex-col items-center">
        <div className="flex w-4/6 flex-col items-center justify-between gap-6 text-gray-700 max-sm:text-center">
          <div className="flex w-full flex-col items-center justify-between max-sm:gap-4 sm:flex-row sm:items-end">
            <div className="flex w-full flex-col gap-3 max-sm:max-w-[290px] sm:w-1/2 sm:gap-6 md:gap-8">
              <h1 className="bg-clip-text text-3xl font-extrabold text-rose-400 md:text-4xl lg:text-5xl">
                Find The Best Food For You
              </h1>
              <div className="flex items-center gap-4">
                <Avatar
                  alt={menuHeaderAvatar.alt}
                  img={menuHeaderAvatar.src}
                  rounded={true}
                  className="min-w-max max-sm:my-3"
                />
                <span className="text-left text-xs text-gray-500 xl:text-base">
                  Every Food Is Prepared With Love And Care. Make Your Day
                  Better And Order Now!
                </span>
              </div>
            </div>
            <Form method="post" onChange={(e) => submit(e.currentTarget)}>
              <select
                className="w-full rounded-lg border-4 border-rose-400 bg-orange-100 bg-transparent p-2 font-bold focus:border-rose-500 focus:ring-0"
                defaultValue={sortBy || "Sort By"}
                name="sortBy"
              >
                {sortByOptions.map((option) => (
                  <option
                    className="bg-rose-300"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </Form>
          </div>
          <CategoriesBar
            categories={categories}
            selectedCategory={selectedCategory}
            sortBy={sortBy}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
