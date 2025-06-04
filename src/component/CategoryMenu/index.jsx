import { IconChevronRight, IconMoodEmpty } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Index = ({ data }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(
    data.length > 1 ? null : data[0]
  );
  const [isHiddenNav, setHiddenNav] = useState(false);

  useEffect(() => {
    if (data.length > 1) {
      setActiveCategory(null);
      setHiddenNav(false);
    } else if (data.length === 1) {
      setActiveCategory(data[0]);
      setHiddenNav(true);
    }
  }, [data]);

  const maxItemsPerColumn = 6;
  const chunks = [];

  if (activeCategory?.categories?.length) {
    for (
      let i = 0;
      i < activeCategory.categories.length;
      i += maxItemsPerColumn
    ) {
      chunks.push(activeCategory.categories.slice(i, i + maxItemsPerColumn));
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-auto md:h-[28rem] rounded-b-xl overflow-hidden border border-slate-200 shadow-xl bg-white/60">
      {/* Eğer hiç data yoksa */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-64 text-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-slate-400"
          >
            <IconMoodEmpty size={48} stroke={1.2} className="mx-auto mb-3" />
            <h2 className="text-lg font-semibold">Kategori Bulunamadı</h2>
            <p className="text-sm text-slate-500 mt-1">
              Görüntülenecek herhangi bir kategori mevcut değil.
            </p>
          </motion.div>
        </div>
      ) : (
        <>
          {/* Sol Menü */}
          {!isHiddenNav && (
            <nav className="w-full md:w-1/5 border-b md:border-b-0 md:border-r border-slate-200 overflow-y-auto scrollbar-thin scrollbar-thumb-rose-200 scrollbar-track-rose-50 bg-slate-50/60 shadow-md">
              {data.map((mainCat) => (
                <motion.div
                  layout
                  key={mainCat.id}
                  onMouseEnter={() => setActiveCategory(mainCat)}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className={`px-4 py-3 cursor-pointer transition-all duration-200 select-none text-sm font-medium
                  ${
                    activeCategory?.id === mainCat.id
                      ? "bg-white/60 text-rose-400 border-l-4 border-rose-400 shadow-sm"
                      : "text-slate-700 hover:bg-slate-200/60"
                  }`}
                >
                  {mainCat.name}
                </motion.div>
              ))}
            </nav>
          )}

          {/* Sağ İçerik */}
          <section className="w-full md:w-4/5 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rose-200 scrollbar-track-rose-100">
            <AnimatePresence mode="wait">
              {activeCategory?.categories ? (
                <motion.ul
                  key={activeCategory?.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 text-sm p-2"
                >
                  {activeCategory.categories.map((subCat) => (
                    <li key={subCat.id} className="break-inside-avoid mb-6">
                      <motion.div
                        onClick={(e) => {
                          navigate(
                            `categories/${activeCategory.id}.${subCat.id}`
                          );
                        }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="text-rose-400 hover:text-rose-500 font-semibold text-[0.95rem] mb-2 cursor-pointer"
                      >
                        {subCat.name}
                      </motion.div>

                      {subCat.categories?.length > 0 ? (
                        <ul className="ml-1 list-disc space-y-1 text-slate-500">
                          {subCat.categories.map((subSubCat) => (
                            <motion.li
                              key={subSubCat.id}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2 }}
                              className="hover:text-slate-900 flex items-center gap-1 cursor-pointer text-[0.88rem]"
                              onClick={() => {
                                navigate(
                                  `categories/${activeCategory.id}.${subCat.id}.${subSubCat.id}`
                                );
                              }}
                            >
                              <IconChevronRight
                                size={"0.9rem"}
                                className="text-rose-300"
                              />
                              {subSubCat.name}
                            </motion.li>
                          ))}
                        </ul>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 text-slate-500 hover:underline text-[0.88rem] cursor-pointer"
                          onClick={() => {
                            navigate(
                              `categories/${activeCategory.id}.${subCat.id}`
                            );
                          }}
                        >
                          {subCat.name}
                        </motion.div>
                      )}
                    </li>
                  ))}
                </motion.ul>
              ) : (
                <div className="text-center text-slate-400 text-sm italic p-6">
                  Alt kategoriler bulunamadı.
                </div>
              )}
            </AnimatePresence>
          </section>
        </>
      )}
    </div>
  );
};

export default Index;
