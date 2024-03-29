import { Box } from "@mui/material";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../../assets/lotties/groovy-walk-cycle.json"

const styles = {
    lottie : {
        height:"300px"
    },
    container: {
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        alignItems:"center",
        justifyContent: "center",
        gap: "1rem"
    },
}
type Props = {
    children: any;
    isLoading:boolean;
}

function PageLoading(props: Props){
    if(props.isLoading){
        return <Lottie animationData={groovyWalkAnimation} loop={true} style={styles.lottie}/>
    }
    else return props.children;
}

function CenterPageLoading(props: Props){
    if(props.isLoading){
        return(
            <Box sx={styles.container}>
                <Lottie animationData={groovyWalkAnimation} loop={true} style={styles.lottie}/>
            </Box>
        ) 
    }
    else return props.children;
}

export { PageLoading , CenterPageLoading}