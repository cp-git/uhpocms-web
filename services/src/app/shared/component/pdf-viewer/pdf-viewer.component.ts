import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { LoginauthComponent } from 'app/authlogin/components/loginauth.component';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent {
  @Input() blobUrl: string = '';
  @Output() savePDFProgress: EventEmitter<{ progressedPageNumber: number, totalNumPages: number }> = new EventEmitter();

  url: any;
  // zoom: number = 0.47;
  zoom: number;
  zoomPercentage: number;
  pageNumber: number;
  totalNumPages: number;

  constructor() {

    this.zoom = 0.7;
    this.zoomPercentage = this.zoom * 100;
    this.pageNumber = 1;
    this.totalNumPages = 0;
  }

  ngOnInit() {
    // this.fetchFile();
  }

  previousPageNumber: number = 1;
  progressedPageNumber: number = 1;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['blobUrl']) {
      this.calculateTotalPages(this.blobUrl);
    }
  }

  ngDoCheck() {
    if (this.pageNumber !== this.previousPageNumber) {
      this.previousPageNumber = this.pageNumber;
      this.onPageNumberChange();
    }
  }

  onPageNumberChange() {
    if (this.pageNumber >= this.progressedPageNumber && this.pageNumber <= this.totalNumPages) {
      this.progressedPageNumber = this.pageNumber;

      const progressData = {
        progressedPageNumber: this.progressedPageNumber,
        totalNumPages: this.totalNumPages
      }
      this.savePDFProgress.emit(progressData);
    }

    // if (this.progressedPageNumber >= this.totalNumPages) {
    // console.log("done");


    // }

    // Your custom function to be called when the local variable changes
    console.log('progress changed:', this.progressedPageNumber);
  }



  // fetchFile() {
  //   // fetch the PDF file and create the blob URL
  //   this.http.get('http://localhost:8080/uhpocms/files', { responseType: 'arraybuffer' })
  //     .subscribe((response: any) => {
  //       console.log(response);

  //       const blob = new Blob([response], { type: 'application/pdf' });
  //       this.url = URL.createObjectURL(blob);

  //       this.calculateTotalPages(this.url);
  //     });
  // }

  calculateTotalPages(url: any) {
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument(url);
    // Access the Promise that resolves to the PDF document
    loadingTask.promise.then((pdf: pdfjsLib.PDFDocumentProxy) => {
      // Get the total number of pages in the document
      this.totalNumPages = pdf.numPages;
    });

  }

  // method will be called when user change percentage manually
  onChangeZoomPercentage(event: any) {
    this.zoom = event / 100;
  }

  // For zoom in Page
  zoomIn() {
    this.zoom += 0.1;
    this.zoomPercentage = Math.round(this.zoom * 100);
    // this.pdfViewer.zoomIn();
  }

  // For zoom out Page
  zoomOut() {
    this.zoom -= 0.1;
    this.zoomPercentage = Math.round(this.zoom * 100);
    // this.pdfViewer.zoomOut();
  }

  // For next Page
  nextPage() {
    if (this.pageNumber < this.totalNumPages) {
      this.pageNumber++;
    }
  }

  // For Previous Page
  prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
    }
  }

  // For set default zoom value
  fitToPage() {
    this.zoom = 0.7;
    this.zoomPercentage = Math.round(this.zoom * 100);

  }

}
