import { useParams } from "react-router-dom";

export default function CountryDetailsPage() {
  const { id } = useParams();
  return <div>Country Details page {id}</div>;
}
