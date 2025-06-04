import { useState } from "react";

const Index = ({ children, text, position = "right", className = "" }) => {
  const [visible, setVisible] = useState(false);

  const positionClass = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
  }[position];

  const arrowClass = {
    top: "bottom-[-5px] left-1/2 -translate-x-1/2 border-t-gray-800",
    right: "left-[-5px] top-1/2 -translate-y-1/2 border-r-gray-800",
    bottom: "top-[-5px] left-1/2 -translate-x-1/2 border-b-gray-800",
    left: "right-[-5px] top-1/2 -translate-y-1/2 border-l-gray-800",
  }[position];

  return (
    <div
      className="relative w-full inline-block"
      onMouseEnter={() => text.trim() && setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <div
        className={`absolute w-auto max-w-[12rem] z-50 text-sm font-medium text-white bg-gray-400 !p-4 rounded-lg shadow-lg !px-3 !py-2 transition-all duration-200 transform
          ${positionClass}
          ${
            visible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
          ${className}
        `}
      >
        {text}
        <div
          className={`absolute w-2 h-2 bg-gray-400 rotate-45 ${arrowClass}`}
        />
      </div>
    </div>
  );
};
export default Index;
