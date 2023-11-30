import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  uploadUrl = `${environment.uploadFileurl}`


  constructor(private http: HttpClient) { }
  //test comment
  uploadFiles(files: FileList) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.http.post(this.uploadUrl, formData, { headers });
  }
}
