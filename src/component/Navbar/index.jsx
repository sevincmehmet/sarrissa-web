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
  IconShoppingCart,
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

  const totalPrice = cardItems.reduce((acc, item) => {
    const price = parseInt(item.trendyol_salePrice);
    return acc + item.quantity * price;
  }, 0);

  useEffect(() => {
    const stored = localStorage.getItem("cardItem");
    if (stored) {
      try {
        setCardItems(JSON.parse(stored));
        totalPrice = JSON.parse(stored).reduce((acc, item) => {
          const price = parseInt(item.trendyol_salePrice);
          return acc + item.quantity * price;
        }, 0);
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
                  sx: {
                    width: 440,
                    borderRadius: 4,
                    boxShadow: 6,
                    bgcolor: "background.paper",
                    p: 0,
                    display: "flex",
                    flexDirection: "column",
                    height: 480,
                  },
                }}
              >
                {/* Başlık - Sabit */}
                <div className="flex items-center justify-between gap-2 border-b border-gray-300 p-4 flex-shrink-0">
                  <div className="flex items-center">
                    <IconShoppingCart
                      size={28}
                      stroke={1.5}
                      className="text-green-600 mr-2"
                    />
                    <h3 className="text-xl font-semibold text-gray-900">
                      Sepetim ({totalItems})
                    </h3>
                  </div>
                  <span>
                    Toplam:
                    <span className="ml-2 text-green-700">{totalPrice} TL</span>
                  </span>
                </div>

                {/* Ürün Listesi - Scrollable */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
                  {totalItems > 0 ? (
                    cardItems.map((item) => (
                      <div
                        key={item.cardId}
                        onClick={() => navigate(`/product/${item.Product_id}`)}
                        className="flex items-start gap-5 p-5 rounded-2xl bg-white shadow transition hover:shadow-md group cursor-pointer"
                      >
                        <img
                          src={item.Image1}
                          alt={item.Name}
                          className="w-24 h-24 object-contain rounded-lg border border-gray-200 bg-gray-50"
                        />

                        <div className="flex flex-col flex-1 space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <p className="text-gray-900 font-semibold text-base line-clamp-1">
                                {item.Name}
                              </p>
                              <span className="text-sm text-gray-500">
                                {item.Brand}
                              </span>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(item.cardId);
                              }}
                              aria-label="Ürünü sil"
                              className="hidden group-hover:block p-2 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-100 transition"
                            >
                              <IconTrash size={20} stroke={2} />
                            </button>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-1.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuantityChange(item.cardId, false);
                                }}
                                className="text-gray-600 hover:text-red-500 transition"
                                aria-label="Azalt"
                              >
                                <IconMinus size={16} stroke={2} />
                              </button>

                              <span className="text-sm font-medium text-gray-800">
                                {item.quantity}
                              </span>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuantityChange(item.cardId, true);
                                }}
                                className="text-gray-600 hover:text-green-600 transition"
                                aria-label="Arttır"
                              >
                                <IconPlus size={16} stroke={2} />
                              </button>
                            </div>

                            <span className="text-lg font-semibold text-green-700">
                              {(
                                item.quantity *
                                parseInt(item.trendyol_salePrice)
                              ).toLocaleString("tr-TR")}{" "}
                              TL
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <IconShoppingCart
                        size={48}
                        stroke={1.5}
                        className="mb-4"
                      />
                      <p className="text-lg">
                        Sepetinizde ürün bulunmamaktadır.
                      </p>
                    </div>
                  )}
                </div>

                {/* Alt Kısım - Sabit */}
                <div className=" border-t border-gray-300 flex-shrink-0">
                  <div className="flex justify-between items-center p-4 ">
                    <button
                      onClick={resetCart}
                      className="text-sm text-red-600 hover:underline font-semibold transition"
                    >
                      Sepeti Temizle
                    </button>

                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold shadow-lg">
                      Siparişi Onayla
                    </button>
                  </div>
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
