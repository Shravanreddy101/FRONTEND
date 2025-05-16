import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFAQComponent } from './post-faq.component';

describe('PostFAQComponent', () => {
  let component: PostFAQComponent;
  let fixture: ComponentFixture<PostFAQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostFAQComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
