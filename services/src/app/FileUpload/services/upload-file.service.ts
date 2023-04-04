import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private uploadUrl = 'http://localhost:8090/uploadfile/uhpocms/file/upload';

  constructor(private http: HttpClient) { }

  uploadFiles(files: FileList) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.http.post(this.uploadUrl, formData, { headers });
  }
}
