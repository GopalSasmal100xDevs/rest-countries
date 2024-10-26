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
  urlSearchParams,
  setUrlSearchParams,
}) {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === "dark" ? "bg-darkBlue" : "bg-whiteClr";
  const color = theme === "dark" ? "text-whiteClr" : "text-darkBlue";

  return (
    <div className="flex justify-start flex-col lg:flex-row lg:justify-between lg:ml-2 lg:mr-1 sm:flex-col lg:px-[5rem] md:px-[3rem] sm:px[1rem]">
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
          onChange={(e) => {
            setSearch(e.target.value);
            setUrlSearchParams((prev) => ({
              ...Object.fromEntries([...prev]),
              search: e.target.value,
            }));
          }}
        />
      </div>

      <div className="flex flex-col gap-0 justify-evenly md:flex-row lg:flex-row sm:flex-row">
        <div className="px-5">
          <SelectItems
            name={""}
            options={allRegions}
            onChange={(e) => {
              setRegion(e.target.value);
              setUrlSearchParams((prev) => ({
                ...Object.fromEntries([...prev]),
                region: e.target.value,
              }));
            }}
            selectedItem={Object.fromEntries([...urlSearchParams])?.region}
            placeholder="Filter by Region"
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        <div className="px-5">
          <SelectItems
            options={subregions}
            onChange={(e) => {
              setSubRegion(e.target.value);
              setUrlSearchParams((prev) => ({
                ...Object.fromEntries([...prev]),
                subregion: e.target.value,
              }));
            }}
            selectedItem={Object.fromEntries([...urlSearchParams])?.subregion}
            placeholder="Filter by Subregion"
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="px-5">
          <SelectItems
            options={[
              { value: "areaASC", title: "Area (Ascending)" },
              { value: "areaDSC", title: "Area (Descending)" },
              { value: "populationASC", title: "Population (Ascending)" },
              { value: "populationDSC", title: "Population (Descending)" },
            ]}
            onChange={(e) => {
              setSortCriteria(e.target.value);
              setUrlSearchParams((prev) => ({
                ...Object.fromEntries([...prev]),
                sort: e.target.value,
              }));
            }}
            selectedItem={Object.fromEntries([...urlSearchParams])?.sort}
            placeholder="Sort by"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
