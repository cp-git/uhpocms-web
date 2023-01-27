import { commonEnv } from "./environment.common";

export const environment = {
    ...commonEnv,
    production: false,
    departmentUrl: `${commonEnv.baseUrl}/department/uhpocms`,
    adminInstitutionUrl: `${commonEnv.baseUrl}/admininstitution/uhpocms`,
    instituteAdmin: `${commonEnv.baseUrl}/instituteadmin/uhpocms`,
    authUserUrl: `${commonEnv.baseUrl}/authuser/uhpocms`,
    categoryUrl: `${commonEnv.baseUrl}/category/uhpocms`,
    courseUrl: `${commonEnv.baseUrl}/course/uhpocms`,
    emailUrl: `${commonEnv.baseUrl}/email/uhpocms`,
    moduleUrl: `${commonEnv.baseUrl}/module/uhpocms`,
    quizUrl: `${commonEnv.baseUrl}/quiz/uhpocms`,
    adminRoleUrl: `${commonEnv.baseUrl}/adminrole/uhpocms`,
    questionUrl: `${commonEnv.baseUrl}/question/uhpocms`,
};