import axios, { AxiosError, Method } from "axios";
import {
  BaseRequestModel,
  NullableBaseRequestModel,
} from "../../datas/request-models/BaseRequestModel";
import { BaseResponseModel } from "../../datas/response-models/BaseResponseModel";
import {
  BaseResultModel,
  NullableBaseResultModel,
} from "../../datas/response-models/BaseResultModel";
import { AuthManager } from "../../utils/helpers/AuthManager";


export abstract class ApiBaseService {
  static readonly BaseUrl: string = "https://localhost:7175";
  static isBusy: boolean = false;

  static async SendRequest<
    ReqModel extends NullableBaseRequestModel,
    ResModel extends NullableBaseResultModel
  >(
    method: Method,
    path: string,
    data?: ReqModel,
    params?: URLSearchParams,
    automaticUnauthRedirect:boolean=true
  ): Promise<BaseResponseModel<ResModel | null>> {

    this.isBusy = true;
    let isUnauthorized: boolean = false;

    var response = await axios
      .request({
        baseURL: this.BaseUrl,
        url: path,
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthManager.getToken()}`,
        },
        data: data,
        params: params,
      })
      .then((response) => {
        return response.data as BaseResponseModel<ResModel>;
      })
      .catch((err: Error | AxiosError) => {
        isUnauthorized =
          automaticUnauthRedirect &&
          err instanceof AxiosError &&
          (err?.response?.status === 401 || err?.response?.status === 403);

        if (
          err instanceof AxiosError &&
          err?.response?.data?.exceptionContent != null
        ) {
          return err.response.data as BaseResponseModel<ResModel | null>;
        } else {
          return new BaseResponseModel<ResModel | null>(
            true,
            null,
            err.message
          );
        }
      });
    if (isUnauthorized) {
      AuthManager.logout();
    }
    this.isBusy = false;
    return response;
  }

  static async Post<
    ReqModel extends BaseRequestModel,
    ResModel extends BaseResultModel
  >(
    path: string,
    data?: ReqModel,
    automaticUnauthRedirect:boolean=true
  ): Promise<BaseResponseModel<ResModel | null>> {
    return this.SendRequest<ReqModel, ResModel>("post", path, data,undefined,automaticUnauthRedirect);
  }

  static async Get<ResModel extends BaseResultModel>(
    path: string,
    params?: URLSearchParams,
    automaticUnauthRedirect:boolean=true
  ): Promise<BaseResponseModel<ResModel | null>> {
    return this.SendRequest<null, ResModel>("get", path, null, params,automaticUnauthRedirect);
  }
}
