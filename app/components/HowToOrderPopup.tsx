import { useRef } from "react";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import movieMp4 from "../assets/how_to_order.mp4";
import movieWebm from "../assets/how_to_order.webm";

type HowToOrderPopupProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const HowToOrderPopup = ({ showModal, setShowModal }: HowToOrderPopupProps) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowModal(false));

  return (
    <div
      aria-hidden="false"
      className={
        " fixed left-0 right-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-60 md:inset-0 md:h-full " +
        (showModal ? "block" : "hidden")
      }
      data-testid="modal"
      role="dialog"
    >
      <div
        ref={ref}
        className="relative mx-3 h-max w-full  max-w-[1000px] rounded-xl bg-zinc-50 p-4 md:w-3/4"
      >
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
        <div className="mt-1 flex h-full w-full flex-col items-center justify-center">
          <video
            controls
            className="h-full w-full rounded-xl border-2 border-orange-400"
            autoPlay
            muted
          >
            <source src={movieWebm} type="video/webm" />
            <source src={movieMp4} type="video/mp4" />
            Sorry, your browser doesnt support videos.
          </video>
        </div>
      </div>
    </div>
  );
};

export default HowToOrderPopup;
