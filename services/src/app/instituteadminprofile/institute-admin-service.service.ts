import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { InstituteAdmin } from './institute-admin';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class InstituteAdminServiceService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  private _baseUrl: string;
  private _admininstitutionUrl: string;

  public username: string = "uhpocadmin";
  public password: string = "Pa55w0rd";


  constructor(private _http: HttpClient) {
    this._baseUrl = `${environment.instituteAdmin}/profile`;
    this._admininstitutionUrl = `${environment.adminInstitutionUrl}/institution`;

  }

  authenticationService(username: string, password: string) {
    return this.http.get(`http://localhost:8090/instituteadmin/uhpocms/basicauth`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
      }));
  }
  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username: any, password: any) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    // this._route.navigate(['demo']);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }
  _getAllAdminInstitution(): Observable<any> {
    return this.http.get<any>(this._admininstitutionUrl + "?name=all");
  }

  _getAllInstituteAdminList(): Observable<any> {

    return this.http.get<any>(this._baseUrl + "?firstName=all");
  }

  _getInstituteAdminList(firstName: string): Observable<any> {
    return this.http.get<any>(this._baseUrl + "/" + firstName);
  }

  _addInstituteAdminList(instituteAdmin: InstituteAdmin): Observable<any> {
    return this.http.post<any>(this._baseUrl + "/", instituteAdmin);
  }

  _updateInstituteAdminList(firstName: string, instituteAdmin: InstituteAdmin): Observable<any> {
    return this.http.put<any>(this._baseUrl + "/" + firstName, instituteAdmin);
  }

  _deleteInstituteAdminList(firstName: string): Observable<any> {
    return this.http.delete<any>(this._baseUrl + "/" + firstName);
  }
}
