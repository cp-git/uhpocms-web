import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationserviceService {

  private userName = new BehaviorSubject('');
  currentUserName = this.userName.asObservable();

  constructor() { }

  updateUserName(authusername: string) {
    this.userName.next(authusername);
  }
}
