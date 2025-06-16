import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { PostStoreService } from '../../services/post-store.service';


@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  title = '';
  body = '';
  error = '';

  constructor(
  private api: ApiService,
  private router: Router,
  private store: PostStoreService
) {}


  submit(): void {
    if (!this.title || !this.body) {
      this.error = 'Both fields are required.';
      return;
    }

    this.api.createPost({ title: this.title, body: this.body, userId: 1 }).subscribe({
  next: (newPost) => {
    this.store.addPost({ ...newPost, id: Date.now() }); // use Date.now() for fake unique id
    this.router.navigate(['/']);
  },

      error: (err) => {
        this.error = err.message || 'Failed to create post.';
      }
    });
  }
}
