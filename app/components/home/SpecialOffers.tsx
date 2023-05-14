import type { SpecialOffer } from "types";
import { useState } from "react";
import SpecialOfferCode from "./SpecialOfferCode";

type SpecialOffersProps = {
  specialOffers: Array<SpecialOffer>;
};

const SpecialOffers = ({ specialOffers }: SpecialOffersProps) => {
  const [specialOfferFirst, setSpecialOfferFirst] = useState(false);
  const [specialOfferSecond, setSpecialOfferSecond] = useState(false);
  const [specialOfferThird, setSpecialOfferThird] = useState(false);

  return (
    <div className="flex w-4/6 flex-col items-center gap-6">
      <h2 className="w-full bg-clip-text text-3xl font-extrabold text-gray-700 max-md:text-center sm:text-4xl md:text-5xl">
        New <span className="text-rose-400">Special</span> Offers
      </h2>
      <div className="grid h-full max-h-[27rem] grid-cols-1 gap-4 sm:grid-cols-2">
        {!specialOfferFirst ? (
          <button
            className="relative row-span-2 overflow-hidden rounded-xl"
            onClick={() => setSpecialOfferFirst(true)}
          >
            <span className="absolute left-3 top-3 w-max rounded-lg bg-gray-500 bg-opacity-70 p-2 text-base font-bold text-white md:text-3xl lg:text-4xl">
              {specialOffers[0].value} Discount
            </span>
            <img
              src={specialOffers[0].image.src}
              alt={specialOffers[0].image.alt}
              className="h-full w-full object-fill "
            />
          </button>
        ) : (
          <div className="relative row-span-2 overflow-hidden rounded-xl">
            <SpecialOfferCode
              image={specialOffers[0].image}
              discountCode={specialOffers[0]?.discountCode}
            />
          </div>
        )}
        {!specialOfferSecond ? (
          <button
            className="relative overflow-hidden rounded-xl"
            onClick={() => setSpecialOfferSecond(true)}
          >
            <span className="absolute right-3 top-3 w-max rounded-lg bg-gray-500 bg-opacity-70 p-2 text-base font-bold text-white md:text-3xl lg:text-4xl">
              {specialOffers[1].value} Discount
            </span>
            <img
              src={specialOffers[1].image.src}
              alt={specialOffers[1].image.alt}
              className="h-full w-full object-fill "
            />
          </button>
        ) : (
          <div className="relative overflow-hidden rounded-xl">
            <SpecialOfferCode
              image={specialOffers[1].image}
              discountCode={specialOffers[1]?.discountCode}
            />
          </div>
        )}
        {!specialOfferThird ? (
          <button
            className="relative overflow-hidden rounded-xl"
            onClick={() => setSpecialOfferThird(true)}
            disabled={specialOfferThird}
          >
            <span className="absolute bottom-3 right-3 w-max rounded-lg bg-gray-500 bg-opacity-70 p-2 text-base font-bold text-white md:text-3xl lg:text-4xl">
              {specialOffers[2].value} Discount
            </span>
            <img
              src={specialOffers[2].image.src}
              alt={specialOffers[2].image.alt}
              className="h-full w-full object-fill"
            />
          </button>
        ) : (
          <div className="relative overflow-hidden rounded-xl">
            <SpecialOfferCode
              image={specialOffers[2].image}
              discountCode={specialOffers[2]?.discountCode}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialOffers;
