import Lottie from "lottie-react";
import groovyWalkAnimation from "../../../assets/lotties/groovy-walk-cycle.json"

const styles = {
    lottie : {
        height:"300px"
    }
}
export default function PageLoading(){
    return <Lottie animationData={groovyWalkAnimation} loop={true} style={styles.lottie}/>
}