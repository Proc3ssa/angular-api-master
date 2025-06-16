import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';

export const routes: Routes = [
    { path: '', component: PostListComponent },
  { path: 'posts/:id', component: PostDetailsComponent }
];
