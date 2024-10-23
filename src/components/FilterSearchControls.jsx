import { IoSearchSharp } from "react-icons/io5";
import SelectItems from "./SelectItems";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { filtersCountries, sortCountries } from "../utils";

export default function FilterSearchControls({
  rawCountriesData,
  search,
  countries,
  setCountries,
  setSearch,
  allRegions,
  setRegion,
  subregion,
  subregions,
  region,
  setSubRegion,
  sortCriteria,
  setSortCriteria,
}) {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === "dark" ? "bg-darkBlue" : "bg-whiteClr";
  const color = theme === "dark" ? "text-whiteClr" : "text-darkBlue";

  useEffect(() => {
    filtersCountries({
      countries: rawCountriesData,
      search,
      region,
      subregion,
      setCountries,
    });
  }, [filtersCountries, search, region, subregion, setCountries]);

  useEffect(() => {
    sortCountries({ sortCriteria, countries, setCountries });
  }, [sortCriteria]);

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
          className={`pl-10 pr-4 py-2 w-full border rounded-md shadow-lg mt-4 ${backgroundColor} ${color}`}
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
          <select
            name="sort"
            className={`h-10 w-40 rounded-lg shadow-lg lg:w-44 ${backgroundColor} ${color}`}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="areaAsc">Area (Ascending)</option>
            <option value="areaDsc">Area (Descending)</option>
            <option value="populationAsc">Population (Ascending)</option>
            <option value="populationDsc">Population (Descending)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
