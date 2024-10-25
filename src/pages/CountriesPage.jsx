import { useEffect, useState } from "react";
import { FilterSearchControls, Card, Loader } from "../components";
import {
  filtersCountries,
  getRegion,
  getSubRegions,
  sortCountries,
} from "../utils";
import { Link, useNavigate } from "react-router-dom";

export default function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [subregion, setSubRegion] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

  const navigate = useNavigate();
  const regions = getRegion(countries);

  const subregions = getSubRegions(countries, region);

  function changeRegion(region) {
    setRegion(region);
    setSubRegion("");
    setSortCriteria("");
  }

  const filterCountries = filtersCountries({
    countries,
    region,
    search,
    subregion,
  });
  const sortedFilteredCountries = sortCountries({
    countries: filterCountries,
    sortCriteria,
  });

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      })
      .catch(() => {
        navigate("/error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  return (
    <div>
      <FilterSearchControls
        search={search}
        setSearch={setSearch}
        allRegions={regions}
        setRegion={changeRegion}
        subregions={subregions}
        setSubRegion={setSubRegion}
        setSortCriteria={setSortCriteria}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          {sortedFilteredCountries.length == 0 ? (
            <div className="flex justify-center items-center pt-10">
              <p className="text-3xl">`{search}` | No Search Results!</p>
            </div>
          ) : (
            <div className="grid pt-10 gap-12 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-10 xl:max-w-full xl:grid-cols-4 xl:gap-16 lg:px-[5rem] md:px-[3rem] sm:px[1rem]">
              {sortedFilteredCountries.map((data, index) => (
                <Link to={`/country/${data.cca3}`} key={index}>
                  <Card country={data} />
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
