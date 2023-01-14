import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { NavigationConsts } from "../../utils/consts/NavigationConsts";
import { DefaultTextConst } from "../../utils/consts/DefaultTextConst";
import { ProjectConsts } from "../../utils/consts/ProjectConsts";
import { styles } from "./RegisterPagStyle";
import { UserApiService } from "../../services/api-service/UsersApiService";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registerButtonEnable, setRegisterButtonEnable] = useState(true);
  const [registrationSuccesful, setRegistrationSuccesful] = useState(false);
  const navigate = useNavigate();
  const passwordConfirmationErrorMessage = "Password confirmation not correct !"
  const registerSuccessfulRedirectionDelay = 2000;

  
  const handleRegister = async () => {
    setRegisterButtonEnable(false);
    localStorage.removeItem(ProjectConsts.TokenStorageKey);
    if(password !== passwordConfirm){
      setErrorMessage(
        passwordConfirmationErrorMessage
      );
      return;
    }
    UserApiService
      .register(username, password)
      .then((registerResponse) => {
        debugger
        if (
          registerResponse?.result?.token &&
          registerResponse.hasException === false
          ){
            setRegistrationSuccesful(true)
          // localStorage.setItem(ProjectConsts.TokenStorageKey, registerResponse.result.token);
          setTimeout(()=> {
            navigate(NavigationConsts.LoginPage);
           }, registerSuccessfulRedirectionDelay);
        }
        else
          setErrorMessage(
            registerResponse.exceptionContent ?? DefaultTextConst.ErrorMessage
          );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRegisterButtonEnable(true);
      });
  };

  const handleSignInRedirect = async () => {
    navigate(NavigationConsts.LoginPage);
  };

  return (
    <Box sx={styles.background}>
      <Box
        sx={styles.container}
      >
        <h1 style={styles.header}>{ProjectConsts.Name}</h1>

        <Box
          sx={styles.input}
        >
          {errorMessage && (
            <h4 style={styles.errorMessageText}>{errorMessage}</h4>
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

          <TextField
            label="Password Confirm"
            variant="standard"
            type="password"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />

          <RegisterButtonOrSuccesful/>

          <Button 
            size="small" 
            style={styles.signUpButton}
            onClick={handleSignInRedirect}
            >
            Or Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );

  function RegisterButtonOrSuccesful(){
    if(registrationSuccesful){
      return(
        <Box sx={styles.registrationSuccesfulBox}>
          <CircularProgress sx={styles.registrationSuccesfulCircular} size= "2em"/>
          <p style={styles.registrationSuccesfulText}>Sign up successful. You are redirected to the Sign In page.</p>
        </Box>
      )
    }
    else {
      return (
        <LoadingButton
          loading={!registerButtonEnable}
          variant="contained"
          loadingPosition="start"
          onClick={handleRegister}
          style={styles.loginButton}
        >
          Sign Up
        </LoadingButton>
      )
    }
  }
}


