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

  static async sendRequestBase<ResponseModel>(
    method: Method,
    path: string,
    data?: any,
    params?: URLSearchParams,
    automaticUnauthRedirect: boolean = true
  ) {
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
        return response.data as ResponseModel;
      })
      .catch((err: AxiosError<any, any>) => {
        const errorStatus = err?.response?.status ?? 0;
        const errorData = err?.response?.data;
        isUnauthorized =
          automaticUnauthRedirect &&
          (errorStatus === 401 || errorStatus === 403);
        debugger;
        if (errorData != null) {
          const isBaseResponse = err instanceof AxiosError<ResponseModel, any>;
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
            return errorData as ResponseModel;
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
  static async sendRequest<
    ReqModel extends NullableBaseRequestModel,
    ResModel extends NullableBaseResultModel
  >(
    method: Method,
    path: string,
    data?: ReqModel,
    params?: URLSearchParams,
    automaticUnauthRedirect: boolean = true
  ): Promise<BaseResponseModel<ResModel | null>> {
    return this.sendRequestBase<BaseResponseModel<ResModel | null>>(
      method,
      path,
      data,
      params,
      automaticUnauthRedirect
    );
  }

  static async postRequest<
    ReqModel extends BaseRequestModel,
    ResModel extends BaseResultModel
  >(
    path: string,
    data?: ReqModel,
    automaticUnauthRedirect: boolean = true
  ): Promise<BaseResponseModel<ResModel | null>> {
    return this.sendRequest<ReqModel, ResModel>(
      "post",
      path,
      data,
      undefined,
      automaticUnauthRedirect
    );
  }

  static async putRequest<
    ReqModel extends BaseRequestModel,
    ResModel extends BaseResultModel
  >(
    path: string,
    data?: ReqModel,
    automaticUnauthRedirect: boolean = true
  ): Promise<BaseResponseModel<ResModel | null>> {
    return this.sendRequest<ReqModel, ResModel>(
      "put",
      path,
      data,
      undefined,
      automaticUnauthRedirect
    );
  }

  static async deleteRequest(
    path: string,
    id: string,
    automaticUnauthRedirect: boolean = true
  ): Promise<BaseResponseModel<boolean | null>> {
    return this.sendRequestBase<BaseResponseModel<boolean | null>>(
      "delete",
      path,
      id,
      undefined,
      automaticUnauthRedirect
    );
  }

  static async getRequest<ResModel extends BaseResultModel>(
    path: string,
    params?: URLSearchParams,
    automaticUnauthRedirect: boolean = true
  ): Promise<BaseResponseModel<ResModel | null>> {
    return this.sendRequest<null, ResModel>(
      "get",
      path,
      null,
      params,
      automaticUnauthRedirect
    );
  }
}
