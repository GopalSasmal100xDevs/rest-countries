import { IoSearchSharp } from "react-icons/io5";

export default function FilterSearchControls() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-around lg:ml-2 lg:mr-1">
      <div className="relative ml-4 mr-5 mt-1 lg:w-80">
        <span className="absolute left-0 top-0 flex items-center pl-3 pt-4">
          <div className="mt-3 dark:text-black">
            <IoSearchSharp />
          </div>
        </span>

        <input
          id="search"
          type="text"
          className="pl-10 pr-4 py-2 w-full border rounded-md shadow-lg mt-4 dark:text-black"
          placeholder="Search for a country..."
          //   value={searchTerm}
          //   onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
