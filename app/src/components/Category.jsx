export const Category = ({ tip, category, icon, handleCategory }) => {
  return (
    <div
      data-tip={tip}
      onClick={() => handleCategory(category)}
      className="tooltip tooltip-bottom flex items-center justify-center cursor-pointer rounded-full hover:bg-violet-800 px-3 py-3 transition-all"
    >
      <p>{icon}</p>
    </div>
  );
};
