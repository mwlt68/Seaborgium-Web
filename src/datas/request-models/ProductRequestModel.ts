import { ProductBaseModel } from "../base-models/ProductBaseModel";

export class ProductRequestModel extends ProductBaseModel {
  image?: File | null = undefined;

  constructor(productBase: ProductBaseModel, image?: File | null) {
    super(
      productBase.id,
      productBase.name,
      productBase.price,
      productBase.brand,
      productBase.category,
      productBase.stockQuantity
    );
    this.image = image;
  }
}
