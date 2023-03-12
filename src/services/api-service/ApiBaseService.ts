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
import { ContentType } from "../../utils/enums/ContentTypes";
import { AuthManager } from "../../utils/helpers/AuthManager";

export abstract class ApiBaseService {

  static BaseUrl: string |undefined = process.env.REACT_APP_API_URL;
  static isBusy: boolean = false;

  static async sendRequestBase<ResponseModel>(
    method: Method,
    path: string,
    data?: any,
    params?: URLSearchParams,
    contentType?: string,
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
          "Content-Type": contentType ?? ContentType.json,
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
        if (errorData != null) {
          const isBaseResponse = err instanceof AxiosError<ResponseModel, any>;
          const isValidationError =
            err instanceof AxiosError<ValidationErrorResponseModel, any>;
          if (errorStatus === 400 && isValidationError) {
            return BaseResponseModel.fromValidationErrors(
              errorData as ValidationErrorResponseModel
            );
          } else if (isBaseResponse) {
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
    contentType?: string,
    automaticUnauthRedirect: boolean = true
  ): Promise<BaseResponseModel<ResModel | null>> {
    return this.sendRequestBase<BaseResponseModel<ResModel | null>>(
      method,
      path,
      data,
      params,
      contentType,
      automaticUnauthRedirect
    );
  }

  static async postRequest<
    ReqModel extends BaseRequestModel,
    ResModel extends BaseResultModel
  >(
    path: string,
    data?: ReqModel,
    contentType?: string,
    automaticUnauthRedirect: boolean = true
  ): Promise<BaseResponseModel<ResModel | null>> {
    return this.sendRequest<ReqModel, ResModel>(
      "post",
      path,
      data,
      undefined,
      contentType,
      automaticUnauthRedirect
    );
  }

  static async putRequest<
    ReqModel extends BaseRequestModel,
    ResModel extends BaseResultModel
  >(
    path: string,
    data?: ReqModel,
    contentType?: string,
    automaticUnauthRedirect: boolean = true
  ): Promise<BaseResponseModel<ResModel | null>> {
    return this.sendRequest<ReqModel, ResModel>(
      "put",
      path,
      data,
      undefined,
      contentType,
      automaticUnauthRedirect
    );
  }

  static async deleteRequest(
    path: string,
    id: string,
    contentType?: string,
    automaticUnauthRedirect: boolean = true
  ): Promise<BaseResponseModel<boolean | null>> {
    return this.sendRequestBase<BaseResponseModel<boolean | null>>(
      "delete",
      path,
      id,
      undefined,
      contentType,
      automaticUnauthRedirect
    );
  }

  static async getRequest<ResModel extends BaseResultModel>(
    path: string,
    params?: URLSearchParams,
    contentType?: string,
    automaticUnauthRedirect: boolean = true
  ): Promise<BaseResponseModel<ResModel | null>> {
    return this.sendRequest<null, ResModel>(
      "get",
      path,
      null,
      params,
      contentType,
      automaticUnauthRedirect
    );
  }
}
