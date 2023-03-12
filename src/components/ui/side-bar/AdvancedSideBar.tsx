import { AlertColor } from "@mui/lab";
import { useState } from "react";
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
        closeHandle={props.alertCloseHandler ?? new Function()}
        severity={props.alertColor}
      />
    </>
  );
}
