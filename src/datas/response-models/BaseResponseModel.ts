import { BaseResultModel } from "./BaseResultModel";
import { ValidationErrorResponseModel } from "./ValidationErrorResponseModel";


type NullableBaseResultModel = BaseResultModel | null | boolean;

export class BaseResponseModel<Model extends NullableBaseResultModel> {
    hasException : boolean;
    exceptionContent? : string;
    result? : Model;
    constructor(hasException : boolean,result? : Model,exceptionContent? : string){
        this.result = result;
        this.hasException = hasException;
        this.exceptionContent = exceptionContent;
    }
    static fromError (error?:string){
        return new BaseResponseModel<null>(true,null,error);
    }
    static fromValidationErrors (validationError: ValidationErrorResponseModel):BaseResponseModel<null> {
        const errorMessage = validationError?.errors?.map(x=> x.description ).join('\r\n');
        return new BaseResponseModel(true,null,errorMessage);
    }
}