// Variant kombinasyonlarını oluştur
function generateCombinations(attributes) {
  if (!attributes || attributes.length === 0) return [];

  const [first, ...rest] = attributes;
  const restCombinations = generateCombinations(rest);

  if (restCombinations.length === 0) {
    return first.options.map((opt) => [{ name: first.name, value: opt }]);
  }

  const combinations = [];
  for (const opt of first.options) {
    for (const combo of restCombinations) {
      combinations.push([{ name: first.name, value: opt }, ...combo]);
    }
  }

  return combinations;
}

// Variant yapısını oluştur
function generateVariants(data) {
  const combinations = generateCombinations(data);

  const variants = combinations.map((combo, i) => {
    const firstVariant = combo[0].value;

    // Çoklu attribute'lar için spec objesi oluştur
    const spec = {};
    combo.forEach((c, index) => {
      const suffix = index === 0 ? "" : (index + 1).toString();
      spec[`name${suffix}`] = c.name;
      spec[`-${suffix}`] = c.value.value;
    });

    return {
      spec,
      variantId: (i + 1).toString(),
      productCode: "",
      barcode: firstVariant.barcode || "",
      gtin: "",
      mpn: "",
      rafno: "",
      depth: "0",
      height: "0",
      width: "0",
      agirlik: "0",
      desi: "0",
      quantity: String(firstVariant.stock || 0),
      price: Number(firstVariant.price || 0).toFixed(2),
      hbSaticiStokKodu: "",
      hbKodu: "",
      picture: firstVariant.image?.url || "https://via.placeholder.com/150",
    };
  });

  return {
    variants: {
      variant: variants,
    },
  };
}

export { generateVariants };
