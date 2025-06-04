import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconX } from "@tabler/icons-react";

const VariantModal = ({ onClose, onSave }) => {
  const [variantName, setVariantName] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    console.log({options});
    
  }, [options])
  const formik = useFormik({
    initialValues: {
      value: "",
      stock: "",
      price: "",
      barcode: "",
      image: null,
    },
    validationSchema: Yup.object({
      value: Yup.string().required(),
      stock: Yup.number().typeError("").required(),
      price: Yup.number().typeError("").required(),
      barcode: Yup.string().required(),
      image: Yup.mixed().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      setOptions((prev) => [
        ...prev,
        {
          value: values.value.trim(),
          stock: parseInt(values.stock, 10),
          price: parseFloat(values.price),
          barcode: values.barcode.trim(),
          image: URL.createObjectURL(values.image),
        },
      ]);
      
      resetForm();
    },
  });

  const handleSave = () => {
    if (variantName && options.length > 0) {
      onSave({ name: variantName, options });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-6 relative animate-fadeIn space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-xl font-semibold text-gray-800">Varyant Ekle</h2>
          <button onClick={onClose}>
            <IconX className="w-5 h-5 text-gray-500 hover:text-red-500 transition" />
          </button>
        </div>

        {/* Varyant Adı */}
        <div className="space-y-1">
          <label className="text-sm text-gray-600 font-medium">Varyant Adı</label>
          <input
            type="text"
            value={variantName}
            onChange={(e) => setVariantName(e.target.value)}
            placeholder="Örn: Renk"
            className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-4">
              <label className="text-sm text-gray-600">Alt Özellik</label>
              <input
                type="text"
                name="value"
                value={formik.values.value}
                onChange={formik.handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  formik.errors.value && formik.touched.value
                    ? "border-yellow-500"
                    : "border-gray-200"
                } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400`}
                placeholder="Kırmızı"
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm text-gray-600">Stok</label>
              <input
                type="number"
                name="stock"
                min="0"
                value={formik.values.stock}
                onChange={formik.handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  formik.errors.stock && formik.touched.stock
                    ? "border-yellow-500"
                    : "border-gray-200"
                } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400`}
                placeholder="10"
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm text-gray-600">Fiyat (₺)</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={formik.values.price}
                onChange={formik.handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  formik.errors.price && formik.touched.price
                    ? "border-yellow-500"
                    : "border-gray-200"
                } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400`}
                placeholder="99.99"
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm text-gray-600">Barkod</label>
              <input
                type="text"
                name="barcode"
                value={formik.values.barcode}
                onChange={formik.handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  formik.errors.barcode && formik.touched.barcode
                    ? "border-yellow-500"
                    : "border-gray-200"
                } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400`}
                placeholder="1234567890"
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm text-gray-600">Resim</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  formik.setFieldValue("image", e.target.files?.[0] || null);
                }}
                className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 ${
                  formik.errors.image && formik.touched.image
                    ? "border border-yellow-500"
                    : ""
                }`}
              />
            </div>
            <div className="col-span-4">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                Ekle
              </button>
            </div>
          </div>
        </form>

        {/* Eklenen Alt Özellikler */}
        {options.length > 0 && (
          <div className="space-y-2 max-h-52 overflow-y-auto border-t border-slate-200 pt-4">
            {options.map((opt, i) => (
              <div
                key={i}
                className="flex items-center justify-between border border-orange-100 bg-orange-50 rounded-md px-4 py-2 text-sm text-orange-600"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{opt.value}</span>
                  <span>Stok: {opt.stock} / Fiyat: ₺{opt.price.toFixed(2)}</span>
                  <span>Barkod: {opt.barcode}</span>
                </div>
                {opt.image && (
                  <img
                    src={opt.image}
                    alt={opt.value}
                    className="w-12 h-12 object-cover rounded shadow ml-4"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariantModal;
