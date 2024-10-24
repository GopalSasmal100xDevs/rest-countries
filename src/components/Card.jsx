import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Card({ country }) {
  const { theme } = useContext(ThemeContext);
  const { name, capital, flags, region, population } = country;
  return (
    <div
      className={`mx-auto flex h-[420px] max-w-[400px] cursor-pointer flex-col justify-start rounded-md drop-shadow-md md:w-[350px] lg:h-[340px] lg:w-[340px] duration-75 hover:scale-105 ${
        theme === "dark"
          ? "bg-darkBlue text-whiteClr"
          : "bg-whiteClr text-darkBlue"
      }`}
    >
      <div className="h-[200px] w-full lg:h-[170px]">
        <LazyLoadImage
          src={flags.png}
          alt={`${name.common} flag`}
          className="h-full w-full rounded-t-md object-fill drop-shadow-md"
        />
      </div>
      <div className="h-[220px] w-full p-8  lg:h-[210px] lg:py-6">
        <h2 className="mb-4 text-xl font-bold">{name.common}</h2>
        <p className="text-base">
          <span className="font-semibold">Population: </span>
          {population}
        </p>
        <p className="text-base">
          <span className="font-semibold">Region: </span>
          {region}
        </p>
        <p className="text-base">
          <span className="font-semibold">Capital: </span>
          {capital}
        </p>
      </div>
    </div>
  );
}
