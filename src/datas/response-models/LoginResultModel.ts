import { BaseResultModel } from "./BaseResultModel";

export class LoginResponseModel  extends BaseResultModel {
    
    username : string;
    token : string;

    constructor(username : string,token : string){
        super();
        this.token = token;
        this.username = username
    }
}