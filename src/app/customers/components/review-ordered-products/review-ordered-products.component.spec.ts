import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOrderedProductsComponent } from './review-ordered-products.component';

describe('ReviewOrderedProductsComponent', () => {
  let component: ReviewOrderedProductsComponent;
  let fixture: ComponentFixture<ReviewOrderedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewOrderedProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewOrderedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
