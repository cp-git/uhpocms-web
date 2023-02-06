export class Email {
  emailId!: number | null;
  title!: string;
  subject!: string;
  content!: string;
  createdOn!: Date;
  createdBy!: Date;
  modifiedOn!: Date;
  modifiedBy!: Date;
  status!: boolean;
  readStatus!: boolean;
  attachFile!: string;
  emailIsActive!: boolean;
  emailFormId!: number;
}
