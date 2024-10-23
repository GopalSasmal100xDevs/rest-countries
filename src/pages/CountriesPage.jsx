import { useEffect, useState } from "react";
import { FilterSearchControls, Card, Loader } from "../components";
import { fetchData, getCountriesLess, getRegion } from "../utils";
import { Link } from "react-router-dom";

export default function CountriesPage() {
  const [rawCountriesData, setRawCountriesData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const regions = getRegion(rawCountriesData);

  useEffect(() => {
    fetchData("https://restcountries.com/v3.1/all")
      .then((data) => setRawCountriesData(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getCountriesLess(rawCountriesData, setCountries);
    setLoading(false);
  }, [rawCountriesData, setCountries, setLoading]);

  return (
    <div>
      <FilterSearchControls />
      {loading ? (
        <Loader />
      ) : (
        <div className="grid pt-10 gap-12 gap-y-8 md:mx-auto md:max-w-[800px] md:grid-cols-2 md:gap-x-2 lg:max-w-[1000px] lg:grid-cols-3 lg:px-14 xl:max-w-full xl:grid-cols-4 xl:gap-16 xl:px-20">
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