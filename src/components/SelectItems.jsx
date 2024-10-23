import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

export default function SelectItems({ name, onChange, placeholder, options }) {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === "dark" ? "bg-darkBlue" : "bg-whiteClr";
  const color = theme === "dark" ? "text-whiteClr" : "text-darkBlue";

  return (
    <select
      name={name}
      className={`h-10 w-40 rounded-lg shadow-lg cursor-pointer lg:w-44 ${backgroundColor} ${color}`}
      style={{ padding: "10px" }}
      onChange={onChange}
    >
      <option value="">{placeholder}</option>

      {options.map((option, index) => (
        <option key={index} value={option} className="cursor-pointer">
          {option}
        </option>
      ))}
    </select>
  );
}
