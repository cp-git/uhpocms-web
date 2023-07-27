import { Injectable } from '@angular/core';
import { AppService } from 'app/app.service';
import { Quiz } from 'app/class/quiz';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SharedDataServiceService {
  inactData: any[] = [];;
  
  constructor(private _appService: AppService){}
  actInactquizs: Quiz[] = [];

  loadInactQuizzes(): Promise<any> {
    return new Promise<void>((resolve) => {
      // Replace the following setTimeout with your actual code to fetch inactive quizzes
      setTimeout(() => {
        // Simulating fetching of data (replace this with actual API call)
        this._appService.fetchAllActInactQuizs().subscribe(
          (response) => {
            this.actInactquizs = response;
            console.log("inside  loadActInacQuizs() ")
            sessionStorage.setItem('actinacquiz', JSON.stringify(this.actInactquizs));
            resolve();
          },
          (error) => {
            sessionStorage.setItem('actinacquiz', '');
            resolve();
          }
        );
         this.actInactquizs
        sessionStorage.setItem('inactquiz', JSON.stringify(  this.actInactquizs));

       
      }, 1000); // Simulating delay of 1 second for fetching data
    });
  }
  private refreshDataSubject: Subject<void> = new Subject<void>();

  // Function to emit a value to refresh data in app.component.ts
  triggerDataRefresh() {
    this.refreshDataSubject.next();
  }

  // Function to subscribe to the refreshDataSubject
  onDataRefresh() {
    return this.refreshDataSubject.asObservable();
  }
}
