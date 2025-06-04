import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { getXmlProductById } from "../../Api/productService";
import { ProductsData } from "../../Data";

import SectionTitle from "../../component/SectionTitle";
import ProductGrid from "../../component/ProductGrid";
import SuggestionBlock from "../../component/SuggestionBlock";
import Footer from "../../component/Footer";
import HeroVideo from "../../component/HeroVideo";
import {
  IconChevronCompactLeft,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

const Index = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState(ProductsData);
  const [showTabMenu, setShowTabMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  // Referanslar
  const featuredRef = useRef(null);
  const weeklyRef = useRef(null);
  const bestRef = useRef(null);
  const suggestionRef = useRef(null);
  const newRef = useRef(null);

  // Scroll ile görünürlük kontrolü
  const handleScroll = () => {
    const scrollY = window.scrollY;
    setShowTabMenu(scrollY > 400);

    const sections = [
      { key: "featured", ref: featuredRef },
      { key: "weekly", ref: weeklyRef },
      { key: "best", ref: bestRef },
      { key: "suggestion", ref: suggestionRef },
      { key: "new", ref: newRef },
    ];

    // Aktif sekmeyi belirle
    for (let section of sections) {
      const offsetTop = section.ref.current?.offsetTop;
      if (offsetTop && scrollY + 150 >= offsetTop) {
        setActiveTab(section.key);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (ref, key) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveTab(key);
  };

  {
    /*
    const navigateDetails = async (id) => {
      try {
        const res = await getXmlProductById(id);
        navigate(`/product/${id}`, { state: res.data.data });
      } catch (err) {
        console.error("Ürün detayına gidilemedi:", err);
      }
    };
    */
  }

  const navigateDetails = async (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <HeroVideo />

      {/* Sabit Tab Menüsü */}

      {/* İçerik */}
      <div className="max-w-[1280px] mx-auto px-4 space-y-16 pt-8">
        <div ref={featuredRef}>
          <SectionTitle title="Öne Çıkan Ürünler" />
          <ProductGrid
            products={productData.slice(0, 5)}
            onClick={navigateDetails}
          />
        </div>

        <div ref={weeklyRef}>
          <SectionTitle title="Haftanın Ürünleri" />
          <ProductGrid
            products={productData.slice(5, 10)}
            onClick={navigateDetails}
          />
        </div>

        <div ref={bestRef}>
          <SectionTitle title="En Çok Satanlar" />
          <ProductGrid
            products={productData.slice(10, 15)}
            onClick={navigateDetails}
          />
        </div>

        <div ref={suggestionRef}>
          <SectionTitle title="İlginizi Çekebilir" />
          <SuggestionBlock />
        </div>

        <div ref={newRef}>
          <SectionTitle title="Yeni Gelenler" />
          <ProductGrid
            products={productData.slice(15, 25)}
            onClick={navigateDetails}
          />
        </div>
      </div>

    </motion.div>
  );
};

export default Index;
