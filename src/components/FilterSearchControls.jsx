import { IoSearchSharp } from "react-icons/io5";
import SelectItems from "./SelectItems";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

export default function FilterSearchControls({
  search,
  setSearch,
  allRegions,
  setRegion,
  subregions,
  setSubRegion,
  setSortCriteria,
}) {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === "dark" ? "bg-darkBlue" : "bg-whiteClr";
  const color = theme === "dark" ? "text-whiteClr" : "text-darkBlue";

  return (
    <div className="flex flex-col lg:flex-row lg:justify-around lg:ml-2 lg:mr-1">
      <div className="relative ml-4 mr-5 mt-1 lg:w-80">
        <span className="absolute left-0 top-0 flex items-center pl-3 pt-4">
          <div className={`mt-3 ${backgroundColor} ${color}`}>
            <IoSearchSharp />
          </div>
        </span>

        <input
          id="search"
          type="text"
          className={`pl-10 pr-4 py-2 w-full border rounded-md shadow-lg mt-4 ${backgroundColor} ${color} border-none`}
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-row justify-evenly">
        <div className="mt-5 ml-4">
          <SelectItems
            name={""}
            options={allRegions}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Filter by Region"
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="mt-5 ml-4">
          <SelectItems
            options={subregions}
            onChange={(e) => setSubRegion(e.target.value)}
            placeholder="Filter by Subregion"
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="mt-5 ml-4">
          <SelectItems
            options={[
              { value: "areaASC", title: "Area (Ascending)" },
              { value: "areaDSC", title: "Area (Descending)" },
              { value: "populationASC", title: "Population (Ascending)" },
              { value: "populationDSC", title: "Population (Descending)" },
            ]}
            onChange={(e) => setSortCriteria(e.target.value)}
            placeholder="Sort by"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
