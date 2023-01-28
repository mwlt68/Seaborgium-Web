import { BaseResultModel } from "./BaseResultModel";

export class ProductResultModel extends BaseResultModel {
    id:number | undefined;
    stockQuantity:number=0;
    name?:string;
    brand?:string;
    category?:string;
    price:number=0;
    
    constructor(name?:string,price:number=0,brand?:string,category?:string,stockQuantity:number=0)
    {
        super();
        this.stockQuantity=stockQuantity;
        this.name=name;
        this.brand=brand;
        this.category = category;
        this.price = price
    }
}