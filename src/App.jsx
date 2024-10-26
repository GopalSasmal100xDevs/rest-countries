import MainLayout from "./layout/MainLayout";
import { ThemeContext, ThemeProvider } from "./theme/ThemeContext";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { CountriesPage, CountryDetailsPage } from "./pages";
import { useContext, useEffect } from "react";
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
  const { theme, setTheme } = useContext(ThemeContext);
  const backgroundColor =
    theme === "dark" ? "hsl(207, 26%, 17%)" : "hsl(0, 0%, 100%)";
  const textColor = theme === "dark" ? "#fff" : "#000";

  function changeTheme(backgroundColor, textColor) {
    document.body.style.background = backgroundColor;
    document.body.style.color = textColor;
  }

  useEffect(() => {
    changeTheme(backgroundColor, textColor);
  }, [theme, backgroundColor, textColor]);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (!localTheme) {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      setTheme(localTheme);
    }
  }, [setTheme]);

  return <div>{children}</div>;
}

function Routing() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/" index element={<CountriesPage />} />
        <Route path="/country/:id" element={<CountryDetailsPage />} />
        <Route path="/error" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
