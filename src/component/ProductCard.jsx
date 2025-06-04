import { useState } from "react";
import { IconCubePlus, IconStack, IconStopwatch } from "@tabler/icons-react";

const ProductCard = ({ item, onClick }) => {
  const [hoveredImage, setHoveredImage] = useState(null);

  const isOutOfStock = item.Stock === "0";

  const gallery = [
    item.Image1,
    item.Image2,
    item.Image3,
    item.Image4,
    item.Image5,
  ].filter(Boolean);

  return (
    <div
      onClick={() => {
        if (!isOutOfStock) onClick(item.Product_id);
      }}
      style={{
        backgroundColor: "#fff",
        borderRadius: "1rem",
        boxShadow:
          "0 6px 12px -2px rgba(50,50,93,.125), 0 3px 7px -3px rgba(0,0,0,.15)",
      }}
      className={`border group ${
        isOutOfStock
          ? "border-transparent cursor-not-allowed"
          : "border-gray-200 cursor-pointer"
      } rounded-lg px-4 pt-8 pb-4 duration-300 relative flex flex-col justify-between`}
    >
      {/* Ürün görseli */}
      <div className="relative">
        <img
          src={hoveredImage || item.Image1}
          alt={item.Name}
          className={`h-[10rem] mx-auto ${
            isOutOfStock ? "opacity-50" : ""
          } transition-opacity duration-300`}
        />

        {/* Tükendi etiketi */}
        {isOutOfStock && (
          <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 bg-rose-400/10 border-2 border-rose-500/40 font-extrabold z-10 rounded-lg flex items-center justify-center -rotate-45 py-3">
            <div
              style={{
                fontFamily: "monospace",
                fontWeight: 800,
                fontSize: "1.3rem",
              }}
              className="text-rose-600 text-base font-extrabold tracking-wider"
            >
              TÜKENDİ
            </div>
          </div>
        )}

        {/* Hover alanları */}
        <div
          className="absolute top-0 left-0 right-0 z-20 w-full h-full grid"
          style={{
            gridTemplateColumns: `repeat(${gallery.length}, 1fr)`,
          }}
        >
          {gallery.map((_, gIndex) => (
            <div
              key={gIndex}
              className="h-full w-full"
              onMouseEnter={() =>
                !isOutOfStock && setHoveredImage(gallery[gIndex])
              }
              onMouseLeave={() => !isOutOfStock && setHoveredImage(null)}
            />
          ))}
        </div>

        {/* Noktalar */}
        <div
          className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 z-30 opacity-0 ${
            !isOutOfStock ? "group-hover:opacity-100" : ""
          } `}
        >
          {gallery.map((img, idx) => {
            const isActive =
              hoveredImage === img || (!hoveredImage && idx === 0);
            return (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive ? "bg-rose-400/70 scale-110" : "bg-gray-300/60"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Marka, isim, fiyat */}
      <div className="mt-4 text-sm font-semibold text-slate-600/50">
        {item.Brand}
      </div>
      <div className="mt-2 text-sm font-semibold">{item.Name}</div>
      <div className="text-rose-500 font-bold text-lg text-end">
        {item.trendyol_salePrice} TL
      </div>

      {/* Etiketler */}
      <div className="absolute top-2 left-7 z-20">
        {item.id >= 15 && item.id <= 25 && (
          <div className="relative flex items-center justify-start text-xs mb-1 rounded-lg text-blue-400 font-semibold">
            <div className="absolute -left-5 bg-white/90 text-blue-500 shadow-blue-300 shadow flex items-center justify-center rounded-full">
              <IconCubePlus className="p-1" />
            </div>
            <span className="bg-white/80 shadow shadow-blue-200 font-semibold py-1 rounded-md px-2">
              Yeni Ürün
            </span>
          </div>
        )}

        {!isOutOfStock && (
          <div
            className={`relative flex items-center justify-start text-xs ${
              item.Stock > 10
                ? "shadow shadow-green-200 rounded-lg text-green-400 font-semibold"
                : "shadow shadow-rose-200 rounded-lg text-rose-400 font-semibold"
            }`}
          >
            <div
              className={`absolute -left-5 bg-white/90 shadow flex items-center justify-center rounded-full ${
                item.Stock > 10
                  ? "text-green-500 shadow-green-300"
                  : "text-rose-500 shadow-rose-300"
              }`}
            >
              {item.Stock > 10 ? <IconStack /> : <IconStopwatch />}
            </div>
            <span className="bg-white/80 shadow font-semibold py-1 rounded-md px-2">
              {item.Stock > 10 ? "Stokta var" : "Ürün tükeniyor"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
