import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  uploadFiles(uploadData: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/uhpocms/upload', uploadData);
  }
}
