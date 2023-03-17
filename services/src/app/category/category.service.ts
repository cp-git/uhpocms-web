import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment.development';
import { Category } from './category';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly categoryUrl: string;
  constructor(private _http: HttpClient) {
    // this.categoryUrl = "http://localhost:8090/category/uhpocms/category"
    this.categoryUrl = `${environment.categoryUrl}/category`;
  }

  _getAllCategorys(): Observable<any> {

    return this._http.get<any>(`${this.categoryUrl}/?category=all`);
  }

  insertCategory(category: Category) {
    return this._http.post<Category>(`${this.categoryUrl}`, category);
  }

  updateCategory(category: Category, categoryId: number) {
    return this._http.put<Category>(`${this.categoryUrl}/` + categoryId, category);
  }

  deleteCategory(categoryName: string) {
    return this._http.delete<Category>(`${this.categoryUrl}/` + categoryName);

    // return this._http.get<any>("http://localhost:8090/category/uhpocms/category?category=all");

  }

  getInactivecategoryList(): Observable<any> {
    return this._http.get<any>(`${this.categoryUrl}/inactive?inactivecategories=all`);
  }

  updateActiveStatus(category: string): Observable<any> {
    return this._http.patch<any>(`${this.categoryUrl}/` + category, {});
  }

  getCategoryByName(categoryName: string) {
    return this._http.get<any>(`${this.categoryUrl}/` + categoryName);
  }


}
