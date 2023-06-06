import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Profile } from '../class/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileUrl: string;

  constructor(private http: HttpClient) {
    this.profileUrl = `${environment.instituteAdminUrl}/profile`;
  }

  getAllProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.profileUrl}?firstName=all`);
  }

  addProfile(formData: FormData): Observable<Profile> {
    return this.http.post<Profile>("http://localhost:8092/uhpocms/profile", formData);
  }

  deleteProfile(firstName: string): Observable<any> {
    return this.http.delete<any>(`${this.profileUrl}/${firstName}`);
  }

  updateProfile(roleName: string, admin: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.profileUrl}/${roleName}`, admin);
  }

  saveOrUpdateProfile(authUserId: any, profile: Profile): Observable<any> {
    return this.http.put<any>(`${this.profileUrl}/${authUserId}`, profile);
  }

  getAllDeactivatedProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.profileUrl}?firstName=inactive`);
  }

  activateProfile(adminId: number): Observable<Profile> {
    return this.http.patch<Profile>(`${this.profileUrl}/activate/${adminId}`, {});
  }



  getProfileByRoleAndInstitutionId(userRole: string, instId: number): Observable<any> {
    return this.http.get<any>(`${this.profileUrl}/${userRole}/${instId}`);
  }


  getProfileByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.profileUrl}/userId/${userId}`);
  }

  getProfileByAdminId(adminId: number): Observable<any> {
    return this.http.get<any>(`${this.profileUrl}/id/${adminId}`);
  }
}
