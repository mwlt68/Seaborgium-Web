export abstract class ProductBaseModel {
  id?: number | undefined = undefined;
  stockQuantity: number = 0;
  name: string | null = null;
  brand: string | null = null;
  category: string | null = null;
  price: number = 0;
  constructor(
    id?: number | undefined,
    name: string | null = null,
    price: number = 0,
    brand: string | null = null,
    category: string | null = null,
    stockQuantity: number = 0
  ) {
    this.id = id;
    this.stockQuantity = stockQuantity;
    this.name = name;
    this.brand = brand;
    this.category = category;
    this.price = price;
  }
}
