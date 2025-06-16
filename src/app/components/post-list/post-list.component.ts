import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getPosts().subscribe({
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
