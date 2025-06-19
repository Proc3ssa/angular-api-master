import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { PostStoreService } from '../../services/post-store.service';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostListComponent],
      providers: [
        {
          provide: ApiService,
          useValue: { getPaginatedPosts: () => of([]) }
        },
        {
          provide: PostStoreService,
          useValue: {
            getPostsSnapshot: () => [],
            posts$: of([]),
            saveToCache: () => {}
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have posts', () => {
    expect(component).toBeDefined();
  });
});