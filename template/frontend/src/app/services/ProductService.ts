import { Injectable } from '@angular/core';
import { BaseService } from './core/BaseService';
import ProductModel from '../models/ProductModel';
import { HttpClient } from '@angular/common/http';
import { PageModel } from '../models/core/PageModel';

@Injectable()
export default class ProductService extends BaseService<ProductModel, string> {

    constructor(protected override _http: HttpClient) {
        super(_http);
    }

    public Insert(product : ProductModel)
    {
        return super.insert(product, "Products");
    }

    public Update(id: string, product : ProductModel)
    {
        return super.update(id, product, "Products/"+id);
    }

    public Delete(id : string)
    {
        return super.delete(id, "Products");
    }

    public DeleteById(id : string)
    {
        return super.delete(id,"Products");
    }

    public GetById(id: string) 
    {
        return super.findById(id,  "Products");
    }

    public GetAll(model: PageModel) 
    {
        return super.getAll(`Products?Page=${model.page}&Size=${model.size}&Order=${model.order}`);
    }

    public GetCategories() 
    {
        return super.getAll("Products/categories");
    }

    public GetByCategory(category: string) 
    {
        return super.getAll("Products/categories/"+category);
    }



}