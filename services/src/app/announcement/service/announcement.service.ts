import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { Announcement } from '../class/announcement';
import { AnnouncementTo } from '../class/announcement-to';
import { Profile } from 'app/profiles/class/profile';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  public selectedAnnouncement: Announcement;


  announcementUrl = `${environment.announcementUrl}/announcement`;

  private profileUrl: string;

  constructor(private _http: HttpClient) {
    this.selectedAnnouncement = new Announcement;
    this.profileUrl = `${environment.instituteAdminUrl}/profile`;

  }

  //////////////////////////////////////// SERVICE - FETCHING ALL ANNOUNCEMENT   //////////////////////////////////////
  fetchAllAnnouncements() {

    return this._http.get<Announcement[]>(`${this.announcementUrl}?title=all`);
  }


  //////////////////////////////// SERVICE - CREATE THE NEW ANNOUNCEMENT /////////////////////////////////////////

  insertAnnouncement(announcement: Announcement) {
    return this._http.post<Announcement>(`${this.announcementUrl}`, announcement);
  }

  ////////////////////////////// SERVICE - DELETE ANNOUNCEMENT  BY ANNOUNCEMENT ID ////////////////////////////

  deleteAnnouncementById(announcementId: number): Observable<any> {
    return this._http.delete<any>(`${this.announcementUrl}/` + announcementId);
  }




  //////////////////////////// SERVICE - SEND ANNOUCNCEMENT TO PROFILE ID  ////////////////////////////////////
  sendAnnouncementsToProfileIDs(id: number, profileIDs: number[]) {
    return this._http.post<Announcement>(`${this.announcementUrl}/send/` + id, profileIDs);
  }


  //////////////////////////////   SERVICE - FETCH ANNOUNCEMENT BY PROFILE ID  //////////////////////////////////
  //function to get announcement for particular user as per profile id --Used
  fetchAnnouncementByProfileId(profileId: number) {

    return this._http.get<Announcement[]>(`${this.announcementUrl}/profileid?id=${profileId}`);
  }



  //////////////////////    FETCH PROFILE ID BY ANNOUNCEMENT ID   ////////////////////////////////////
  fetchProfileIdsByAnnouncementId(announcementId: number): Observable<AnnouncementTo[]> {
    return this._http.get<AnnouncementTo[]>(`${this.announcementUrl}/profileid/${announcementId}`);
  }

  //////////////////////////  GET ANNOUNCEMENT BY SEND BY   /////////////////////////////////////////
  getAnnouncementBySendBy(profileId: number) {
    return this._http.get<Announcement[]>(`${this.announcementUrl}/sendby?id=${profileId}`);
  }


  ///////////////////////////////  GET STUDENT ASSIGNED TO TEACHER ///////////////////////////////////
  getStudentsAssignedToTeacher(profileId: number) {
    return this._http.get<Profile[]>(`${this.profileUrl}/profiles/${profileId}`);
  }


  //////////////////////////////////  GET ENROLLED PROFILE OF COURSES FOR ONE STUDENT   ////////////////
  getEnrolledProfilesOfCourseByOneStudentId(profileId: number): Observable<Profile[]> {
    return this._http.get<Profile[]>(`${this.profileUrl}/profiles/studentid/${profileId}`);

  }
}