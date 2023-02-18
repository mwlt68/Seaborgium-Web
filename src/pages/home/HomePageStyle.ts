import { ColorConsts } from "../../utils/consts/ProjectConsts";

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    height: "100vh",
  },
  headerCart: {
    display: "flex",
    flexDirection: "row-reverse",
    padding: ".5em",
    margin: "1em",
    minHeight: "2rem",
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
  },
  productCard: {
    width: 300,
    height: 440,
  },
  productCardAction: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1em 1em",
  },
  productCardImage: {
    objectFit: "fill",
  },
  productImage:{
    height:250
  },
  productCardContent:{
    display:"flex",
    flexDirection:"column"
  },
  contentTypography:{
    flexGrow:1
  }
};
