import { Component } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFileService } from '../services/upload-file.service';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  files!: FileList;

  constructor(private uploadService: UploadFileService) { }

  onFileSelected(event: Event) {
    console.log(event);
    const input = event.target as HTMLInputElement;
    console.log(input);
    if (input && input.files) {
      this.files = input.files;
      console.log(this.files);
    }
  }

  onSubmit() {
    this.uploadService.uploadFiles(this.files).subscribe((response: any) => {
      console.log(response);
    });
  }
}



