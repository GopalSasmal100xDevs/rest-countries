export async function fetchData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export function getRegion(countries = []) {
  const res = countries.reduce((acc, country) => {
    if (country.region) {
      acc = [...acc, country.region];
    }
    return acc;
  }, []);
  return Array.from(new Set(res));
}

export function getSubRegions(countries = []) {
  const res = countries.reduce((acc, country) => {
    if (country.subregion) {
      acc = [...acc, country.subregion];
    }
    return acc;
  }, []);

  return Array.from(new Set(res));
}

export function filtersCountries({
  countries = [],
  search = "",
  region = "",
  subregion = "",
  setCountries,
}) {
  console.log(search, region, subregion);
  const res = countries.filter((country) => {
    const isNameMatch = country?.name?.common
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const isRegionMatch =
      region === "" || country?.region.toLowerCase() === region.toLowerCase();

    const isSubRegionMatch =
      subregion === "" ||
      country?.["subregion"]?.toLowerCase() === subregion.toLowerCase();

    return isNameMatch && isRegionMatch && isSubRegionMatch;
  });
  if (setCountries) setCountries(res);
  return res;
}

export function getCountriesLess(countries, setCountries) {
  const res = countries.reduce(
    (acc, { name, capital, flags, region, population, cca3 }) => {
      acc = [
        ...acc,
        {
          name,
          capital,
          flags,
          region,
          population,
          cca3,
        },
      ];
      return acc;
    },
    []
  );
  setCountries(res);
}
