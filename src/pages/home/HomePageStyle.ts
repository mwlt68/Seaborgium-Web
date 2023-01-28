import { ColorConsts } from "../../utils/consts/ProjectConsts";

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    height: "100vh",
  },
  errorOrLoadingContainer: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    alignItems:"center",
    justifyContent: "center",
    gap: "1rem"
  },
  headerCart: {
    display: "flex",
    flexDirection: "row-reverse",
    padding: ".5em",
    margin: "1em",
    height: "1.5em",
  },
  headerCartAddButton: {
    backgroundColor: ColorConsts.DarkBlue,
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "0 1rem",
    gap: "1em",
    justifyContent: "start",
    alignItems: "center",
  },
  productCard: {
    maxWidth: 300,
    maxHeight: 450,
  },
  productCardAction: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1em 1em",
  },
  productCardImage: {
    objectFit: "fill",
  },
  errorAlert: {
    maxWidth:"50%"
  },
};
