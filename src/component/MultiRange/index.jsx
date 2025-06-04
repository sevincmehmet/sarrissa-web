import { useState } from "react";

export default function Index({ min, max }) {
  const [range, setRange] = useState([min, max]);

  // Değer değişirken limitleri kontrol et
  function handleMinChange(e) {
    const value = Math.min(Number(e.target.value), range[1] - 1);
    setRange([value, range[1]]);
  }

  function handleMaxChange(e) {
    const value = Math.max(Number(e.target.value), range[0] + 1);
    setRange([range[0], value]);
  }

  // Yüzdeyi hesapla (renklendirme için)
  const minPercent = ((range[0] - min) / (max - min)) * 100;
  const maxPercent = ((range[1] - min) / (max - min)) * 100;

  return (
    <div className="relative w-full h-10 flex items-center">
      {/* İki range üst üste */}
      <input
        type="range"
        min={min}
        max={max}
        value={range[0]}
        onChange={handleMinChange}
        className="absolute pointer-events-auto w-full h-2 appearance-none bg-transparent"
        style={{ zIndex: 3 }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={range[1]}
        onChange={handleMaxChange}
        className="absolute pointer-events-auto w-full h-2 appearance-none bg-transparent"
        style={{ zIndex: 4 }}
      />

      {/* Track - tam uzunluk gri */}
      <div
        className="absolute w-full h-2 bg-gray-300 rounded"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      ></div>

      {/* Aralık - seçili bölüm */}
      <div
        className="absolute h-2 bg-blue-500 rounded"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          left: `${minPercent}%`,
          width: `${maxPercent - minPercent}%`,
          zIndex: 2,
        }}
      />
    </div>
  );
}
