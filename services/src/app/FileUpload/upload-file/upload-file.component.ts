import { Component } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  files!: FileList;

  constructor(private http: HttpClient) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.files = input.files;
    }
  }
  // onSubmit() {
  //   const formData = new FormData();
  //   for (let i = 0; i < this.files.length; i++) {
  //     formData.append('files', this.files[i]);
  //   }
  //   // this.http.post('http://localhost:8090/uhpocms/file/upload', formData).subscribe(response => {

  //   //   console.log(response);

  //   const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  //   this.http.post('http://localhost:8090/uhpocms/file/upload', formData, { headers }).subscribe(response => {
  //     console.log(response);
  //   });



  // }

  // ...

  onSubmit() {
    const formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append('files', this.files[i]);
    }

    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    this.http.post('http://localhost:8090/uploadfile/uhpocms/file/upload', formData, { headers }).subscribe(response => {
      console.log(response);
    });
  }
  // onSubmit() {
  //   const formData = new FormData();
  //   for (let i = 0; i < this.files.length; i++) {
  //     formData.append('files', this.files[i]);
  //   }

  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data; boundary=---------------------------1234567890');
  //   this.http.post('http://localhost:8096/uhpocms/file/upload', formData, { headers }).subscribe(response => {
  //     console.log(response);
  //   });



}



