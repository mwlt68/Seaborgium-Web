import { Outlet,Navigate } from "react-router";
import { NavigationConsts } from "../consts/NavigationConsts";
import { AuthManager } from "./AuthManager";

const PrivateRoutes = ()=>{
    let hasToken = AuthManager.hasToken();
    return (
        <div>
           {hasToken ? <Outlet/> : <Navigate to={NavigationConsts.LoginPage}/>} 
        </div>
    )
}

export default PrivateRoutes;