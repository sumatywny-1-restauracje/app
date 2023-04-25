import { Link } from "@remix-run/react";
import type { Image } from "types";

type CategoryButtonProps = {
  id: number;
  name: string;
  image: Image;
  selectedCategory: string | null;
  sortBy: string | null;
};

export default function CategoryButton({
  id,
  name,
  image,
  selectedCategory,
  sortBy,
}: CategoryButtonProps) {
  return (
    <Link
      key={id}
      className={
        " flex flex-col items-center rounded-3xl px-2 py-3 " +
        (selectedCategory === name
          ? "bg-orange-400"
          : "bg-orange-200 hover:bg-orange-300")
      }
      prefetch="intent"
      to={`/menu/${name}/?sortBy=${sortBy}`}
    >
      <div className="flex items-center justify-center rounded-full bg-zinc-100 p-3">
        <img
          src={image.src}
          alt={image.alt}
          className="w-8 max-w-max md:w-8 lg:w-[26px] xl:w-8"
        />
      </div>
      <span className="mt-2 text-sm font-bold xl:mt-2">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </span>
    </Link>
  );
}
