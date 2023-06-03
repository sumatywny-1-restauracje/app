import { useRef, useState } from "react";
import { BsMicrosoft, BsGoogle } from "react-icons/bs";
import useOnClickOutside from "~/hooks/useOnClickOutside";

type LoginFormProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const LoginForm = ({ showModal, setShowModal }: LoginFormProps) => {
  const [dataProcessingConsent, setDataProcessingConsent] = useState(true);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowModal(false));

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
      <div ref={ref} className="relative h-auto w-3/4 p-4 sm:w-1/3">
        <div className="relative rounded-lg bg-zinc-100 shadow">
          <div className="flex items-start justify-between rounded-t p-2">
            <button
              aria-label="Close"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-xl text-gray-400 hover:bg-zinc-300"
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
            <p className="mx-auto mt-4 w-3/4 text-center text-sm">
              Come to <span className="text-rose-400">Foodsi</span> for some
              delicious fast food! Log in to place your order!
            </p>
            <div className="mx-auto flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-200 py-2 text-xs">
              <input
                type="checkbox"
                name="dataProcessingConsent"
                className="border-rose-400 text-rose-400 focus:border-rose-400 focus:ring-rose-400"
                checked={dataProcessingConsent}
                onClick={() => setDataProcessingConsent(!dataProcessingConsent)}
              />
              <p className="w-3/4 text-center">
                By logging in, you give consent for the storage and processing
                of your personal data for the purpose of using{" "}
                <span className="text-rose-400">Foodsi</span> application.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <form action="/auth/microsoft" method="post">
                <button
                  className={
                    " flex w-full  items-center justify-center gap-2 rounded-xl bg-zinc-200 py-3 " +
                    (!dataProcessingConsent
                      ? "cursor-not-allowed opacity-40"
                      : "hover:bg-zinc-300")
                  }
                  disabled={!dataProcessingConsent}
                >
                  <BsMicrosoft />
                  Login with Microsoft
                </button>
              </form>
              {/* <form action="/auth/google" method="post">
                <button className="flex w-full  items-center justify-center gap-2 rounded-xl bg-zinc-200 py-3 hover:bg-zinc-300">
                  <BsGoogle />
                  Login with Google
                </button>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
