import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Post} from '../../services/api.service';
import { Comment } from '../../models/comment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post: Post | null = null;
  comments: Comment[] = [];
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getPost(id).subscribe({
      next: (data) => this.post = data,
      error: (err) => this.error = err.message
    });

    this.api.getPostComments(id).subscribe({
      next: (data) => {
        this.comments = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}
