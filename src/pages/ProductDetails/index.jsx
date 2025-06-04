import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IconChevronRight, IconHome } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import { useCardData } from "../../context/CartContext";
import { ProductsData } from "../../Data";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const { id } = useParams();
  const product = ProductsData.find((item) => item.Product_id === id);

  const { cardItems, setCardItems } = useCardData();
  const [selectedImage, setSelectedImage] = useState(product?.Image1 || "");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: geri, 1: ileri

  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.variant?.[0] || null
  );
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="text-center mt-20 text-gray-600 font-semibold">
        Ürün bulunamadı.
      </div>
    );
  }

  const handleSelectImage = (newIndex) => {
    const dir = newIndex > selectedIndex ? 1 : -1;
    setDirection(dir);
    setSelectedIndex(newIndex);
  };

  const gallery = [
    product?.Image1,
    product?.Image2,
    product?.Image3,
    product?.Image4,
    product?.Image5,
  ].filter(Boolean);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    setIsAnimating(true);

    try {
      const itemToAdd = {
        ...product,
        cardId: uuidv4(),
        quantity: 1,
      };
      const storedCart = localStorage.getItem("cardItem");
      const existingCart = storedCart ? JSON.parse(storedCart) : [];
      const updatedCart = [...existingCart, itemToAdd];
      localStorage.setItem("cardItem", JSON.stringify(updatedCart));
      setCardItems(updatedCart);
      setTimeout(() => setIsAnimating(false), 500);
    } catch (error) {
      console.error("Sepete eklenirken hata oluştu:", error);
      localStorage.removeItem("cardItem");
      setTimeout(() => setIsAnimating(false), 500);
    }

    console.log("🧡 Sepete eklendi!");
  };

  const handleBuyNow = () => {
    console.log("🧡 Şimdi satın al!");
  };

  return (
    <motion.div
      className="mt-5 px-4 max-w-7xl mx-auto"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
        <IconHome className="text-rose-500 mr-1" size="1.2rem" />
        <span className="flex items-center gap-1">
          <span className="hover:underline hover:text-rose-600 cursor-pointer transition">
            {product?.mainCategory}
          </span>
          <IconChevronRight className="text-rose-400" size="1rem" />
        </span>
        <span className="flex items-center gap-1">
          <span className="hover:underline hover:text-rose-600 cursor-pointer transition">
            {product?.category}
          </span>
          <IconChevronRight className="text-rose-400" size="1rem" />
        </span>
        <span className="text-gray-700 font-medium">
          {product?.subCategory}
        </span>
      </p>

      {/* Ürün Detayları */}
      <div className="py-7 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Galeri */}

        <div>
          <div className="rounded-xl overflow-hidden aspect-square mb-4 shadow-lg shadow-slate-100 border border-slate-200">
            <AnimatePresence mode="wait">
              <AnimatePresence mode="wait">
                <motion.img
                  key={gallery[selectedIndex]}
                  src={gallery[selectedIndex]}
                  alt={product?.Name}
                  initial={{ x: direction * 100 }}
                  animate={{ x: 0 }}
                  exit={{ opacity: 0, x: direction * -100 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3">
            {gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onMouseEnter={() => handleSelectImage(index)}
                className={`w-16 h-16 object-contain border rounded-lg cursor-pointer transition duration-200 ${
                  gallery[selectedIndex] === img
                    ? "border-rose-500 ring-2 ring-rose-400"
                    : "shadow-lg shadow-slate-100 border border-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Sağ Panel */}
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {product?.Name}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Marka: <span className="font-medium">{product?.Brand}</span>
            </p>
          </div>

          {/* Varyantlar */}
          {product?.variants?.variant?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.variants.variant.map((variant) => (
                <button
                  key={variant.variantId}
                  onClick={() => handleVariantSelect(variant)}
                  className={`px-4 py-2 rounded-full shadow-sm border text-sm font-medium transition ${
                    selectedVariant?.variantId === variant.variantId
                      ? "bg-rose-500 text-white border-rose-600 shadow"
                      : "bg-white text-gray-700 border-gray-300 hover:border-rose-400"
                  }`}
                >
                  {variant.spec?._}
                </button>
              ))}
            </div>
          )}

          {/* Fiyat & Stok */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-rose-600">
              {Number(
                selectedVariant?.price || product?.trendyol_salePrice || 0
              ).toFixed(2)}{" "}
              {product?.CurrencyType || "₺"}
            </span>
            {selectedVariant?.quantity && (
              <span className="text-sm text-gray-600">
                Stok: {selectedVariant.quantity} adet
              </span>
            )}
          </div>

          {/* Butonlar */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-white text-rose-600 border border-rose-400 hover:bg-rose-50 font-semibold py-3 rounded-lg shadow-sm transition"
            >
              Şimdi Al
            </button>

            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
              animate={isAnimating ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-lg shadow transition"
            >
              Sepete Ekle
            </motion.button>
          </div>

          {/* Ek Bilgiler */}
          <div className="mt-6 space-y-4 text-sm text-gray-700">
            <div className="shadow border border-slate-200 px-5 py-3 rounded-lg">
              <h3 className="font-semibold mb-1">Kargo & Teslimat</h3>
              <p>🚚 Ücretsiz kargo</p>
              <p>
                📦 Tahmini Teslimat:{" "}
                <span className="font-medium">
                  {new Date(Date.now() + 3 * 86400000).toLocaleDateString(
                    "tr-TR",
                    { weekday: "long", day: "numeric", month: "long" }
                  )}
                </span>
              </p>
            </div>

            <div className="shadow border border-slate-200 px-5 py-3 rounded-lg">
              <h3 className="font-semibold mb-1">Ürün Özellikleri</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>%100 orijinal ürün</li>
                <li>2 yıl distribütör garantisi</li>
                <li>14 gün iade hakkı</li>
                <li>Trendyol güvencesi</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 shadow border border-slate-200 px-5 py-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-green-600">🛡️</span>
                <span>Güvenli ödeme altyapısı</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-rose-500">📦</span>
                <span>Hızlı kargo gönderimi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🔄</span>
                <span>Kolay iade ve değişim</span>
              </div>
            </div>

            {selectedVariant?.quantity < 20 && (
              <div className="text-red-600 font-semibold shadow border border-slate-200 px-5 py-3 rounded-lg">
                ⚠️ Son {selectedVariant.quantity} ürün kaldı!
              </div>
            )}
          </div>
        </div>

        {/* Açıklama */}
        <div className="md:col-span-2 mt-10">
          <div className="bg-white shadow border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Ürün Açıklaması
            </h2>
            <div
              className="text-sm text-gray-700 leading-relaxed space-y-2"
              dangerouslySetInnerHTML={{
                __html:
                  product?.Description || "<p>Açıklama bulunmamaktadır.</p>",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Index;
