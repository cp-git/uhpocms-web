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


  //////////////////////////////  SERVICE - GETTING ALL PROFILE DATA - ACTIVE /////////////////////
  getAllProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.profileUrl}?firstName=all`);
  }







  /////////////////////////// SERVICE -INSERTION OF PROFILE /////////////////////////////////////////
  saveProfileByActiveAuthuser(authUserId: any, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.profileUrl}/${authUserId}`, formData);
  }

  /////////////////////////  SERVICE - UPDATE THE PROFILE ALONG WITH IMAGE ///////////////////////////////////////////
  updateProfileByActiveAuthuser(authUserId: any, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.profileUrl}/updatedelete/${authUserId}`, formData);
  }

  ///////////////////////   SERVICE - UPDATE THE PROFILE ONLY JSON DATA ////////////////////////////////////////////
  updateProfileByAuthuser(authUserId: any, profileData: Profile): Observable<any> {
    return this.http.put<any>(`${this.profileUrl}/updateprofile/${authUserId}`, profileData);
  }


  ////////////////////////  SERVICE -DELETE THE PROFILE USER ////////////////////////////////////////////////////////
  deleteProfileByActiveAuthuser(authUserId: any, profile: Profile): Observable<any> {
    return this.http.put<any>(`${this.profileUrl}/delete/${authUserId}`, profile);
  }


  ////////////////////// SERVICE - GETTING INACTIVE PROFILE //////////////////////////////////////////////////////////
  getAllDeactivatedProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.profileUrl}?firstName=inactive`);
  }


  //////////////////  SERVICE - ACTIVATING THE PROFILE USER //////////////////////////////////////////////////////
  activateProfile(adminId: number): Observable<Profile> {
    return this.http.patch<Profile>(`${this.profileUrl}/activate/${adminId}`, {});
  }



  ///////////////////  SERVICE - GET PROFILE BY ROLE AND INSTITUTION ID //////////////////////////////////////////
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



  /////////////////////////////// SERVICE- GET PROFILE BY AUTH USER ID ///////////////////////////////////////////////
  getProfileByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.profileUrl}/userId/${userId}`);
  }

  ///////////////////////////// SERVICE - GET PROFILE BY PROFILE ID /////////////////////////////////////////////////
  getProfileByAdminId(adminId: number): Observable<any> {
    return this.http.get<any>(`${this.profileUrl}/id/${adminId}`);
  }
}
