import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostStoreService } from '../../services/post-store.service';
import { ApiService, Post } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';



@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent, HeaderComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  error = '';
  currentPage = 1;
  totalPages = 10; 


  constructor(
  private api: ApiService,
  private store: PostStoreService,
  private auth: AuthService,
  private router: Router
) {}



  ngOnInit(): void {
  this.loadPage(1);
}

       

clearCache() {
  this.store.clearCache();
  this.loadPage(this.currentPage);
}


loadPage(page: number) {
  this.loading = true;
  this.currentPage = page;

  const cached = this.store.getFromCache(page);
  if (cached) {
    this.posts = cached;
    this.loading = false;
    return;
  }
  

  this.api.getPaginatedPosts(page).subscribe({
    next: (data) => {
      this.store.saveToCache(page, data);
      this.posts = data;
      this.loading = false;
    },
    error: (err) => {
      this.error = err.message || 'Failed to load posts';
      this.loading = false;
    }
  });
}

logout(): void {
  this.auth.logout();
  this.router.navigate(['/login']);
}



}
