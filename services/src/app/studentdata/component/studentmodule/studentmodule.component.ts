import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleFile } from 'app/class/module-file';
import { Course } from 'app/course/course';
import { StudentService } from 'app/studentdata/service/student.service';

@Component({
  selector: 'app-studentmodule',
  templateUrl: './studentmodule.component.html',
  styleUrls: ['./studentmodule.component.css']
})
export class StudentmoduleComponent implements OnInit {

  studentId: any;
  studentModuleFile: ModuleFile[] = [];
  constructor(private activateRoute: ActivatedRoute, private studentService: StudentService) {

  }
  ngOnInit(): void {
    this.studentId = this.activateRoute.snapshot.paramMap.get('profileid');
    this.loadStudentAssignedCourses();
  }

  loadStudentAssignedCourses() {
    this.studentService.getStudentCoursesByStudentId(this.studentId).subscribe(
      response => {
        this.studentModuleFile = response;
      },
      error => {
        alert("Failed to load student course");
      }
    );
  }


}
