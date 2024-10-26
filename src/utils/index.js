export async function fetchData(url) {
  return fetch(url).then((res) => res.json());
}

export function getRegion(countries = []) {
  const res = countries.map(({ region }) => region);
  return Array.from(new Set(res)).map((value) => ({ value, title: value }));
}

export function getSubRegions(countries = [], selectedRegion) {
  const res = countries
    .map(({ region, subregion }) => {
      if (selectedRegion === "") return subregion;
      else if (selectedRegion === region) return subregion;
    })
    .filter((subregion) => subregion !== undefined);
  return Array.from(new Set(res)).map((value) => ({ value, title: value }));
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
      case "areaASC":
        return parseInt(a.area) - parseInt(b.area);
      case "areaDSC":
        return parseInt(b.area) - parseInt(a.area);
      case "populationASC":
        return parseInt(a.population) - parseInt(b.population);

      case "populationDSC":
        return parseInt(b.population) - parseInt(a.population);
      default:
        return 0;
    }
  });
}
