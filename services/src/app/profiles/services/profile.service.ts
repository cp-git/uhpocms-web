import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Profile } from '../class/profile';
import { DataServiceCache } from 'app/cache/service/data-service.service';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileUrl: string;

  constructor(private http: HttpClient, private cache: DataServiceCache) {
    this.profileUrl = `${environment.instituteAdminUrl}/profile`;
  }

  getAllProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.profileUrl}?firstName=all`);
  }

  addProfile(formData: FormData): Observable<Profile> {
    return this.http.post<Profile>(`${this.profileUrl}`, formData);
  }

  deleteProfile(firstName: string): Observable<any> {
    return this.http.delete<any>(`${this.profileUrl}}/profile/${firstName}`);
  }

  updateProfile(roleName: string, admin: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.profileUrl}/${roleName}`, admin);
  }

  saveProfileByActiveAuthuser(authUserId: any, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.profileUrl}/${authUserId}`, formData);
  }


  updateProfileByActiveAuthuser(authUserId: any, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.profileUrl}/updatedelete/${authUserId}`, formData);
  }


  deleteProfileByActiveAuthuser(authUserId: any, profile: Profile): Observable<any> {
    return this.http.put<any>(`${this.profileUrl}/delete/${authUserId}`, profile);
  }


  getAllDeactivatedProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.profileUrl}?firstName=inactive`);
  }

  activateProfile(adminId: number): Observable<Profile> {
    return this.http.patch<Profile>(`${this.profileUrl}/activate/${adminId}`, {});
  }



  getProfileByRoleAndInstitutionId(userRole: string, instId: number): Observable<any> {

    const cachedData = this.cache.getDataFromCache(`${this.profileUrl}/${userRole}/${instId}`);
    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get<any>(`${this.profileUrl}/${userRole}/${instId}`).pipe(
      //   tap(data => this.cache.setDataInCache(`${this.courseProgressUrl}/courseprog?id=all`, data))
      // );

      tap(data => {
        // Update cache with new data
        this.cache.removeFromCache(`${this.profileUrl}/${userRole}/${instId}`)
        this.cache.setDataInCache((`${this.profileUrl}/${userRole}/${instId}`), data);
      })
    );

  }


  getProfileByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.profileUrl}/userId/${userId}`);
  }

  getProfileByAdminId(adminId: number): Observable<any> {
    return this.http.get<any>(`${this.profileUrl}/id/${adminId}`);
  }
}
