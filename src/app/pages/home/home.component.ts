import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featuredArray:any;
  latestPostArray:any;

  constructor(private postService:PostService){

  };

  ngOnInit(): void {
    this.postService.loadFeatured().subscribe(val =>{
      // console.log(val);
      this.featuredArray = val;
      
    })

    this.postService.loadLatest().subscribe(val =>{
      this.latestPostArray=val;
    })
  }



}
