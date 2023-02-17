import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import ProductPage from "./pages/product/ProductPage";
import RegisterPage from "./pages/register/RegisterPage";
import { NavigationConsts } from "./utils/consts/NavigationConsts";
import PrivateRoutes from "./components/ui/private-route/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={NavigationConsts.LoginPage} element={<LoginPage />} />
        <Route
          path={NavigationConsts.RegisterPage}
          element={<RegisterPage />}
        />
        <Route element={<PrivateRoutes />}>
          <Route element={<HomePage />} path={NavigationConsts.HomePage} />
          <Route
            element={<ProductPage />}
            path={NavigationConsts.ProductAddPage}
          />
          <Route
            element={<ProductPage />}
            path={NavigationConsts.ProductEditPage}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
