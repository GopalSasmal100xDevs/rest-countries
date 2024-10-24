import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

export default function SelectItems({ name, onChange, placeholder, options }) {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === "dark" ? "bg-darkBlue" : "bg-whiteClr";
  const color = theme === "dark" ? "text-whiteClr" : "text-darkBlue";
  console.log(options);

  return (
    <>
      {options.length == 0 ? (
        <div
          className={`flex justify-center items-center h-10 w-40 rounded-lg shadow-lg cursor-pointer lg:w-44 ${backgroundColor} ${color}`}
        >
          <p>No Subregion</p>
        </div>
      ) : (
        <select
          name={name}
          className={`h-10 w-40 rounded-lg shadow-lg cursor-pointer lg:w-44 ${backgroundColor} ${color}`}
          style={{ padding: "10px" }}
          onChange={onChange}
        >
          <option value="">{placeholder}</option>

          {options.map(({ value, title }, index) =>
            title ? (
              <option key={index} value={value} className="cursor-pointer">
                {title}
              </option>
            ) : null
          )}
        </select>
      )}
    </>
  );
}
