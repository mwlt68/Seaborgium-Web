import { LoginRequestModel } from "../../datas/request-models/LoginRequestModel";
import { BaseResponseModel } from "../../datas/response-models/BaseResponseModel";
import { LoginResponseModel } from "../../datas/response-models/LoginResultModel";
import { ApiBaseService } from "./ApiBaseService";

export class AuthenticationApiService extends ApiBaseService {
  static readonly loginReqPath = "api/Authentication/login";

  static async login(
    username: string,
    password: string
  ): Promise<BaseResponseModel<LoginResponseModel | null>> {
    let loginReqModel = new LoginRequestModel(username, password);
    var result = await this.Post<LoginRequestModel, LoginResponseModel>(
      this.loginReqPath,
      loginReqModel
    );
    return result;
  }
}
