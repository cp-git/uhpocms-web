import { Resolve } from "@angular/router";
import { CourseProgressService } from "app/courseProgress/services/course-progress.service";

export class CourseProgressResolver implements Resolve<any>  {

    constructor(private courProgServ : CourseProgressService) {}

    resolve() {
      return this.courProgServ.getAllCourseProgress();
    }
}
