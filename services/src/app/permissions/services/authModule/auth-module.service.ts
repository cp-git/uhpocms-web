import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModule } from 'app/permissions/class/auth-module';
import { environment } from 'environments/environment.development';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthModuleService {
  authModules: AuthModule[] = [];

  private accessPrivilegeUrl = environment.accessPrivilegeUrl;
  constructor(private http: HttpClient) { }

  getAllAuthModules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.accessPrivilegeUrl}/modules`);

  }

  addAuthModule(authModule: AuthModule): Observable<AuthModule[]> {
    return this.http.post<AuthModule[]>(`${this.accessPrivilegeUrl}/module`, authModule);

  }

  updateAuthModule(moduleId: number, authModule: AuthModule): Observable<AuthModule[]> {
    return this.http.post<AuthModule[]>(`${this.accessPrivilegeUrl}/modules`, authModule);

  }

  deleteAuthModule(moduleId: number): Observable<AuthModule> {
    return this.http.delete<AuthModule>(`${this.accessPrivilegeUrl}/module/${moduleId}`);
  }
}
