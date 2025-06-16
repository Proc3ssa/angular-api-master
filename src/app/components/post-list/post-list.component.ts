import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostStoreService } from '../../services/post-store.service';
import { ApiService, Post } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';


@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  error = '';
  currentPage = 1;
  totalPages = 10; 


  constructor(private api: ApiService, private store: PostStoreService) {}

  ngOnInit(): void {
  this.loadPage(1);
}

loadPage(page: number) {
  this.loading = true;
  this.currentPage = page;

  this.api.getPaginatedPosts(page).subscribe({
    next: (data) => {
      this.posts = data;
      this.loading = false;
    },
    error: (err) => {
      this.error = err.message || 'Failed to load posts';
      this.loading = false;
    }
  });
}

}
