import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink,} from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-review-ordered-products',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule,
    MatIconModule, MatTableModule, FormsModule,],
  templateUrl: './review-ordered-products.component.html',
  styleUrl: './review-ordered-products.component.scss'
})



export class ReviewOrderedProductsComponent {

productId!: number;
reviewForm: FormGroup<any>;
selectedFile: File | null;
imagePreview: string | ArrayBuffer | null;

  constructor(private customerService: CustomerService, private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit(): void {
    this.productId = this.route.snapshot.params['productId'];
    this.reviewForm = new FormGroup({
    rating: new FormControl(0),
    description: new FormControl('', Validators.required)
  });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
      reader.readAsDataURL(this.selectedFile);
  }


  submitForm(){
    const formData = new FormData();
    formData.append('description', this.reviewForm.get('description')?.value);
    formData.append('rating', this.reviewForm.get('rating')?.value);
    formData.append('img', this.selectedFile );
    formData.append('productId', this.productId.toString());
    formData.append('userId', UserStorageService.getUserId().toString());

    this.customerService.reviewProduct(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.snackBar.open("Review added successfully", "Close", {
          duration: 3000,
        });
        this.router.navigateByUrl("/customers/orders");
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open("Error adding review", "Close", {
          duration: 3000,
        });
      }
    });
  }

navigateToOrders() {
this.router.navigateByUrl("/customers/orders");
}
  
  
}
