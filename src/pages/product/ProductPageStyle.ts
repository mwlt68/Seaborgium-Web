import { ColorConsts } from "../../utils/consts/ProjectConsts";

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    color: "black",
    backgroundColor: ColorConsts.LightBeige,
    padding: "0.5rem 15%",
  },
  deleteButton:{
    color: "black",
    backgroundColor: "#ff6961",
    padding: "0.5rem 15%",
  },
  productCard: {
    padding: "1rem",
    width: "50%",
  },
  productCardAction: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1em 1em",
  },
  productCardContent: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    gap: "1.5rem",
  },
  addingCardActions: {
    display: "flex",
    justifyContent: "center",
  },
  editingCardActions: {
    display: "flex",
    justifyContent: "space-between",
  }
};
