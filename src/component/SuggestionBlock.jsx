// components/SuggestionBlock.jsx
const SuggestionBlock = () => {
    return (
      <div className="w-full bg-rose-50 rounded-xl p-6 text-center mt-8 mb-12">
        <h3 className="text-xl font-semibold">Sürpriz Kampanyalar Sizi Bekliyor</h3>
        <p className="text-sm text-gray-700 mt-2">
          İlginizi çekebilecek ürünleri sizin için seçtik!
        </p>
        <button className="mt-4 px-6 py-2 bg-rose-400 text-white rounded-full hover:bg-rose-500 transition">
          Hemen Keşfet
        </button>
      </div>
    );
  };
  
  export default SuggestionBlock;
  