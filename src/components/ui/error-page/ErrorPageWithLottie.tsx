import { Alert, Box } from "@mui/material";
import Lottie from "lottie-react";
import errorAnimation from "../../../assets/lotties/error.json"

export function ErrorPageWithLottie(props:any){
    const styles={
        container:{
            display: "flex",
            height: "100%",
            width: "100%",
            flexDirection: "column",
            alignItems:"center",
            justifyContent: "center",
            gap: "1rem"
        },
        alert:{
            maxWidth:"50%"
        }
    }
    return(
        <Box sx={styles.container}>
        <Lottie animationData={errorAnimation} loop={true}/>
        <Alert variant="filled" severity="error" sx={styles.alert} >
          {props.message}
        </Alert>
      </Box>
    );
}