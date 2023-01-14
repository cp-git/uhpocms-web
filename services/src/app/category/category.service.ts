import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _baseUrl: string;

  constructor(private _http: HttpClient) {
    this._baseUrl = "http://localhost:8090/category/uhpocms/category";
   }

   _getAllCategorys():Observable<any>
   {
     return this._http.get<any>(this._baseUrl+ "?category=all");
   }
}
