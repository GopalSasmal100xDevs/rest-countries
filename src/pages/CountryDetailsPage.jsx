import { useContext, useEffect, useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../components";
import { ThemeContext } from "../theme/ThemeContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { fetchData } from "../utils";

export default function CountryDetailsPage() {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_SERVER_BASE_URL}/alpha/${id}`)
      .then((data) => {
        if (data.status === 404 || data.status === 400) navigate("/error");
        setCountry(data[0]);
      })
      .catch((err) => {
        if (err.status === 404 || err.status === 400) navigate("/error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, id]);

  return (
    <div className="px-[4rem] md:px-[6rem]">
      {loading ? (
        <Loader />
      ) : (
        <>
          <HelmetProvider>
            <Helmet>
              <title>Country | {country.name?.common}</title>
            </Helmet>
          </HelmetProvider>

          <button
            className={`flex items-center justify-center mt-10 gap-2 rounded-sm text-xl font-semibold shadow-md shadow-darkBlue/30 px-7 py-3 ${
              theme === "dark"
                ? "bg-darkBlue text-whiteClr"
                : "bg-whiteClr text-darkBlue"
            }`}
            onClick={() => navigate(-1)}
          >
            <span>
              <HiOutlineArrowNarrowLeft size={28} />
            </span>
            <span>Back</span>
          </button>

          <section className="flex flex-col lg:flex-row mt-20 gap-12">
            <div className="lg:max-w-[40%] lg:h-auto flex-shrink-1 lg:flex-1 lg:pr-10">
              <LazyLoadImage
                src={country.flags?.svg}
                alt={`${country.name?.common} Flag`}
                className="drop-shadow-lg lg:h-full lg:w-full lg:object-fill"
              />
            </div>
            <div
              className={`flex flex-col gap-10 lg:flex-1 lg:gap-6 lg:pr-6 ${
                theme === "dark" ? "text-whiteClr" : "text-black"
              }`}
            >
              <h2 className="text-3xl font-bold lg:mt-8 lg:text-2xl">
                {country.name?.common}
              </h2>
              <div className="max-w-[80%] flex flex-col sm:flex-col md:flex-row justify-between items-center gap-3">
                <div className="md:flex md:items-start md:justify-between self-start">
                  <div className="flex-col gap-2 text-lg md:flex lg:text-sm">
                    <p>
                      <span className="font-bold">Native Name: </span>
                      {country.name?.nativeName
                        ? country.name?.nativeName[
                            Object.keys(country.name?.nativeName)[0]
                          ].common
                        : "No Native Name"}
                    </p>
                    <p>
                      <span className="font-bold">Population: </span>
                      {country.population
                        ? country.population?.toLocaleString()
                        : 0}
                    </p>
                    <p>
                      <span className="font-bold">Region: </span>
                      {country.region ? country.region : "No Region"}
                    </p>
                    <p>
                      <span className="font-bold">Sub Region: </span>
                      {country.subregion ? country.subregion : "No Subregion"}
                    </p>
                    <p>
                      <span className="font-bold">Capital: </span>
                      {country.capital ? country.capital : "No Capital"}
                    </p>
                  </div>
                </div>
                <div className="flex-col gap-2 text-lg md:flex lg:text-sm self-start">
                  <p>
                    <span className="font-bold">Top Level Domain: </span>
                    {country.tld ? country.tld : "No Domain present"}
                  </p>
                  <p>
                    <span className="font-bold">
                      {country?.currencies?.keys?.length === 1
                        ? "Currency: "
                        : "Currencies: "}
                    </span>

                    {country.currencies ? (
                      Object.keys(country.currencies)
                        .map((curr) => country?.currencies[curr].name)
                        .join(", ")
                    ) : (
                      <span>No Currency</span>
                    )}
                  </p>
                  <p className="flex gap-3">
                    <span className="font-bold inline">
                      {country?.languages?.keys?.length === 1
                        ? "Language: "
                        : "Languages: "}
                    </span>
                    <span className="flex gap-3 flex-wrap">
                      {country.languages ? (
                        <>
                          {Object.keys(country.languages).map((lang, index) => (
                            <span key={index}>{country?.languages[lang]}</span>
                          ))}
                        </>
                      ) : (
                        <span>No Language</span>
                      )}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mb-10 flex flex-col gap-6">
                <h2 className="text-xl font-bold lg:hidden">
                  Border Countries:
                </h2>
                <div className="flex flex-wrap gap-3 lg:text-sm sm:flex-wrap">
                  <span className="hidden text-sm font-bold lg:block">
                    Border Countries:
                  </span>
                  {country?.borders ? (
                    country?.borders?.map((border) => {
                      return (
                        <Link
                          to={`/country/${border}`}
                          key={border}
                          state={border}
                          className={`px-6 py-2 drop-shadow-lg sm:px-10 lg:py-1 lg:px-4 rounded-sm ${
                            theme === "dark"
                              ? "bg-darkBlue text-whiteClr"
                              : "bg-whiteClr text-darkBlue"
                          }`}
                        >
                          {border}
                        </Link>
                      );
                    })
                  ) : (
                    <p className="-mt-4 lg:mt-0">
                      {country?.name?.common} has no border countries.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
