import { Rating } from "flowbite-react";
import { useEffect, useRef, useState, useContext } from "react";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import { api } from "~/utils/api";
import { UserContext } from "~/root";

type VoteProductPopupProps = {
  item: any;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setRatedProducts: (ratedProducts: any) => void;
};

const VoteProductPopup = ({
  item,
  showModal,
  setShowModal,
  setRatedProducts,
}: VoteProductPopupProps) => {
  const user = useContext(UserContext);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowModal(false));

  const [product, setProduct] = useState({});
  const [userVote, setUserVote] = useState(null);

  const handleVote = async () => {
    const jwtToken = user?.jwtToken;
    const res = await api.patch(
      `/menu/${item?.itemId}/rate`,
      { rating: userVote },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

    if (res.status === 200) {
      setShowModal(false);
      setRatedProducts((ratedProducts) => [...ratedProducts, item?.itemId]);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/menu/${item?.itemId}`);
      console.log(res);

      if (res.status === 200) {
        setProduct(res.data?.menuItem);
      }
    };

    if (item) {
      fetchProduct();
    }
  }, [item]);

  return (
    <div
      aria-hidden="false"
      className={
        " fixed left-0 right-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 md:inset-0 md:h-full " +
        (showModal ? "block" : "hidden")
      }
      data-testid="modal"
      role="dialog"
    >
      <div
        ref={ref}
        className="relative h-auto w-3/4 min-w-[350px] max-w-[400px] p-4 sm:w-1/3"
      >
        <div className="relative rounded-lg bg-zinc-100 shadow">
          <div className="flex items-start justify-between rounded-t p-2">
            <button
              aria-label="Close"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-xl text-gray-400 hover:bg-orange-400 hover:text-white"
              onClick={() => setShowModal(false)}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="flex flex-col gap-4 p-6 pt-0  text-gray-700">
            <div className="flex gap-3 rounded-lg border border-gray-700 bg-orange-100 p-1">
              <img
                src={item?.photoUrl}
                alt={item?.name}
                className="aspect-square w-1/3 rounded-lg border-2 border-gray-700 sm:w-1/3 md:w-1/3"
              />
              <div className="flex w-full flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-bold">{item?.name}</span>
                  <span className="text-sm text-gray-500">
                    ${item?.price.toFixed(2)}
                  </span>
                </div>
                <Rating className="mt-1">
                  <Rating.Star filled={product?.rating > 0 && true} />
                  <Rating.Star filled={product?.rating > 1 && true} />
                  <Rating.Star filled={product?.rating > 2 && true} />
                  <Rating.Star filled={product?.rating > 3 && true} />
                  <Rating.Star filled={product?.rating > 4 && true} />
                  <p className="ml-2 text-xs font-medium text-gray-500 lg:text-sm">
                    ({product?.numberOfRatings ?? 0})
                  </p>
                </Rating>
              </div>
            </div>
            <div className="grid w-full grid-cols-5 gap-2 rounded-xl border border-gray-700 bg-orange-100 p-2 text-xs">
              <div className="col-span-5 text-center">Your Vote:</div>
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  className={
                    " flex aspect-square w-full items-center justify-center rounded-lg bg-orange-200 " +
                    (userVote === i
                      ? "cursor-default bg-orange-300"
                      : "hover:bg-orange-300")
                  }
                  onClick={() => setUserVote(i)}
                  disabled={userVote === i}
                >
                  {i}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <button
                className={
                  "flex w-full  items-center justify-center gap-2 rounded-xl bg-orange-300 py-3 font-semibold text-gray-600 " +
                  (userVote === null
                    ? "cursor-not-allowed opacity-60"
                    : "hover:bg-orange-400")
                }
                onClick={handleVote}
              >
                Send Rate!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteProductPopup;
