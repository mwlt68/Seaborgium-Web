import { ColorConsts } from "../../../utils/consts/ProjectConsts";

export const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      width: "100vw",
    },
    sideBarContainer: {
      backgroundColor: ColorConsts.LightBeige,
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    sideBar: {},
    sideBarHeader: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      margin: "0.5em 0",
    },
    sideBarHeaderTitle: {
      color: ColorConsts.DarkBlue,
    },
    sideBarHeaderIcon: {
      color: ColorConsts.DarkBlue,
    },
    sideBarHR: {
      backgroundColor: ColorConsts.DarkBlue,
      height: "2px",
      margin: "0",
      border: "0",
    },
    main: {
      margin: "0 0.5em",
      flexGrow:1
    },
    signOutButton: {
      marginTop: "auto",
      backgroundColor: ColorConsts.DarkBlue,
      borderRadius: "0",
    },
    signOutButtonIcon: {
      transform: "rotate(180deg)",
    },
  };