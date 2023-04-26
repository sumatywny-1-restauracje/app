import type { Image } from "types";
import { Link, useLocation } from "@remix-run/react";

type ErrorPageProps = {
  image?: Image;
  action: {
    to: string;
    text: string;
  };
};

const ErrorPage = ({ image, action }: ErrorPageProps) => {
  const location = useLocation();
  return (
    <main className="flex w-5/6 max-w-screen-lg flex-col items-center gap-5 pb-12 pt-4 md:w-4/6">
      <img
        src={image?.src}
        alt={image?.alt}
        className="w-full rounded-2xl shadow-xl"
      />
      <h1 className="flex flex-wrap justify-center font-serif text-2xl font-semibold text-rose-400 sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        Oh no... <span className="whitespace-pre"> No results found</span>
      </h1>
      <h2 className="flex w-3/5 text-center text-sm text-gray-500 sm:flex-col sm:text-base xl:text-lg">
        {`We searched everywhere but couldn't find page "${
          location.search
            ? location.pathname + location.search
            : location.pathname
        }". Let's find a better place for you to go.`}
      </h2>
      <Link
        to={action.to}
        prefetch="intent"
        className="rounded-2xl bg-rose-400 px-4 py-3  text-lg font-semibold text-white hover:bg-rose-500 sm:text-xl lg:text-2xl"
      >
        {action.text}
      </Link>
    </main>
  );
};

export default ErrorPage;
