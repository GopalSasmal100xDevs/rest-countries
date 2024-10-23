import MainLayout from "./layout/MainLayout";
import { ThemeContext, ThemeProvider } from "./theme/ThemeContext";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { CountriesPage, CountryDetailsPage } from "./pages";
import { useContext } from "react";
import PageNotFound from "./components/PageNotFund";

function App() {
  return (
    <ThemeProvider>
      <HomePage>
        <Routing />
      </HomePage>
    </ThemeProvider>
  );
}

function HomePage({ children }) {
  const { theme } = useContext(ThemeContext);
  const backgroundColor =
    theme === "dark" ? "hsl(209, 23%, 22%)" : "hsl(210, 9%, 95%)";
  const textColor = theme === "dark" ? "#fff" : "#000";
  return (
    <div style={{ backgroundColor: backgroundColor, color: textColor }}>
      {children}
    </div>
  );
}

function Routing() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/" index element={<CountriesPage />} />
        <Route path="/country/:id" element={<CountryDetailsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
