import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'app/video';

@Component({
  selector: 'app-teacher-video',
  templateUrl: './teacher-video.component.html',
  styleUrls: ['./teacher-video.component.css']
})
export class TeacherVideoComponent {

  constructor(private _route: Router) { }

  //videoUrl = './../../assets/video.mp4';

  @HostListener('window:contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
  }

  file() {
    this._route.navigate(['file']);
  }

  ngOnInit() {

  }
  videos: Video[] = [
    { id: 1, src: './../../assets/video.mp4', title: 'Video 1' },
    { id: 2, src: '../../../assets/ThinkBig.mp4', title: 'Video 2' },
  ];

}

