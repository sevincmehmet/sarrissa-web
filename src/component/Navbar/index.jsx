import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import AppLogo from "../../assets/AppLogo.png";
import {
  IconUser,
  IconShoppingBag,
  IconTrash,
  IconPlus,
  IconMinus,
  IconMenu2,
} from "@tabler/icons-react";

import { useCardData } from "../../context/CartContext";
import { CategoryData, CategoryData as data } from "../../Data";
import CategoryMenu from "../../component/CategoryMenu";

const Navbar = ({ showFixedNav }) => {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const { cardItems, setCardItems } = useCardData();
  const [CateData, setCateData] = useState(CategoryData);

  const [anchorUser, setAnchorUser] = useState(null);
  const [anchorCart, setAnchorCart] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cardItem");
    if (stored) {
      try {
        setCardItems(JSON.parse(stored));
      } catch (err) {
        console.error("JSON parse hatası:", err);
      }
    }
  }, []);

  const handleQuantityChange = (id, increase = true) => {
    const updated = cardItems.map((item) =>
      item.cardId === id
        ? {
            ...item,
            quantity: Math.max(1, item.quantity + (increase ? 1 : -1)),
          }
        : item
    );
    setCardItems(updated);
    localStorage.setItem("cardItem", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const updated = cardItems.filter((item) => item.cardId !== id);
    setCardItems(updated);
    localStorage.setItem("cardItem", JSON.stringify(updated));
  };

  const resetCart = () => {
    setCardItems([]);
    localStorage.setItem("cardItem", JSON.stringify([]));
  };

  const totalItems = cardItems.length;

  return (
    <header
      className={`w-full border-b transition-all duration-200 ${
        showFixedNav || path !== "/"
          ? "shadow-md  border-transparent"
          : " border-transparent"
      }`}
    >
      <div className=" bg-white/70 ">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            <img className="w-[11rem]" src={AppLogo} alt="" />
          </Link>
          <div className="flex items-center gap-4">
            {/* Kullanıcı Popover */}
            <div>
              <button
                onClick={(e) => setAnchorUser(e.currentTarget)}
                className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                <IconUser className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Giriş Yap
                </span>
              </button>
              <Popover
                open={Boolean(anchorUser)}
                anchorEl={anchorUser}
                onClose={() => setAnchorUser(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <div className="p-4 flex flex-col gap-2 w-48">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setAnchorUser(null);
                    }}
                    className="bg-rose-500 text-white rounded-md py-2 hover:bg-rose-600 transition"
                  >
                    Giriş Yap
                  </button>
                  <button
                    onClick={() => {
                      navigate("/register");
                      setAnchorUser(null);
                    }}
                    className="bg-gray-200 rounded-md py-2 hover:bg-gray-300 transition"
                  >
                    Üye Ol
                  </button>
                </div>
              </Popover>
            </div>

            {/* Sepet Popover */}
            <div>
              <button
                onClick={(e) => setAnchorCart(e.currentTarget)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition relative cursor-pointer "
              >
                <IconShoppingBag className="text-gray-600" />
                <span className="text-sm text-gray-700">Sepetim</span>
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-3 w-6 h-6 flex items-center justify-center bg-rose-500 rounded-full text-white ">
                    {totalItems}
                  </div>
                )}
              </button>
              <Popover
                open={Boolean(anchorCart)}
                anchorEl={anchorCart}
                onClose={() => setAnchorCart(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                PaperProps={{
                  sx: { width: 400, borderRadius: 2, boxShadow: 3 },
                }}
              >
                <div className="p-4">
                  {totalItems > 0 ? (
                    <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
                      <div className="font-semibold text-lg mb-2">
                        Sepetim ({totalItems})
                      </div>
                      {cardItems.map((item) => (
                        <div
                          key={item.cardId}
                          className="flex justify-between items-start gap-2 bg-gray-50 p-3 rounded-lg shadow-sm"
                        >
                          <img
                            src={item.Image1}
                            alt=""
                            className="h-16 object-contain"
                          />
                          <div className="flex flex-col gap-1 flex-1">
                            <div className="text-sm font-medium">
                              {item.Brand}{" "}
                              <span className="font-normal">{item.Name}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-full border">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(item.cardId, false)
                                  }
                                >
                                  <IconMinus size={14} />
                                </button>
                                <span className="text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleQuantityChange(item.cardId, true)
                                  }
                                >
                                  <IconPlus size={14} />
                                </button>
                              </div>
                              <span className="text-sm text-rose-500 font-semibold">
                                {item.quantity *
                                  parseInt(item.trendyol_salePrice)}{" "}
                                TL
                              </span>
                            </div>
                          </div>
                          <button onClick={() => handleDelete(item.cardId)}>
                            <IconTrash className="text-rose-500 hover:text-rose-600 transition" />
                          </button>
                        </div>
                      ))}
                      <div className="flex justify-between pt-4 border-t">
                        <button
                          onClick={resetCart}
                          className="text-sm text-rose-500 hover:underline"
                        >
                          Sepeti Temizle
                        </button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm">
                          Onayla
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-600">
                      Sepetinizde ürün bulunmamaktadır.
                    </div>
                  )}
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      {/* Kategori Menüsü */}

      {/* Sol sabit kategori menüsü */}
      {/* Sol sabit kategori menüsü */}
      <div
        className={` transition-all duration-200 group ${
          showFixedNav || path !== "/"
            ? "bg-slate-50/70"
            : "hover:bg-slate-50/70"
        }`}
      >
        <div
          className="relative max-w-7xl mx-auto"
          onMouseLeave={() => setShowDropdown(false)}
        >
          {/* Tetikleyici buton ve kısa kategoriler */}
          <div className="flex items-center gap-3 z-50">
            {/* Tüm Kategoriler Butonu */}
            <div
              onMouseEnter={(e) => {
                e.stopPropagation(); // Alt divin eventinin yukarı yayılmasını engelliyoruz

                setShowDropdown(true);
                setCateData(CategoryData);
              }}
              className={`transition-all duration-200 ${
                showFixedNav || path !== "/"
                  ? "text-slate-600"
                  : "text-slate-300 "
              } px-4 py-2 flex items-center gap-2 cursor-pointer group-hover:text-slate-600 hover:scale-110 hover:text-slate-800`}
            >
              <IconMenu2 size={18} />
              <span className="text-sm font-medium uppercase">
                Tüm Kategoriler
              </span>
            </div>

            {/* İlk 5 kategori */}
            {CategoryData.slice(0, 5).map((oItem) => (
              <div
                key={oItem.id}
                onMouseEnter={(e) => {
                  e.stopPropagation(); // Alt divin eventinin yukarı yayılmasını engelliyoruz

                  setShowDropdown(true);
                  setCateData([
                    CategoryData.find((findItem) => findItem.id === oItem.id),
                  ]);
                }}
                className={`transition-all duration-200 ${
                  showFixedNav || path !== "/"
                    ? "text-slate-600"
                    : "text-slate-300 "
                } px-4 py-2 flex items-center gap-2 cursor-pointer group-hover:text-slate-600 hover:scale-110 hover:text-slate-800`}
              >
                <span className="text-sm font-medium uppercase">
                  {oItem.name}
                </span>
              </div>
            ))}
          </div>

          {/* Dropdown içeriği */}
          {showDropdown && (
            <div className="absolute top-[2.3rem] left-0 right-0 bg-white/70 shadow-md z-50 rounded-b-xl">
              <ul className="divide-y divide-gray-100 z-40">
                <CategoryMenu data={CateData} showFixedNav={showFixedNav} />
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
