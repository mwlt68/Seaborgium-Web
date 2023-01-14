import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import { NavigationConsts } from "./utils/consts/NavigationConsts";
import PrivateRoutes from "./utils/helpers/PrivateRoute";

function App(){
  
    return (
        <Router>
            <Routes>
              <Route  path={NavigationConsts.LoginPage} element={<LoginPage />} />
              <Route
                element={<PrivateRoutes/>}>
                <Route element = {<HomePage/>} path = {NavigationConsts.HomePage} />
              </Route>
            </Routes>
      </Router>
    );
}

export default App;