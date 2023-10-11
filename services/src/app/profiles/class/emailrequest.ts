export class EmailRequest{
    [x: string]: string;
    to!: string;
    subject!: string;
    text!: string;
}