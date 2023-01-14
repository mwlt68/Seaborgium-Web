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
  
  readonly BaseUrl: string = "https://localhost:7175";

  async SendRequest<
    ReqModel extends NullableBaseRequestModel,
    ResModel extends NullableBaseResultModel
  >(
    method: Method,
    path: string,
    data?: ReqModel,
    params?: URLSearchParams
  ): Promise<BaseResponseModel<ResModel | null>> {
    debugger;
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
        if (response?.status === 401 || response?.status === 403) {
          AuthManager.logout();
        }
        return response.data as BaseResponseModel<ResModel>;
      })
      .catch((err: Error | AxiosError) => {
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
    return response;
  }

  Post<ReqModel extends BaseRequestModel, ResModel extends BaseResultModel>(
    path: string,
    data?: ReqModel
  ): Promise<BaseResponseModel<ResModel | null>> {
    return this.SendRequest<ReqModel, ResModel>("post", path, data);
  }

  Get<ResModel extends BaseResultModel>(
    path: string,
    params?: URLSearchParams
  ): Promise<BaseResponseModel<BaseResultModel | null>> {
    return this.SendRequest<null, ResModel>("get", path, null, params);
  }
}
