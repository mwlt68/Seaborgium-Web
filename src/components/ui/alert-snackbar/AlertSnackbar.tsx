import { Alert, AlertColor, Snackbar } from "@mui/material";

type Props = {
  alertText?: string;
  closeHandle: Function;
  severity?: AlertColor;
  autoHideDuration?: number;
}

export function AlertSnackBar(props:Props) {
    return (
      <Snackbar
        open={props.alertText != null}
        autoHideDuration={props.autoHideDuration ?? 4000}
        onClose={(e) => props.closeHandle()}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={props.severity ?? "error"}
          sx={{ width: "100%", whiteSpace: "pre-line" }}
        >
          {props.alertText}
        </Alert>
      </Snackbar>
    );
}