import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly categoryUrl: string;
  constructor(private _http: HttpClient) {
    this.categoryUrl = environment.categoryUrl;
  }

  _getAllCategorys(): Observable<any> {
    return this._http.get<any>(`${this.categoryUrl}/category?category = all`);
  }
}
