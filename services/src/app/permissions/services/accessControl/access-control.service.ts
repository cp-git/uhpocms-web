import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessControl } from 'app/permissions/class/access-control';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessControlService {
  accessControlData!: AccessControl;
  accessControls: AccessControl[] = [];
  accesscontrolUrl: string;
  //contructor
  constructor(private http: HttpClient) {
    //environment variable code 
    this.accesscontrolUrl = `${environment.accesscontrolUrl}`;
  }

  //service to get all data from access control table
  getAllControls(): Observable<AccessControl[]> {
    return this.http.get<AccessControl[]>(`${this.accesscontrolUrl}?id=all`);
  }

  getAccessControlByUserId(userId: any) {
    let data: AccessControl = {
      "id": 1,
      "userId": userId,
      "authUser": true,
      "adminInstitute": true,
      "role": true,
      "department": false,
      "announcement": true,
      "assignCourse": true,
      "category": true,
      "course": true,
      "email": true,
      "enrollment": true,
      "module": true,
      "question": true,
      "quiz": true,
      "moduleFile": true,
      "lessons": true,
    }
    this.accessControlData = data;
    return data;
  }
}
