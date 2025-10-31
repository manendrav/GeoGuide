import { RxCross2 } from "react-icons/rx";

export const Sidebar = ({ children, isOpen, toggleSidebar, title }) => {
  return (
    <aside
      className={`fixed top-0 right-0 w-[20rem] p-3 h-full z-10 bg-gray-50 text-black transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } dark:bg-gray-800 dark:text-white`}
    >
      {/* Close button */}
      <div className="p-4 flex justify-between text-2xl items-center cursor-pointer">
        <div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="px-4 flex justify-end  cursor-pointer">
          <button
            className="hover:bg-gray-200 text-2xl rounded-full p-2 dark:hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            <RxCross2 />
          </button>
        </div>
      </div>

      {/* Sidebar content */}
      <div>{children}</div>
    </aside>
  );
};
