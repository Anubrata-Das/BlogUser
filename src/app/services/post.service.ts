import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

// import * as firebase from 'firebase/compat';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afs:AngularFirestore) { }

   //loa data
   loadFeatured(){
    return this.afs.collection('posts',ref=>ref.where('isFeatured','==',true).limit(4)).snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a=>{

          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id,data}
        })
      })
    )
  }
  loadLatest(){
    return this.afs.collection('posts',ref=>ref.orderBy('createdAt')).snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a=>{

          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id,data}
        })
      })
    )
  }

  loadCategoryPosts(categoryId:any){
    return this.afs.collection('posts',ref=>ref.where('category.categoryId','==',categoryId).limit(4)).snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a=>{

          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id,data}
        })
      })
    )
  }

  loadOnePost(postId:any){
    return this.afs.doc(`posts/${postId}`).valueChanges();
  }

  loadSimilar(catId:any){
    return this.afs.collection('posts',ref=>ref.where('category.categoryId','==',catId).limit(4)).snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a=>{

          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id,data}
        })
      })
    )
  }

  countViews(postid:any){
    const viewscount = {
      views:firebase.firestore.FieldValue.increment(1)
    }
    this.afs.doc(`posts/${postid}`).update(viewscount).then(()=>{
      console.log('Count updated');
      
    })
  }
}
