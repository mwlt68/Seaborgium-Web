export class ValidationErrorResponseModel{
   errors:ValidationErrorModel[]|undefined;
}

export class ValidationErrorModel {
   propertyName:string|undefined;
   description:string|undefined;
}