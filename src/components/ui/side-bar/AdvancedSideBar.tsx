import { AlertColor } from "@mui/lab";
import { AlertSnackBar } from "../alert-snackbar/AlertSnackbar";
import { ErrorPageWithLottie } from "../error-page/ErrorPageWithLottie";
import { CenterPageLoading } from "../page-loading/PageLoading";
import SideBar from "./SideBar";

type Props = {
  children: any;
  isLoading: boolean;
  alertCloseHandler?:Function;
  errorMessage?: string | null | undefined;
  alertText?: string;
  alertColor?: AlertColor;
};
const voidFunc = ()=>{}

export function AdvancedSideBar(props: Props) {
  return (
    <>
      <SideBar>
        <CenterPageLoading isLoading={props.isLoading}>
          <ErrorPageWithLottie message={props.errorMessage}>
            {props.children}
          </ErrorPageWithLottie>
        </CenterPageLoading>
      </SideBar>
      <AlertSnackBar
        alertText={props.alertText}
        closeHandle={props.alertCloseHandler ?? voidFunc}
        severity={props.alertColor}
      />
    </>
  );
}
