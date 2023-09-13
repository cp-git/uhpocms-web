import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment.development';
import { Category } from '../class/category';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly categoryUrl: string;
  constructor(private _http: HttpClient) {
    this.categoryUrl = `${environment.categoryUrl}/category`;
  }


  ///////////////////////////////////////// SERVICE - FETCH ALL CATEGORY  ////////////////////////////////////////
  _getAllCategorys(): Observable<any> {

    return this._http.get<any>(`${this.categoryUrl}/?category=all`);
  }


  /////////////////////////////// SERVICE - CREATE NEW CATEGORY  ///////////////////////////////////
  insertCategory(category: Category) {
    return this._http.post<Category>(`${this.categoryUrl}`, category);
  }


  ///////////////////////////// SERVICE - UPDATE THE CATEGORY  //////////////////////////////////////
  updateCategory(category: Category, categoryId: number) {
    return this._http.put<Category>(`${this.categoryUrl}/` + categoryId, category);
  }


  /////////////////////////////// SERVICE - INACTIVE CATEGORY LIST  //////////////////////////////////
  getInactivecategoryList(): Observable<any> {
    return this._http.get<any>(`${this.categoryUrl}/inactive?inactivecategories=all`);
  }

  ////////////////////////////// SERVICE - ACTIVATE CATEGORY STATUS  //////////////////////////////////////////////
  updateActiveStatus(category: string): Observable<any> {
    return this._http.patch<any>(`${this.categoryUrl}/` + category, {});
  }




  /////////////////////////////////////////// SERVICE - DELETE CATEGORY BY ID //////////////////////////////////////
  deleteCategoryById(categoryId: number) {
    return this._http.delete<Category>(`${this.categoryUrl}/categoryId/` + categoryId);
  }

}
