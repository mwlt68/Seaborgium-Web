import { LoginRequestModel } from "../../datas/request-models/LoginRequestModel";
import { BaseResponseModel } from "../../datas/response-models/BaseResponseModel";
import { LoginResponseModel } from "../../datas/response-models/LoginResultModel"
import { ApiBaseService } from './ApiBaseService';

export class UserApiService extends ApiBaseService {
    
    static readonly registrationReqPath = "api/users/registration";
    
    static async register(username:string,password:string) :Promise<BaseResponseModel<LoginResponseModel|null>>{
        debugger
        let registrationReqModel = new LoginRequestModel(username,password);
        var result = await this.Post<LoginRequestModel,LoginResponseModel>(this.registrationReqPath,registrationReqModel);
        return result;
    }
}