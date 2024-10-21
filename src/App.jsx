import MainLayout from "./layout/MainLayout";
import { ThemeProvider } from "./theme/ThemeContext";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { CountriesPage, CountryDetailsPage } from "./pages";

function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}

function HomePage() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/" index element={<CountriesPage />} />
        <Route path="/country/:id" element={<CountryDetailsPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
