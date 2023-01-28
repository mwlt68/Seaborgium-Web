import { BaseResponseModel } from "../../datas/response-models/BaseResponseModel";
import { ProductResultModel } from "../../datas/response-models/ProductResultModel";
import { ApiBaseService } from "./ApiBaseService";

export class ProductApiService extends ApiBaseService{
    static readonly path:string = "api/products/all";
    static async GetProducts() : Promise<BaseResponseModel<ProductResultModel[] | null>> {
        var response =  await this.Get<ProductResultModel[]>(this.path);
        return response;
    }
}