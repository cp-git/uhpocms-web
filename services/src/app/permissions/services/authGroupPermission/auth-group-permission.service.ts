import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthGroupPermission } from 'app/permissions/class/auth-group-permission';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGroupPermissionService {

  accessPrivilegeUrl = environment.accessPrivilegeUrl;

  constructor(private http: HttpClient
  ) { }

  getAllGroupPermissions(): Observable<AuthGroupPermission[]> {
    return this.http.get<AuthGroupPermission[]>(`${this.accessPrivilegeUrl}/grouppermission`)
  }

}
