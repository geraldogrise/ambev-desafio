import { HttpClient, HttpHeaders} from '@angular/common/http';
import { IService } from './IService';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../models/core/ApiReponse';
import { ApiSingleResponse } from '../../models/core/ApiSingleResponse';

export abstract class BaseService<T, ID> implements IService<T, ID> {
    
    private _url : string;
    private headers: HttpHeaders =  new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Access-Control-Allow-Origin':'*'
    });;
    constructor(
        protected _http: HttpClient,
      ) {
        this._url = environment.urlApi;
      }

      insert(t: T, action: string =""): Observable<ApiSingleResponse<T>> {
        return this._http.post<ApiSingleResponse<T>>(this._url+action, JSON.stringify(t),{  headers: this.headers});
      }

      update(id: ID, t: T, action: string =""): Observable<ApiSingleResponse<T>> {
        return this._http.put<ApiSingleResponse<T>>(this._url+action, JSON.stringify(t),{  headers: this.headers});
      }

      findById(id: ID,action: string =""): Observable<ApiSingleResponse<T>> {
        return this._http.get<ApiSingleResponse<T>>(this._url+action + "/" + id,{  headers: this.headers});
      }

      findBy(id: ID, action: string =""): Observable<T[]> {
        return this._http.get<T[]>(this._url+action + "?id=" + id,{  headers: this.headers});
      }

      findAll(t : any, action: string =""): Observable<T[]> {
        return this._http.post<T[]>(this._url+action, JSON.stringify(t),{headers: this.headers});
      }

      getAll(action: string): Observable<ApiResponse<T>> {
        return this._http.get<ApiResponse<T>>(this._url + action, { headers: this.headers });
      }

      delete(id: any, action: string): Observable<T> {
        return this._http.delete<T>(this._url+action+"/"+id,{  headers: this.headers});
      }
}