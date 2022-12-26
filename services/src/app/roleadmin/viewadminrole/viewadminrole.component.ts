import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../admin';
import { AdminroleserviceService } from '../adminroleservice.service';

@Component({
  selector: 'app-viewadminrole',
  templateUrl: './viewadminrole.component.html',
  styleUrls: ['./viewadminrole.component.css']
})
export class ViewadminroleComponent {
  admin = new Admin();
  constructor(private _route: Router, private _service: AdminroleserviceService, private _activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    let roleName = this._activatedRoute.snapshot.params['roleName'];

    this._service.getAdminlist(roleName)
      .subscribe(data => {
        console.log(data)
        this.admin = data;
      }, error => console.log(error));
  
  }

  goBack(){
    this._route.navigate([''])
  }

}
