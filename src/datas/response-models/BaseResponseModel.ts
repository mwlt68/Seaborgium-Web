import { BaseResultModel } from "./BaseResultModel";


type NullableBaseResultModel = BaseResultModel | null;

export class BaseResponseModel<Model extends NullableBaseResultModel> {
    hasException : boolean;
    exceptionContent? : string;
    result? : Model;
    constructor(hasException : boolean,result? : Model,exceptionContent? : string){
        this.result = result;
        this.hasException = hasException;
        this.exceptionContent = exceptionContent;
    }
}