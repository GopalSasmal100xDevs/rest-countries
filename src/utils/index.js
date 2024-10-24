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
  const res = countries.map(({ subregion }) => subregion);
  return Array.from(new Set(res));
}

export function filtersCountries({
  countries = [],
  search = "",
  region = "",
  subregion = "",
}) {
  return countries.filter((country) => {
    const isNameMatch = country?.name?.common
      ?.toLowerCase()
      .includes(search.trim().toLowerCase());

    const isRegionMatch =
      region === "" || country?.region.toLowerCase() === region.toLowerCase();

    const isSubRegionMatch =
      subregion === "" ||
      country?.["subregion"]?.toLowerCase() === subregion.toLowerCase();

    return isNameMatch && isRegionMatch && isSubRegionMatch;
  });
}

export function getCountriesLess(countries, setCountries) {
  const res = countries.reduce(
    (acc, { name, capital, flags, region, population, cca3, area }) => {
      acc = [
        ...acc,
        {
          name,
          capital,
          flags,
          region,
          population,
          cca3,
          area,
        },
      ];
      return acc;
    },
    []
  );
  setCountries(res);
}

export function sortCountries({ sortCriteria, countries = [] }) {
  return countries.sort((a, b) => {
    switch (sortCriteria) {
      case "areaAsc":
        return parseInt(a.area) - parseInt(b.area);
      case "areaDsc":
        return parseInt(b.area) - parseInt(a.area);
      case "populationAsc":
        return parseInt(a.population) - parseInt(b.population);

      case "populationDsc":
        return parseInt(b.population) - parseInt(a.population);
      default:
        return 0;
    }
  });
}
