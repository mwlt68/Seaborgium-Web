import { BaseResponseModel } from "../../datas/response-models/BaseResponseModel";
import { ProductResultModel } from "../../datas/response-models/ProductResultModel";
import { ApiBaseService } from "./ApiBaseService";

export class ProductApiService extends ApiBaseService{
    static readonly getAllProductsPath:string = "api/products/all";
    static readonly getProductPath:string = "api/products";
    static readonly productInsertPath:string = "api/products/insert";
    static readonly productUpdatePath:string = "api/products/update";
    
    static async GetProducts() : Promise<BaseResponseModel<ProductResultModel[] | null>> {
        var response =  await this.Get<ProductResultModel[]>(this.getAllProductsPath);
        return response;
    }
    static async GetProduct(id:string) : Promise<BaseResponseModel<ProductResultModel | null>> {
        const paramater = new URLSearchParams({id: id});
        var response =  await this.Get<ProductResultModel>(this.getProductPath,paramater);
        return response;
    }
    static async insert(product:ProductResultModel) : Promise<BaseResponseModel<ProductResultModel | null>> {
        var response =  await this.Post<ProductResultModel,ProductResultModel>(this.productInsertPath,product);
        debugger;
        return response;
    }
    static async update(product:ProductResultModel) : Promise<BaseResponseModel<ProductResultModel | null>> {
        var response =  await this.Put<ProductResultModel,ProductResultModel>(this.productUpdatePath,product);
        debugger;
        return response;
    }
}