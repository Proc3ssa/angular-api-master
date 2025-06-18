import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService} from '../../services/api.service';
import { Comment } from '../../models/comment';
import { RouterLink } from '@angular/router';
import { PostStoreService } from '../../services/post-store.service';


@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post: Comment | null = null;
  comments: Comment[] = [];
  loading = true;
  error = '';

  constructor(
  private route: ActivatedRoute,
  private api: ApiService,
  private store: PostStoreService
) {}


 ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));

  const localPost = this.store.getPostsSnapshot().find(p => p.id === id);

  if (localPost) {
    this.post = localPost;
    this.loadComments(id); // ✅ still load comments
    this.loading = false;
  } else {
    this.api.getPost(id).subscribe({
      next: (data) => {
        this.post = data;
        this.loadComments(id);
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load post.';
        this.loading = false;
      }
    });
  }
}

private loadComments(postId: number) {
  this.api.getPostComments(postId).subscribe({
    next: (data) => this.comments = data,
    error: (err) => {
      this.error = err.message || 'Failed to load comments.';
    }
  });
}


}
