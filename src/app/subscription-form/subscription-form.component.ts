import { Component } from '@angular/core';
import { Subscription } from '../models/subscription';
import { SubscribersService } from '../services/subscribers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent {

  isEmailError:boolean = false;
  isSubscribed:boolean = false;

  constructor(private subService:SubscribersService,private toastr:ToastrService){}

  onSubmit(formVal:any){
    // console.log(formVal);
      const subData:Subscription = {
        name:formVal.name,
        email:formVal.email
      }

      // this.subService.addSubs(subData);
      this.subService.checksubs(subData.email).subscribe(val=>{
        console.log(val);
        if(val.empty){
          this.subService.addSubs(subData);
          this.isSubscribed = true;
          // this.isEmailError=false;
          this.toastr.success('Subscribed successfully..');
        }else{
          console.log('Already in use');
          this.isEmailError = true;
          this.toastr.warning('Email Already in use..');
        }
      })
  }
}
