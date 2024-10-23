import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { FaRegMoon } from "react-icons/fa";
import { AiOutlineSun } from "react-icons/ai";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="flex justify-between items-center w-full mb-2 p-5 shadow-lg">
      <h2 className="text-xl font-bold mt-6 pl-4 lg:text-2xl mb-4 lg:ml-32">
        Where in the world?
      </h2>
      <button
        onClick={toggleTheme}
        className="cursor-pointer mt-6 mr-3 py-2 px-4 rounded-lg shadow-lg mb-4 lg:mr-1"
      >
        {theme === "dark" ? (
          <div className="flex justify-center items-center gap-3">
            <AiOutlineSun />
            <span>Light Mode</span>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-3">
            <FaRegMoon />
            <span>Dark Mode</span>
          </div>
        )}
      </button>
    </header>
  );
}
