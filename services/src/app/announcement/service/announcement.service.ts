import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
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

  deleteAnnouncement(announcementTitle: string) {
    return this._http.delete<Announcement>(`${this.announcementUrl}/` + announcementTitle);
  }

  sendAnnouncementsToProfileIDs(id: number, profileIDs: number[]) {
    return this._http.post<Announcement>(`${this.announcementUrl}/send/` + id, profileIDs);
  }
}