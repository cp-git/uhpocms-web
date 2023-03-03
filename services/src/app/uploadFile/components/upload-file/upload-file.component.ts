import { Component } from '@angular/core';
import { UploadFileService } from 'app/uploadFile/services/upload-file.service';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  selectedFiles!: FileList;

  constructor(private uploadFileService: UploadFileService) { }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  onSubmit(form: any) {
    const uploadData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      uploadData.append('file', this.selectedFiles[i], this.selectedFiles[i].name);
    }

    this.uploadFileService.uploadFiles(uploadData).subscribe(
      res => console.log(res),
      err => console.error(err)
    );
    // this.http.post('http://localhost:8080/upload', uploadData).subscribe(
    //   res => console.log(res),
    //   err => console.error(err)
    // );
    form.reset();
  }


}
