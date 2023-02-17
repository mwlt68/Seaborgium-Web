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
import { ValidationErrorResponseModel } from "../../datas/response-models/ValidationErrorResponseModel";
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
    automaticUnauthRedirect: boolean = true
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
      .catch((err: AxiosError<any, any>) => {
        const errorStatus = err?.response?.status ?? 0;
        const errorData = err?.response?.data;
        isUnauthorized =
          automaticUnauthRedirect &&
          (errorStatus === 401 || errorStatus === 403);
        debugger;
        if (errorData != null) {
          const isBaseResponse =
            err instanceof AxiosError<BaseResponseModel<ResModel | null>, any>;
          const isValidationError =
            err instanceof AxiosError<ValidationErrorResponseModel, any>;
          debugger;
          if (errorStatus === 400 && isValidationError) {
            debugger;
            return BaseResponseModel.fromValidationErrors(
              errorData as ValidationErrorResponseModel
            );
          } else if (isBaseResponse) {
            debugger;
            return errorData as BaseResponseModel<ResModel | null>;
          }
        }
        return BaseResponseModel.fromError(err?.message ?? "Undefined Error !");
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
    automaticUnauthRedirect: boolean = true
  ): Promise<BaseResponseModel<ResModel | null>> {
    return this.SendRequest<ReqModel, ResModel>(
      "post",
      path,
      data,
      undefined,
      automaticUnauthRedirect
    );
  }

  static async Put<
    ReqModel extends BaseRequestModel,
    ResModel extends BaseResultModel
  >(
    path: string,
    data?: ReqModel,
    automaticUnauthRedirect: boolean = true
  ): Promise<BaseResponseModel<ResModel | null>> {
    return this.SendRequest<ReqModel, ResModel>(
      "put",
      path,
      data,
      undefined,
      automaticUnauthRedirect
    );
  }

  static async Get<ResModel extends BaseResultModel>(
    path: string,
    params?: URLSearchParams,
    automaticUnauthRedirect: boolean = true
  ): Promise<BaseResponseModel<ResModel | null>> {
    return this.SendRequest<null, ResModel>(
      "get",
      path,
      null,
      params,
      automaticUnauthRedirect
    );
  }
}
