import React, { useState } from "react";
import VariantModal from "./VariantModal";

const Index = ({ onVariantsChange }) => {
  const [variants, setVariants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddVariant = (newVariant) => {
    const updated = [...variants, newVariant];
    setVariants(updated);
    onVariantsChange?.(updated); // opsiyonel callback
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Varyantlar</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className=" bg-blue-500 text-white font-medium !px-4 !py-1.5 rounded-xl border border-blue-200 hover:bg-blue-600 duration-300 cursor-pointer"
        >
          + Varyant Ekle
        </button>
      </div>

      {variants.length === 0 ? (
        <p className="text-gray-500">Henüz varyant eklenmedi.</p>
      ) : (
        <div className="space-y-4">
          {variants.map((variant, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                {variant.name}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {variant.options.map((opt, i) => (
                  <div
                    key={i}
                    className="border border-orange-100 bg-orange-50 rounded-md p-3 flex items-start gap-3"
                  >
                    {opt.image && (
                      <img
                        src={opt.image}
                        alt={opt.value}
                        className="w-14 h-14 object-cover rounded-md shadow-sm"
                      />
                    )}
                    <div className="text-sm text-orange-700 space-y-1">
                      <p className="font-medium">{opt.value}</p>
                      <p>Stok: {opt.stock}</p>
                      <p>Fiyat: ₺{opt.price.toFixed(2)}</p>
                      <p>Barkod: {opt.barcode}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <VariantModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddVariant}
        />
      )}
    </div>
  );
};

export default Index;
