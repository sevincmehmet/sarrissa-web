// components/SectionTitle.jsx
const SectionTitle = ({ title, titleItem = [] }) => (
  <div className="border-b border-slate-200 mb-6 flex items-center justify-between">
    <h2 className="text-2xl font-semibold border-l-4 mb-3 border-rose-400 pl-4 ">
      {title}
    </h2>
    <div className="mb-3">
      {titleItem.map((oItem, oIndex) => {
        return <div key={oIndex}>{oItem}</div>;
      })}
    </div>
  </div>
);

export default SectionTitle;
