import { Outlet, Navigate } from "react-router";
import { NavigationConsts } from "../../../utils/consts/NavigationConsts";
import { AuthManager } from "../../../utils/helpers/AuthManager";

const PrivateRoutes = () => {
  let hasToken = AuthManager.hasToken();
  return (
    <div>
      {hasToken ? <Outlet /> : <Navigate to={NavigationConsts.LoginPage} />}
    </div>
  );
};

export default PrivateRoutes;
