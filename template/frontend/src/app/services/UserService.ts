import { Injectable } from '@angular/core';
import { BaseService } from './core/BaseService';
import UserModel from '../models/UserModel';
import { HttpClient } from '@angular/common/http';
import { PageModel } from '../models/core/PageModel';

@Injectable()
export default class UserService extends BaseService<UserModel, string> {

    constructor(protected override _http: HttpClient) {
        super(_http);
    }

    public Insert(user : UserModel)
    {
        return super.insert(user,"Users");
    }

    public Update(id: string, user : UserModel)
    {
        return super.update(id, user, "Users/"+id);
    }

    public Delete(id: string)
    {
        return super.delete(id, "Users");
    }

    public DeleteById(id : string)
    {
        return super.delete(id, "Users");
    }

    public GetById(id: string) 
    {
        return super.findById(id, "Users");
    }

    public GetAll(model: PageModel) 
    {
        return super.getAll(`Users?Page=${model.page}&Size=${model.size}&Order=${model.order}`);
    }


}