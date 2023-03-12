import { ProductRequestModel } from "../../datas/request-models/ProductRequestModel";
import { BaseResponseModel } from "../../datas/response-models/BaseResponseModel";
import { ProductResultModel } from "../../datas/response-models/ProductResultModel";
import { ContentType } from "../../utils/enums/ContentTypes";
import { ApiBaseService } from "./ApiBaseService";

export class ProductApiService extends ApiBaseService {
  static readonly getAllProductsPath: string = "api/products/all";
  static readonly getProductPath: string = "api/products";
  static readonly productInsertPath: string = "api/products/insert";
  static readonly productUpdatePath: string = "api/products/update";
  static readonly productDeletePath: string = "api/products/delete";

  static async getAll(): Promise<
    BaseResponseModel<ProductResultModel[] | null>
  > {
    var response = await this.getRequest<ProductResultModel[]>(
      this.getAllProductsPath
    );
    return response;
  }

  static async get(
    id: string
  ): Promise<BaseResponseModel<ProductResultModel | null>> {
    const paramater = new URLSearchParams({ id: id });
    var response = await this.getRequest<ProductResultModel>(
      this.getProductPath,
      paramater
    );
    return response;
  }

  static async insert(
    product: ProductRequestModel
  ): Promise<BaseResponseModel<ProductResultModel | null>> {
    var response = await this.postRequest<
      ProductRequestModel,
      ProductResultModel
    >(this.productInsertPath, product, ContentType.multipart);
    return response;
  }

  static async update(
    product: ProductRequestModel
  ): Promise<BaseResponseModel<ProductResultModel | null>> {
    var response = await this.putRequest<
      ProductRequestModel,
      ProductResultModel
    >(this.productUpdatePath, product, ContentType.multipart);
    return response;
  }

  static async delete(id: string): Promise<BaseResponseModel<boolean | null>> {
    var response = await this.deleteRequest(this.productDeletePath, id);
    return response;
  }
}
