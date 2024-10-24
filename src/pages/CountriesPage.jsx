import { useEffect, useState } from "react";
import { FilterSearchControls, Card, Loader } from "../components";
import {
  fetchData,
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
  const [_error, setError] = useState(null);

  const navigate = useNavigate();
  const regions = getRegion(countries);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((err) => {
        setError(err);
        navigate("/error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const subregions = getSubRegions(countries);

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

  return (
    <div>
      <FilterSearchControls
        search={search}
        setSearch={setSearch}
        allRegions={regions}
        setRegion={setRegion}
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
            <div className="grid pt-10 gap-12 gap-y-8 md:mx-auto md:max-w-[800px] md:grid-cols-2 md:gap-x-2 lg:max-w-[1000px] lg:grid-cols-2 lg:px-14 xl:max-w-full xl:grid-cols-4 xl:gap-16 xl:px-20">
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
