import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','./assets/css/style.css','./assets/vendor/aos/aos.css','./assets/vendor/bootstrap-icons/bootstrap-icons.css','./assets/vendor/bootstrap/css/bootstrap.min.css','./assets/vendor/boxicons/css/boxicons.min.css','./assets/vendor/glightbox/css/glightbox.min.css','./assets/vendor/swiper/swiper-bundle.min.css']
})
export class HomeComponent {
  constructor(private _route: Router) { }

  // public src="assets/videos/university_video.mp4"
  public src="assets/videos/university_video.mp4"
  _redirectToLogin(){
    this._route.navigate(['login']);
  }   
}
