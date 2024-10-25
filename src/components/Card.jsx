import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Card({ country }) {
  const { theme } = useContext(ThemeContext);
  const { name, capital, flags, region, population } = country;
  return (
    <div
      className={`mx-auto flex h-[420px] max-w-[400px] cursor-pointer flex-col justify-start rounded-md drop-shadow-md sm:w-[80%] md:w-[350px] lg:h-auto lg:w-[340px] duration-75 hover:scale-105 ${
        theme === "dark"
          ? "bg-darkBlue text-whiteClr"
          : "bg-whiteClr text-darkBlue"
      }`}
    >
      <div className="h-[200px] w-full lg:h-[200px]">
        <LazyLoadImage
          src={flags.png}
          alt={`${name.common} flag`}
          className="h-full w-full rounded-t-md object-fill drop-shadow-md"
        />
      </div>
      <div className="h-[220px] w-full p-8 lg:h-auto lg:py-6">
        <h3 className="mb-4 text-xl font-bold">
          {name.common.length > 20
            ? `${name.common.slice(0, 20)} ...`
            : name.common}
        </h3>
        <p className="text-base">
          <span className="font-semibold">Population: </span>
          <span className="text-veryLightGray">
            {population?.toLocaleString()}
          </span>
        </p>
        <p className="text-base">
          <span className="font-semibold">Region: </span>
          <span className="text-veryLightGray">{region}</span>
        </p>
        <p className="text-base">
          <span className="font-semibold">Capital: </span>
          <span className="text-veryLightGray">{capital}</span>
        </p>
      </div>
    </div>
  );
}
