import { commonEnv } from './environment.common';

export const environment = {
  ...commonEnv,
  production: false,
  // departmentUrl: `${commonEnv.baseUrl}/department/uhpocms`,
  // adminInstitutionUrl: `${commonEnv.baseUrl}/admininstitution/uhpocms`,
  // instituteAdminUrl: `${commonEnv.baseUrl}/instituteadmin/uhpocms`,
  // authUserUrl: `${commonEnv.baseUrl}/authuser/uhpocms`,
  // categoryUrl: `${commonEnv.baseUrl}/category/uhpocms`,
  // courseUrl: `${commonEnv.baseUrl}/course/uhpocms`,
  // courseDepartmentUrl:'`${commonEnv.baseUrl}/course/uhpocms`,
  // emailUrl: `${commonEnv.baseUrl}/email/uhpocms`,
  // moduleUrl: `${commonEnv.baseUrl}/module/uhpocms`,
  // quizUrl: `${commonEnv.baseUrl}/quiz/uhpocms`,
  // adminRoleUrl: `${commonEnv.baseUrl}/adminrole/uhpocms`,
  // questionUrl: `${commonEnv.baseUrl}/question/uhpocms`,
  // announcementUrl: `${commonEnv.baseUrl}/announcement/uhpocms`,

  departmentUrl: `http://localhost:8090/department/uhpocms`,
  adminInstitutionUrl: `http://localhost:8090/admininstitution/uhpocms`,
  instituteAdminUrl: `http://localhost:8090/instituteadmin/uhpocms`,
  authUserUrl: `http://localhost:8090/authuser/uhpocms`,
  categoryUrl: `http://localhost:8090/category/uhpocms`,
  courseUrl: `http://localhost:8090/course/uhpocms`,
  courseDepartmentUrl: `http://localhost:8090/course/uhpocms`,
  emailUrl: `http://localhost:8090/email/uhpocms`,
  moduleUrl: `http://localhost:8080/uhpocms`,
  quizUrl: `http://localhost:8090/quiz/uhpocms`,
  adminRoleUrl: `http://localhost:8090/adminrole/uhpocms`,
  questionUrl: `http://localhost:8090/question/uhpocms`,
  announcementUrl: `http://localhost:8090/announcement/uhpocms`,
  moduleFileUrl: `http://localhost:8090/modulefile/uhpocms`,

  enrollStudentUrl: `http://localhost:8090/enrolltostudent/uhpocms`,
  assignCourseUrl: `http://localhost:8090/course/uhpocms/course`,
  syllabusUrl: `http://localhost:8090/courseSyllabus/uhpocms/courseSyllabus`,
  assignTeacherUrl: 'http://localhost:8090/assigntoteacher/uhpocms/assigntoteacher',
  accesscontrolUrl: 'http://localhost:8090/accesscontrol/uhpocms/access',
  answerUrl: 'http://localhost:8090/answer/uhpocms'


};
