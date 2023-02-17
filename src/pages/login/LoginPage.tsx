import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AuthenticationApiService } from "../../services/api-service/AuthenticationApiService";
import { NavigationConsts } from "../../utils/consts/NavigationConsts";
import { DefaultTextConst } from "../../utils/consts/DefaultTextConst";
import { ProjectConsts } from "../../utils/consts/ProjectConsts";
import { styles } from "./LoginPageStyle";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginButtonEnable, setLoginButtonEnable] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoginButtonEnable(false);
    AuthenticationApiService.login(username, password)
      .then((loginResponse) => {
        if (
          loginResponse?.result?.token &&
          loginResponse.hasException === false
        )
          saveTokenAndNavigateHome(loginResponse.result.token);
        else
          setErrorMessage(
            loginResponse.exceptionContent ?? DefaultTextConst.ErrorMessage
          );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoginButtonEnable(true);
      });
  };

  const saveTokenAndNavigateHome = (token: string): void => {
    localStorage.setItem(ProjectConsts.TokenStorageKey, token);
    navigate(NavigationConsts.HomePage);
  };

  return (
    <Box sx={styles.background}>
      <Box sx={styles.container}>
        <h1 style={styles.header}>{ProjectConsts.Name}</h1>

        <Box sx={styles.input}>
          {errorMessage && (
            <h3 style={styles.errorMessageText}>{errorMessage}</h3>
          )}

          <TextField
            label="Username"
            variant="standard"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <TextField
            label="Password"
            variant="standard"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
            }}
          >
            <Button size="small" style={styles.forgotButton}>
              Forgot Password ?
            </Button>
          </Box>

          <LoadingButton
            loading={!loginButtonEnable}
            variant="contained"
            loadingPosition="start"
            onClick={handleLogin}
            style={styles.loginButton}
          >
            Login
          </LoadingButton>

          <Button size="small" style={styles.signUpButton}>
            Or Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
