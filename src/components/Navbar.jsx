import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { FaRegMoon } from "react-icons/fa";
import { AiOutlineSun } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className={`flex justify-between items-center w-full shadow-lg py-3 ${
        theme === "dark" ? "bg-darkBlue" : "bg-veryLightGray"
      }`}
    >
      <h2 className="text-xl pl-4 sm:text-xl font-bold lg:text-2xl sm:pl-[7rem]">
        <Link to={"/"}>Where in the world?</Link>
      </h2>
      <button
        onClick={toggleTheme}
        className="cursor-pointer pl-4 mt-6 rounded-lg mb-4 lg:mr-1 pr-[6rem]"
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
