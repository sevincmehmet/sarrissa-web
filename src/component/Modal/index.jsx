import { IconX } from "@tabler/icons-react";
import React, { useEffect } from "react";

const Index = ({ isOpen, title, children, onCancel }) => {
  
  if (!isOpen) return null; // Modal sadece açık olduğunda render edilir.

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && onCancel) {
        onCancel(); // Escape tuşuna basıldığında modal kapanır.
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

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
          <div className="border z-40 border-slate-200 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:!my-8 sm:w-full sm:max-w-lg">
            <header className="!px-5 !py-3 flex items-center justify-between bg-orange-50">
              <span className="font-medium text-lg text-orange-300">{title}</span>
              <button onClick={onCancel} 
              className="rounded-full hover:bg-orange-100 !p-1.5 text-orange-400 hover:text-orange-500 cursor-pointer"

              >
                <IconX size={"1.25rem"} stroke={2} />
              </button>
            </header>
            <main className="!py-3 !px-5">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
