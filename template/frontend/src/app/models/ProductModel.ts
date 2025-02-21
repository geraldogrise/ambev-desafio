import { BaseModel } from "./core/BaseModel";
import { RatingModel } from "./RattingModel";

export default class ProductModel  extends BaseModel {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: RatingModel;
  
    constructor(
      id: string = '',
      title: string = '',
      price: number = 0,
      description: string = '',
      category: string = '',
      image: string = '',
      rating: RatingModel = new RatingModel()
    ) {
      super();
      this.id = id;
      this.title = title;
      this.price = price;
      this.description = description;
      this.category = category;
      this.image = image;
      this.rating = rating;
    }
  }
  