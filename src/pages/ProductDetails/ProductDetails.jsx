import {
  IconChevronRight,
  IconHome,
  IconHome2,
  IconHomeFilled,
} from "@tabler/icons-react";
import React, { useState } from "react";

export default function ProductDetail({
  product 
}) {
  const [selectedImage, setSelectedImage] = useState(product.Image1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.variant[0]
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const gallery = [
    product.Image1,
    product.Image2,
    product.Image3,
    product.Image4,
    product.Image5,
  ].filter(Boolean);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    // Basit bir animasyon başlat
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    console.log("🧡 Sepete eklendi!");
  };

  const handleBuyNow = () => {
    console.log("🧡 Şimdi satın al!");
  };

  return (
    <>
      <div className=" mt-5 px-4 max-w-7xl mx-auto">
        <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
          <IconHome className="text-orange-500 mr-1" size="1.2rem" />

          <span className="flex items-center gap-1">
            <span className="hover:underline hover:text-orange-600 cursor-pointer transition">
              {product.mainCategory}
            </span>
            <IconChevronRight className="text-orange-400" size="1rem" />
          </span>

          <span className="flex items-center gap-1">
            <span className="hover:underline hover:text-orange-600 cursor-pointer transition">
              {product.category}
            </span>
            <IconChevronRight className="text-orange-400" size="1rem" />
          </span>

          <span className="text-gray-700 font-medium">
            {product.subCategory}
          </span>
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-7 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* SOL - Galeri */}
        <div>
          <div className=" rounded-xl overflow-hidden aspect-square mb-4 shadow-lg shadow-slate-100 border border-slate-200">
            <img
              src={selectedImage}
              alt={product.Name}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex justify-center gap-3">
            {gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumb"
                onMouseEnter={() => setSelectedImage(img)}
                className={`w-16 h-16 object-contain border rounded-lg cursor-pointer transition duration-200 ${
                  selectedImage === img
                    ? "border-orange-500 ring-2 ring-orange-400"
                    : "shadow-lg shadow-slate-100 border border-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* SAĞ - Ürün Bilgisi */}
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.Name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Marka: <span className="font-medium">{product.Brand}</span>
            </p>
          </div>

          {/* Varyant Butonları */}
          <div className="flex flex-wrap gap-2">
            {product.variants.variant.map((variant) => (
              <button
                key={variant.variantId}
                onClick={() => handleVariantSelect(variant)}
                className={`px-4 py-2 rounded-full shadow-sm shadow-slate-100 border border-slate-200 cursor-pointer text-sm transition font-medium ${
                  selectedVariant.variantId === variant.variantId
                    ? "bg-orange-500 text-white border-orange-600 shadow"
                    : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"
                }`}
              >
                {variant.spec._}
              </button>
            ))}
          </div>

          {/* Fiyat & Stok */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-orange-600">
              {Number(
                selectedVariant.price || product.trendyol_salePrice
              ).toFixed(2)}{" "}
              {product.CurrencyType}
            </span>
            <span className="text-sm text-gray-600">
              Stok: {selectedVariant.quantity} adet
            </span>
          </div>

          {/* Butonlar */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleBuyNow}
              className="flex-1 cursor-pointer bg-white text-orange-600 border border-orange-400 hover:bg-orange-50 font-semibold py-3 rounded-lg shadow-sm transition"
            >
              Şimdi Al
            </button>
            <button
              onClick={handleAddToCart}
              className={`flex-1 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow transition transform ${
                isAnimating ? "scale-105 ring-4 ring-orange-300/50" : ""
              }`}
            >
              Sepete Ekle
            </button>
          </div>
          {/* Bilgilendirme Bloğu */}
          <div className="mt-6 space-y-4 text-sm text-gray-700">
            {/* Kargo ve Teslimat */}
            <div className="shadow-lg shadow-slate-100 border border-slate-200 px-5 py-3 rounded-lg">
              <h3 className="text-gray-800 font-semibold mb-1">
                Kargo & Teslimat
              </h3>
              <p>🚚 Ücretsiz kargo</p>
              <p>
                📦 Tahmini Teslimat:{" "}
                <span className="font-medium">
                  {new Date(Date.now() + 3 * 86400000).toLocaleDateString(
                    "tr-TR",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    }
                  )}
                </span>
              </p>
            </div>

            {/* Ürün Özellikleri */}
            <div className="shadow-lg shadow-slate-100 border border-slate-200 px-5 py-3 rounded-lg">
              <h3 className="text-gray-800 font-semibold mb-1">
                Ürün Özellikleri
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>%100 orijinal ürün</li>
                <li>2 yıl distribütör garantisi</li>
                <li>14 gün iade hakkı</li>
                <li>Trendyol güvencesi</li>
              </ul>
            </div>

            {/* Güven Simgeleri */}
            <div className="flex flex-col gap-2 shadow-lg shadow-slate-100 border border-slate-200 px-5 py-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-green-600">🛡️</span>
                <span>Güvenli ödeme altyapısı</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500">📦</span>
                <span>Hızlı kargo gönderimi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🔄</span>
                <span>Kolay iade ve değişim</span>
              </div>
            </div>

            {/* Düşük Stok Uyarısı */}
            {selectedVariant.quantity < 20 && (
              <div className="text-red-600 font-semibold shadow-lg shadow-slate-100 border border-slate-200 px-5 py-3 rounded-lg">
                ⚠️ Son {selectedVariant.quantity} ürün kaldı!
              </div>
            )}
          </div>
        </div>

        {/* ALTTA - Ürün Açıklaması */}
        <div className="md:col-span-2 mt-10">
          <div className="bg-white shadow-lg shadow-slate-100 border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Ürün Açıklaması
            </h2>
            <div
              className="text-sm text-gray-700 leading-relaxed space-y-2"
              dangerouslySetInnerHTML={{ __html: product.Description }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
