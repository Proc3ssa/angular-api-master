import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostStoreService } from '../../services/post-store.service';
import { ApiService, Post } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  error = '';

  constructor(private api: ApiService, private store: PostStoreService) {}

  ngOnInit(): void {
    this.store.posts$.subscribe((data) => {
      this.posts = data;
    });

    // Only fetch from API if store is empty
    if (this.store.getPostsSnapshot().length === 0) {
      this.api.getPosts().subscribe({
        next: (data) => {
          this.store.setPosts(data);
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Failed to load posts';
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }
}
