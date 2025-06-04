import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconChevronRight, IconHome } from "@tabler/icons-react";
import { CategoryData, ProductsData } from "../../Data";
import SectionTitle from "../../component/SectionTitle";
import ProductGrid from "../../component/ProductGrid";
import { motion } from "framer-motion";
import { Slider, styled } from "@mui/material";

const RoseSlider = styled(Slider)({
  color: "#f43f5e", // Tailwind rose-500
  height: 4,
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#f43f5e",
    border: "2px solid white",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(244, 63, 94, 0.16)", // rose-500 hover
    },
    "&.Mui-focusVisible": {
      boxShadow: "0 0 0 8px rgba(244, 63, 94, 0.16)",
    },
  },
  "& .MuiSlider-rail": {
    color: "#fecdd3", // Tailwind rose-200
  },
  "& .MuiSlider-track": {
    color: "#f43f5e", // Tailwind rose-500
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: "#aaa",
  },
});

const Index = () => {
  const navigate = useNavigate();
  const cateIdArray = useLocation().pathname.split("/")[2].split(".");

  const mainCategory = CategoryData.find(
    (x) => x.id === parseInt(cateIdArray[0])
  );
  const subCategory = mainCategory?.categories?.find(
    (x) => x.id === parseInt(cateIdArray[1])
  );
  const thirdCategory = subCategory?.categories?.find(
    (x) => x.id === parseInt(cateIdArray[2])
  );

  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(ProductsData);
  const [scrolled, setScrolled] = useState(false);

  const brandList = Array.from(
    new Set(ProductsData.map((d) => d.Brand))
  ).filter(Boolean);

  const numericPrices = ProductsData.map((p) =>
    parseFloat(p.trendyol_salePrice)
  ).filter((p) => !isNaN(p));
  const minPriceInData = Math.min(...numericPrices);
  const maxPriceInData = Math.max(...numericPrices);

  const [priceRange, setPriceRange] = useState([
    minPriceInData,
    maxPriceInData,
  ]);

  const navigateDetails = (id) => navigate(`/product/${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateActiveFilters = (label, value, key, rawValue) => {
    setActiveFilters((prev) => {
      const filtered = prev.filter((f) => f.key !== key);
      return [...filtered, { label, key, value: rawValue }];
    });
  };

  const handleSubCategorySelect = (cat) => {
    setSelectedSubCategory(cat.id);
    updateActiveFilters("Alt Kategori", cat.name, "subCategory", cat.id);
  };

  const toggleBrand = (brand) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updated);
    updateActiveFilters("Marka", brand, "brand", updated);
  };

  const handlePriceSliderChange = (event, newValue) => {
    setPriceRange(newValue);
    updateActiveFilters(
      "₺ Fiyat",
      `₺${newValue[0]} - ₺${newValue[1]}`,
      "price",
      { min: newValue[0], max: newValue[1] }
    );
  };

  const applyFilters = () => {
    let filtered = ProductsData;

    if (selectedSubCategory) {
      filtered = filtered.filter(
        (product) => product.subCategory_id === String(selectedSubCategory)
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.Brand)
      );
    }

    if (priceRange) {
      const [min, max] = priceRange;
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.trendyol_salePrice);
        return !isNaN(price) && price >= min && price <= max;
      });
    }

    if (showInStockOnly) {
      filtered = filtered.filter((product) => parseInt(product.Stock) > 0);
      updateActiveFilters("Stok", "Stoktakiler", "stock", true);
    } else {
      setActiveFilters((prev) => prev.filter((f) => f.key !== "stock"));
    }

    setFilteredProducts(filtered);
  };

  const removeFilter = (filter) => {
    if (filter.key === "brand") setSelectedBrands([]);
    else if (filter.key === "subCategory") setSelectedSubCategory(null);
    else if (filter.key === "price")
      setPriceRange([minPriceInData, maxPriceInData]);
    else if (filter.key === "stock") setShowInStockOnly(false);

    setActiveFilters((prev) => prev.filter((f) => f.key !== filter.key));
    applyFilters();
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* İçerik */}
      <div className="mt-5 px-4 max-w-7xl mx-auto">
        <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
          <IconHome className="text-rose-500 mr-1" size="1.2rem" />
          <span className="flex items-center gap-1">
            <span className="hover:underline hover:text-rose-600 cursor-pointer transition">
              {mainCategory?.name}
            </span>
            <IconChevronRight className="text-rose-400" size="1rem" />
          </span>
          <span className="flex items-center gap-1">
            <span className="hover:underline hover:text-rose-600 cursor-pointer transition">
              {subCategory?.name}
            </span>
            <IconChevronRight className="text-rose-400" size="1rem" />
          </span>
          <span className="text-gray-700 font-medium">
            {thirdCategory?.name}
          </span>
        </p>
        <div className="mt-6">
          <SectionTitle
            title={
              thirdCategory?.name || subCategory?.name || mainCategory?.name
            }
          />
        </div>
        <div className="flex gap-7">
          {/* SOL FİLTRE */}

          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "1rem",
              WebkitBoxShadow: "0 1px 3px rgba(0,0,0,.09)",
              boxShadow: "0 1px 3px rgba(0,0,0,.09)",
              WebkitBoxShadow:
                "0 6px 12px -2px rgba(50,50,93,.125),0 3px 7px -3px rgba(0,0,0,.15)",
              boxShadow:
                "0 6px 12px -2px rgba(50,50,93,.125),0 3px 7px -3px rgba(0,0,0,.15)",
            }}
            className={`sticky ${
              scrolled ? " top-[8rem]" : "top-5"
            } min-w-[16rem] transition-all duration-300 z-10 bg-white border border-gray-200 p-4 rounded shadow-sm h-fit`}
          >
            <h1 className="text-lg border-b border-slate-200 pb-1 mb-2">
              Filtrele
            </h1>
            <div>
              <h3 className="font-semibold mb-2">Markalar</h3>
              {brandList.map((brand) => (
                <label key={brand} className="block text-sm">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="mr-2"
                  />
                  {brand}
                </label>
              ))}
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Fiyat Aralığı</h3>
              <div className="mb-1 text-sm text-gray-700">
                ₺{priceRange[0]} - ₺{priceRange[1]}
              </div>

              <RoseSlider
                value={priceRange}
                onChange={handlePriceSliderChange}
                valueLabelDisplay="auto"
                min={minPriceInData}
                max={maxPriceInData}
                getAriaValueText={(value) => `₺${value}`}
                disableSwap
              />
            </div>

            <div className="mt-4">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={showInStockOnly}
                  onChange={(e) => setShowInStockOnly(e.target.checked)}
                  className="mr-2"
                />
                Sadece stoktakiler
              </label>
            </div>

            <button
              onClick={applyFilters}
              className="mt-6 w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded cursor-pointer hover:shadow-lg"
            >
              Filtrele
            </button>
          </div>

          {/* ÜRÜNLER */}
          <div className="md:col-span-3">
            <ProductGrid
              gridCols={4}
              products={filteredProducts}
              onClick={navigateDetails}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Index;
