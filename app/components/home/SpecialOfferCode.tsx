import type { Image } from "types";
import { useState } from "react";

const SpecialOfferCode = ({
  image,
  discountCode,
}: {
  image: Image;
  discountCode: string;
}) => {
  const [codeCopied, setCodeCopied] = useState(false);
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <img
        src={image.src}
        alt={image.alt}
        className="h-full w-full object-fill opacity-40"
      />
      <div className="absolute flex w-2/3 rounded-lg border-2 border-gray-700 bg-rose-400">
        <div className="flex w-2/3 flex-col border-r-2 border-gray-700 text-center text-white">
          <p className="flex h-full w-full items-center justify-center py-2 text-xs text-gray-700">
            Include This in Your Order!
          </p>
          <div className="border border-gray-700" />
          <p className="flex h-full w-full items-center justify-center py-2 text-xs">
            {discountCode}
          </p>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(discountCode);
            setCodeCopied(true);
          }}
          className={
            "flex w-1/3 items-center justify-center py-4 text-xs font-semibold sm:text-base" +
            (codeCopied ? " text-white" : " text-gray-700 hover:text-white")
          }
          disabled={codeCopied}
        >
          {codeCopied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default SpecialOfferCode;
