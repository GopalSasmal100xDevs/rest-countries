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
