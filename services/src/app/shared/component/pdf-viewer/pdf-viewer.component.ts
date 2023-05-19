import { Component, Input, SimpleChanges } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent {
  @Input() blobUrl: string = '';

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['blobUrl']) {
      this.calculateTotalPages(this.blobUrl);
    }
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
