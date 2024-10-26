import { useEffect, useState } from "react";
import { FilterSearchControls, Card, Loader } from "../components";
import {
  fetchData,
  filtersCountries,
  getRegion,
  getSubRegions,
  sortCountries,
} from "../utils";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [subregion, setSubRegion] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [urlSearchParams, setUrlSearchParams] = useSearchParams({});

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
    fetchData(`${import.meta.env.VITE_SERVER_BASE_URL}/all`)
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

  useEffect(() => {
    const urlParams = Object.fromEntries([...urlSearchParams]);
    if (urlParams.search) setSearch(urlParams.search);
    if (urlParams.region) setRegion(urlParams.region);
    if (urlParams.subregion) setSubRegion(urlParams.subregion);
    if (urlParams.sort) setSortCriteria(urlParams.sort);
  }, []);

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
        urlSearchParams={urlSearchParams}
        setUrlSearchParams={setUrlSearchParams}
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
