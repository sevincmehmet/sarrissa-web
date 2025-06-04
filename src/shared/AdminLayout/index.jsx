import React, { useState } from "react";
import {
  IconBinaryTree,
  IconFeather,
  IconLayoutDashboard,
  IconLogout,
  IconManualGearboxFilled,
  IconMenu2,
  IconSettings2,
  IconUsers,
  IconX,
  IconZoomInArea,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const activePath = location.pathname;
  const menuItems = [
    {
      id: "0",
      pathname: "/admin",
      label: "Siparişler",
      icon: <IconLayoutDashboard className="w-5 h-5 min-w-5 min-h-5s" />,
    },
    {
      id: "1",
      pathname: "/admin/customers",
      label: "Müşteriler",
      icon: <IconUsers className="w-5 h-5 min-w-5 min-h-5s" />,
    },
    {
      id: "2",
      pathname: "/admin/categories",
      label: "Katagoriler",
      icon: <IconBinaryTree className="w-5 h-5 min-w-5 min-h-5s" />,
    },
    {
      id: "3",
      pathname: "/admin/products",
      label: "Ürünler",
      icon: <IconZoomInArea className="w-5 h-5 min-w-5 min-h-5s" />,
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-xl border-r rounded-r-2xl border-slate-200 transition-all ease-in-out-all duration-300 ease-in-out 
        ${isOpen ? "w-64" : "w-20"} flex flex-col`}
      >
        {/* Toggle */}

        <div className="!pb-3 !pt-4 !px-4 border-slate-200 mt-auto flex items-center justify-between truncate">
          <span
            className={`${
              isOpen ? "block" : "hidden"
            } !px-3 flex items-center font-medium text-lg text-slate-700`}
          >
            <IconManualGearboxFilled className="w-5 h-5 min-w-5 min-h-5 !mr-3" />
            Yönetim
          </span>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-3 ${
              isOpen ? "" : "justify-center"
            } !px-3 !py-2 text-sm !rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:bg-orange-50 hover:text-orange-400`}
          >
            <div>
              {isOpen ? (
                <IconX className="w-5 h-5 min-w-5 min-h-5" />
              ) : (
                <IconMenu2 className="w-5 h-5 min-w-5 min-h-5" />
              )}
            </div>
          </button>
        </div>
        <div className="border-b border-slate-200 !mx-5"></div>
        {/* Menu */}
        <nav className="flex-1 !px-2 !py-4 space-y-2">
          {menuItems.map((item) => (
              <div key={item.id} className=" !mt-auto !px-2 truncate ">
                <button
                  onClick={() => {
                    navigate(item.pathname);
                  }}
                  className={`flex items-center gap-3  border  ${
                    isOpen ? "" : "justify-center"
                  } !px-3 !py-2 w-full text-sm !rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:bg-orange-50 hover:text-orange-400 ${
                    item.pathname === activePath
                      ? " border-orange-200 bg-orange-50 text-orange-400"
                      : "text-slate-500 border-transparent"
                  }`}
                >
                  {item.icon}

                  <span className={`${isOpen ? "block" : "hidden"}`}>
                    {item.label}
                  </span>
                </button>
              </div>
          ))}
        </nav>
        <div className="border-b border-slate-200 !mx-5"></div>

        {/* Logout */}
          <div className="!pt-4 !px-4 border-slate-200 mt-auto truncate">
            <button
              onClick={() => {
                navigate("/admin/settings");
              }}
              className={`flex items-center gap-3  border  ${
                isOpen ? "" : "justify-center"
              } !px-3 !py-2 w-full text-sm !rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:bg-orange-50 hover:text-orange-400 ${
                "/admin/settings" === activePath
                  ? " border-orange-200 bg-orange-50 text-orange-400"
                  : "text-slate-500 border-transparent"
              }`}
            >
              <IconSettings2 className="w-5 h-5 min-w-5 min-h-5" />

              <span className={`${isOpen ? "block" : "hidden"}`}>Ayarlar</span>
            </button>
          </div>

          <div className="!p-4 mt-auto truncate">
            <button
              className={`flex items-center gap-3 ${
                isOpen ? "" : "justify-center"
              } !px-3 !py-2 w-full text-sm text-red-400 cursor-pointer hover:bg-orange-50 hover:text-orange-400 !rounded-lg transition-all duration-300 ease-in-out`}
            >
              <IconLogout className="w-5 h-5 min-w-5 min-h-5" />

              <span className={`${isOpen ? "block" : "hidden"}`}>
                Çıkış Yap
              </span>
            </button>
          </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 bg-white !py-4 !px-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
