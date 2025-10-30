export const SearchSuggestion = ({ title, children }) => {
  return (
    <div className="absolute bg-slate-50 z-[20] top-full left-0 w-full max-h-[20rem] overflow-y-auto shadow-md mt-2">
      <div className="p-5">
        <h1 className="font-semibold text-base">{title}</h1>
        <ul>{children}</ul>
      </div>
    </div>
  );
};
