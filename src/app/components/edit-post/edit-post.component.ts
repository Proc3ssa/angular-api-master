import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Post } from '../../services/api.service';
import { PostStoreService } from '../../services/post-store.service';


@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  postId!: number;
  title = '';
  body = '';
  error = '';

  constructor(
  private route: ActivatedRoute,
  private api: ApiService,
  private router: Router,
  private store: PostStoreService
) {}

 ngOnInit(): void {
  this.postId = Number(this.route.snapshot.paramMap.get('id'));

  const localPost = this.store.getPostsSnapshot().find(p => p.id === this.postId);

  if (localPost) {
    this.title = localPost.title;
    this.body = localPost.body;
  } else {
    this.api.getPost(this.postId).subscribe({
      next: (post: Post) => {
        this.title = post.title;
        this.body = post.body;
      },
      error: (err) => {
        this.error = err.message || 'Could not load post.';
      }
    });
  }
}


  submit(): void {
    if (!this.title || !this.body) {
      this.error = 'Both fields are required.';
      return;
    }
    if (this.containsProfanity(this.title) || this.containsProfanity(this.body)) {
  this.error = 'Your post contains inappropriate words.';
  return;
}


    this.api.updatePost(this.postId, { title: this.title, body: this.body }).subscribe({
      next: () => this.router.navigate(['/posts', this.postId]),
      error: (err) => {
        this.error = err.message || 'Failed to update post.';
      }
    });
  }

  containsProfanity(text: string): boolean {
  const blocked = ['badword', 'damn', 'ugly', 'stupid', 'idiot', 'fuck'];
  return blocked.some(word => text.toLowerCase().includes(word));
}

}
