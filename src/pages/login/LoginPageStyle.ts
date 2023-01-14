import background from "../../assets/images/login-page-background.jpg";
import { ColorConsts } from "../../utils/consts/ProjectConsts";

export const styles = {
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    p: 1,
    m: 1,
    display: "flex",
    minWidth: 300,
    width: 400,
    minHeight: 500,
    flexDirection: "column",
    bgcolor: "white",
    borderRadius: 5,
    alignItems: "center",
  },
  header: {
    color: ColorConsts.DarkBlue,
  },
  forgotButton: {
    color: ColorConsts.DarkBrown,
  },
  signUpButton: {
    color: ColorConsts.DarkBrown,
  },
  loginButton: {
    backgroundColor: ColorConsts.LightBeige,
    color: "Grey",
  },
  errorMessageText: {
    color: "Red",
  },
  input: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: 0.75,
  },
};
