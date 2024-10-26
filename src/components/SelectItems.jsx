import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

export default function SelectItems({
  name,
  onChange,
  placeholder,
  options,
  selectedItem,
}) {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === "dark" ? "bg-darkBlue" : "bg-whiteClr";
  const color = theme === "dark" ? "text-whiteClr" : "text-darkBlue";

  return (
    <>
      {options.length == 0 ? (
        <div
          className={`flex justify-center items-center w-full border rounded-md shadow-lg mt-4 ${backgroundColor} ${color} border-none cursor-pointer p-2`}
        >
          <p>No {placeholder.split(" ").at(-1)}</p>
        </div>
      ) : (
        <select
          name={name}
          className={`w-full border rounded-md shadow-lg mt-4 ${backgroundColor} ${color} border-none cursor-pointer`}
          style={{ padding: "10px" }}
          onChange={onChange}
          value={selectedItem}
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
