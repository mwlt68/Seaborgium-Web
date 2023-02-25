import { NavigateFunction } from "react-router-dom";
import { NavigationConsts } from "../../utils/consts/NavigationConsts";
import { AuthManager } from "../../utils/helpers/AuthManager";


export default function ApiRequestCatchAndFinalize<T>(
    request: Promise<T>,
    resultFunction: (result: T) => void,
    setLoading: (value: React.SetStateAction<boolean>) => void,
    navigate: NavigateFunction,
    ) {

  request
    .then((res) => resultFunction(res))
    .catch((err: Error) => {
      console.log("Error : " + err.message);
    })
    .finally(() => {
      if (AuthManager.hasNotToken()) {
        navigate(NavigationConsts.LoginPage);
      } else {
        setLoading(false);
      }
    });
}
