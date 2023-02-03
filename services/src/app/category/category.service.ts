import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly categoryUrl: string;
  constructor(private _http: HttpClient) {
    this.categoryUrl = environment.categoryUrl;
  }

  _getAllCategorys(): Observable<any> {
    return this._http.get<any>("http://localhost:8090/category/uhpocms/category?category=all");
  }
}
