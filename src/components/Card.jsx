export default function Card({ country }) {
  const { name, capital, flags, region, population } = country;
  return (
    <div
      className="card rounded-lg mb-12 shadow-xl h-150 w-72
      transform transition-transform duration-300 hover:scale-105 cursor-pointer"
    >
      <img
        src={flags.svg}
        alt={`${name.common} flag`}
        className="rounded-t-lg h-48 w-full"
      />
      <h2 className="font-bold text-2xl mt-5 ml-5 mb-5">{name.common}</h2>
      <p className="ml-5 text-xl">Population: {population.toLocaleString()}</p>
      <p className="ml-5 text-xl">Region: {region}</p>
      <p className="ml-5 text-xl mb-4">Capital: {capital}</p>
    </div>
  );
}
