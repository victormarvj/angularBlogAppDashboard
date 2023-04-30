import { Component, OnInit } from '@angular/core';
import { IPostData } from 'src/app/models/post-data';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  postArray: IPostData<any>[] = [];

  constructor( private postService: PostsService ) { }

  ngOnInit(): void {
      this.postService.loadData().subscribe(val => {
        this.postArray = val;
      })
  }

  onDelete(postImgPath: string, id: string) {
    this.postService.deleteImage(postImgPath, id);
  }

  onFeatured(id: string, value: boolean) {
    const featuredData = {
      isFeatured: value
    }

    this.postService.markFeatured(id, featuredData);
  }

}
