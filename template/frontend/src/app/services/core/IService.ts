import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/core/ApiReponse';
import { ApiSingleResponse } from '../../models/core/ApiSingleResponse';


export interface IService<T, ID> {
   insert(t: T ,action: string) : Observable<ApiSingleResponse<T>>;
   update(id: ID, t: T, action: string) : Observable<ApiSingleResponse<T>>;
   findById(id: ID, action: string) : Observable<ApiSingleResponse<T>>;
   findAll(t : T, action: string) : Observable<T[]>;
   getAll(action: string) : Observable<ApiResponse<T>>;
   delete(id: ID, action: string) : Observable<any>;
}