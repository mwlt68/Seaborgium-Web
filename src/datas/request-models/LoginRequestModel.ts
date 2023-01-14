import { BaseRequestModel } from "./BaseRequestModel";

export class LoginRequestModel extends BaseRequestModel{
    username?:string;
    password?:string;
    constructor(username:string,password:string){
        super();
        this.username=username;
        this.password=password;
    }
}