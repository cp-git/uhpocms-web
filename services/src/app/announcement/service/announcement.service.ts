import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { Announcement } from '../announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private readonly announcementUrl = `${environment.announcementUrl}/announcement`;
  // private readonly announcementUrl = `http://localhost:8090/announcement/uhpocms/announcement`
  constructor(private _http: HttpClient) { }

  fetchAllAnnouncements() {
    //alert(`${this.announcementUrl}?title=all`);
    return this._http.get<Announcement[]>(`${this.announcementUrl}?title=all`);
  }

  fetchAnnouncementByTitle(title: string) {
    //alert(`${this.announcementUrl}/${title}`);
    return this._http.get<Announcement[]>(`${this.announcementUrl}/` + title);
  }

  insertAnnouncement(announcement: Announcement) {
    return this._http.post<Announcement>(`${this.announcementUrl}`, announcement);
  }

  updateAnnouncement(announcement: Announcement) {
    return this._http.put<Announcement>(`${this.announcementUrl}/` + announcement.announcementTitle, announcement);
  }

  deleteAnnouncementById(announcementId: number): Observable<any> {
    return this._http.delete<any>(`${this.announcementUrl}/` + announcementId);
  }

  sendAnnouncementsToProfileIDs(id: number, profileIDs: number[]) {
    return this._http.post<Announcement>(`${this.announcementUrl}/send/` + id, profileIDs);
  }

  fetchAnnouncementByProfileId(profileId: number) {
    // alert(`${this.announcementUrl}/profileid?id=${profileId}`);
    return this._http.get<Announcement[]>(`${this.announcementUrl}/profileid?id=${profileId}`);
  }
}