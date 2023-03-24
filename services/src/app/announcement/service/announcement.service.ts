import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { Announcement } from '../class/announcement';
import { AnnouncementTo } from '../class/announcement-to';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  public selectedAnnouncement: Announcement;

  announcementUrl = "http://localhost:8090/announcement/uhpocms/announcement"
  //announcementUrl = `${environment.announcementUrl}/announcement`;

  constructor(private _http: HttpClient) {
    this.selectedAnnouncement = new Announcement;
  }

  //function to get all announcements
  fetchAllAnnouncements() {

    return this._http.get<Announcement[]>(`${this.announcementUrl}?title=all`);
  }

  //function to get announcements by title
  fetchAnnouncementByTitle(title: string) {

    return this._http.get<Announcement[]>(`${this.announcementUrl}/` + title);
  }

  //function to create new announcement 
  insertAnnouncement(announcement: Announcement) {
    return this._http.post<Announcement>(`${this.announcementUrl}`, announcement);
  }

  //update annoncement 
  updateAnnouncement(announcement: Announcement) {
    return this._http.put<Announcement>(`${this.announcementUrl}/` + announcement.announcementTitle, announcement);
  }

  //function to delete announcement by announcement Id
  deleteAnnouncementById(announcementId: number): Observable<any> {
    return this._http.delete<any>(`${this.announcementUrl}/` + announcementId);
  }

  //function to send announcement to profile id
  sendAnnouncementsToProfileIDs(id: number, profileIDs: number[]) {
    return this._http.post<Announcement>(`${this.announcementUrl}/send/` + id, profileIDs);
  }

  //function to get announcement for particular user as per profile id
  fetchAnnouncementByProfileId(profileId: number) {

    return this._http.get<Announcement[]>(`${this.announcementUrl}/profileid?id=${profileId}`);
  }

  //function to get profile by ids based on announcement
  fetchProfileIdsByAnnouncementId(announcementId: number): Observable<AnnouncementTo[]> {
    return this._http.get<AnnouncementTo[]>(`${this.announcementUrl}/profileid/${announcementId}`);
  }
}