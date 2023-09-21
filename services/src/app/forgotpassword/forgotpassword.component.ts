import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from 'app/auth-user/services/auth-user.service';
import { HomeComponent } from 'app/home/home.component';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
 emailId!: string;
 password:string ='';
 confirmPassword:string = '';
 constructor( private _activatedRoute: ActivatedRoute,private authServ:AuthUserService,
  private dialogBoxService:DialogBoxService,private _route: Router){}

  ngOnInit():void{
   this.emailId = this._activatedRoute.snapshot.params['email'];

   console.log(this.emailId)
  }

onSubmit(password:String,confirmPass:string){
  if(password === confirmPass){
  this.authServ.resetPassword(this.emailId, password).subscribe(
    (response)=>{
      // this.dialogBoxService.open('Password Changed Successfully', 'information');
      this.dialogBoxService.open('Password Changed Successfully', 'information').then(() => {
        // Navigate to the desired link after the dialog is closed
        this._route.navigate(['/']);
      });
    }
  )
}
else{
  this.dialogBoxService.open('Your password dont match confirm password', 'warning');

}
}

back(){
  this._route.navigate(['/']);
}
}
