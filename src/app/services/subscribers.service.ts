import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private afs:AngularFirestore) { }

  addSubs(subdata:any){
      this.afs.collection('subscribers').add(subdata).then(()=>{
        console.log('Subscribers saved Successfully..');
        
      })
  }

  checksubs(subEmail:any){
    return this.afs.collection('subscribers',ref => ref.where('email','==',subEmail)).get();
  }
}
