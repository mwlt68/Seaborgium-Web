import { ErrorPageWithLottie } from "../error-page/ErrorPageWithLottie";
import { CenterPageLoading } from "../page-loading/PageLoading";
import SideBar from "./SideBar";

type Props = {
  children: any;
  isLoading: boolean;
  errorMessage?: string|null|undefined;
};


export function AdvancedSideBar(props: Props) {
  return (
    <SideBar>
      <CenterPageLoading isLoading={props.isLoading}>
        <ErrorPageWithLottie message={props.errorMessage}>
          {props.children}
        </ErrorPageWithLottie>
      </CenterPageLoading>
    </SideBar>
  );
}
