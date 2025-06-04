import { IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Index = ({ imagesData = [], handleImages }) => {
  const [images, setImages] = useState(imagesData);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    Promise.all(
      fileArray.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({ name: file.name, base64: reader.result });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    ).then((newImages) => {
      const combined = [...images, ...newImages];
      setImages(combined.slice(0, 5));
      handleImages(combined.slice(0, 5));
    });
  };

  const handleRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    handleImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 space-y-6 border rounded-lg border-slate-200 my-3">
      {/* Dosya Seçme Butonu */}
      <label
        onClick={() => {
          if (images.length >= 5) {
            toast.error("en fazla 5 adet resim eklenebilir.");
          }
        }}
        className={`inline-block transition bg-blue-500 text-white font-medium !px-4 !py-1.5 rounded-xl border border-blue-200  duration-300 
        ${
          images.length === 5
            ? "opacity-30 cursor-not-allowed"
            : "cursor-pointer hover:bg-blue-600"
        }`}
      >
        Resim Seç (max 5)
        <input
          disabled={images.length === 5}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* Görsel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative bg-gray-100 rounded shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Sil Butonu */}
            <button
              onClick={() => handleRemove(idx)}
              className="absolute top-1 right-1 bg-red-500/70 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-red-600 z-10"
              title="Sil"
            >
              <IconX size={"1rem"} />
            </button>

            {/* Resim Gösterimi */}
            <div
              className="aspect-[4/3] bg-white flex items-center justify-center cursor-pointer"
              onClick={() => setPreview(img.base64)}
            >
              <img
                src={img.base64}
                alt={`img-${idx}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Dosya Adı */}
            <p
              className="text-xs text-center px-2 py-1 truncate"
              title={img.name}
            >
              {img.name}
            </p>
          </div>
        ))}
      </div>

      {/* Modal Önizleme */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/70 bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreview(null)}
        >
          <div
            className="max-w-4xl max-h-[90vh] p-4 bg-white rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-[80vh] mx-auto object-contain"
            />
            <button
              onClick={() => setPreview(null)}
              className="block mt-4 mx-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
