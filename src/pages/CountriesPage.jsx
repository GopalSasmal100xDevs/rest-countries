import { useEffect, useState } from "react";
import { FilterSearchControls, Card, Loader } from "../components";
import { fetchData, getRegion, getSubRegions } from "../utils";
import { Link } from "react-router-dom";

export default function CountriesPage() {
  const [rawCountriesData, setRawCountriesData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [subregion, setSubRegion] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [subregions, setSuborigins] = useState([]);

  const regions = getRegion(countries);

  useEffect(() => {
    fetchData("https://restcountries.com/v3.1/all")
      .then((data) => {
        setCountries(data);
        setRawCountriesData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getSubRegions(countries, setSuborigins);
  }, [getSubRegions, countries, setSuborigins]);

  return (
    <div>
      <FilterSearchControls
        rawCountriesData={rawCountriesData}
        countries={countries}
        search={search}
        setCountries={setCountries}
        setSearch={setSearch}
        allRegions={regions}
        region={region}
        setRegion={setRegion}
        subregion={subregion}
        subregions={subregions}
        setSubRegion={setSubRegion}
        setSortCriteria={setSortCriteria}
        sortCriteria={sortCriteria}
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="grid pt-10 gap-12 gap-y-8 md:mx-auto md:max-w-[800px] md:grid-cols-2 md:gap-x-2 lg:max-w-[1000px] lg:grid-cols-2 lg:px-14 xl:max-w-full xl:grid-cols-4 xl:gap-16 xl:px-20">
          {countries.map((data, index) => (
            <Link to={`/country/${data.cca3}`} key={index}>
              <Card country={data} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
