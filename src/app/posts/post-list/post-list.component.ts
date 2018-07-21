import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Post} from '../post.model';
import {PostsService} from '../posts.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
posts: Post[] = [];
private postsSub: Subscription;
  // posts = [
  //   {title: 'first Post', content: 'this is the firs post'},
  //   {title: 'Second Post', content: 'this is the second post'},
  //   {title: 'Third Post', content: 'this is the third post'},
  // ];



  constructor(public postsService: PostsService) {
   }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
