import React, { useEffect } from "react";

const MessageBox = ({ isOpen, title, content, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && onCancel) {
        onCancel();
      }
      // else if (isOpen && event.key === 'Enter') {
      //   onConfirm();
      // }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="relative z-[1300]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center !p-4 text-center sm:items-center sm:!p-0">
          <div
            onClick={onCancel}
            className="fixed z-30 inset-0 bg-black/50 backdrop-blur-sm bg-opacity-20"
          ></div>
          <div className="border z-40 border-slate-200 vrelative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:!my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white !px-4 !pb-4 !pt-5 sm:!p-6 sm:!pb-4">
              <div className="sm:flex sm:items-start">
                <div className="!mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:!mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}   
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="!mt-3 text-center sm:!ml-4 sm:!mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-slate-600"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div className="!mt-2">
                    <p className="text-sm text-slate-600 opacity-80">
                      {content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 !px-4 !py-3 sm:flex sm:flex-row-reverse sm:!px-6">
              <button
                type="button"
                className="flex items-center w-full justify-center rounded-md bg-red-600 !px-3 !py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:!ml-3 sm:w-auto"
                onClick={onConfirm}
              >
                Onayla
              </button>
              <button
                type="button"
                className="!mt-3 flex items-center w-full justify-center rounded-md bg-white !px-3 !py-1 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-slate-200 sm:!mt-0 sm:w-auto"
                onClick={onCancel}
              >
                Vazgeç
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
