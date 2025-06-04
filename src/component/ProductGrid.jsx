import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onClick, gridCols = 5 }) => {
  return (
    <div
      className={`grid  ${
        gridCols >= 5
          ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      } gap-x-7 gap-y-8`}
    >
      {products.map((item, index) => (
        <ProductCard key={index} item={item} onClick={onClick} />
      ))}
    </div>
  );
};

export default ProductGrid;
