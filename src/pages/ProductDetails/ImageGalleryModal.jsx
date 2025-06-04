import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";

const ImageGalleryModal = ({
  images,
  isOpen,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, onPrev, onNext]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const image = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-w-5xl w-full mx-4 md:mx-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Kapatma Butonu */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 z-10 text-white p-2 rounded-full hover:bg-white/10 transition"
            >
              <IconX size={28} />
            </button>

            {/* Görsel */}
            <div className="relative rounded-2xl overflow-hidden bg-black shadow-lg">
              <motion.img
                key={image}
                src={image}
                alt={image.alt || "Image"}
                className="w-full max-h-[80vh] object-contain"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              />

              {/* Alt Yazı */}
              {image.alt && (
                <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-3 text-center text-sm">
                  {image.alt}
                </div>
              )}

              {/* Önceki / Sonraki */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={onPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/10 transition rounded-r-xl"
                  >
                    <IconChevronLeft size={36} />
                  </button>
                  <button
                    onClick={onNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/10 transition rounded-l-xl"
                  >
                    <IconChevronRight size={36} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageGalleryModal;
