import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';
import { Accesscontrol } from '../class/accesscontrol';

@Injectable({
  providedIn: 'root'
})
export class AccesscontrolService {
  accesscontrolUrl: string;

  //contructor
  constructor(private http: HttpClient) {
    //environment variable code 
    this.accesscontrolUrl = `${environment.accesscontrolUrl}`;
  }

  //service to get all data from access control table
  getAllControls(): Observable<Accesscontrol[]> {
    return this.http.get<Accesscontrol[]>(`${this.accesscontrolUrl}?id=all`);
  }

  //service to add new data
  addControls(accesscontrol: Accesscontrol): Observable<Accesscontrol> {
    return this.http.post<Accesscontrol>(`${this.accesscontrolUrl}`, accesscontrol);
  }

  //service to delete new data
  deleteControls(id: number): Observable<any> {
    return this.http.delete<any>(`${this.accesscontrolUrl}/${id}`);
  }

  //service to update the data
  updateControls(id: number, accesscontrol: Accesscontrol): Observable<Accesscontrol> {
    return this.http.put<Accesscontrol>(`${this.accesscontrolUrl}/${id}`, accesscontrol);
  }

  //service to get access control data by proving Id
  getControlsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.accesscontrolUrl}/${id}`);
  }

}
