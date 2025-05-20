import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../admin/service/admin.service';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule,
    MatIconModule, MatDivider, MatButton,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  products: any[] = [];
  FAQ: any[] = [];
  FAQProductId: number | null = null;

  Reviews: any[] = [];
  ReviewProductId: number | null = null;
  searchProductForm! : FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private customerService: CustomerService, private router: Router){}
  

  getAllProducts(){
    this.products = [];
    this.customerService.getAllProducts().subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    })
  }


  ngOnInit(){
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    })
  }



  submitForm(){
    const title = this.searchProductForm.get('title')!.value;
    this.products = [];
    this.customerService.getAllProductsByName(title).subscribe(res => {
      if(res.length === 0){
        this.snackBar.open('No products found with that keyword','Close',{duration:5000});
        setTimeout(() => {this.getAllProducts();}, 3000)
      }
      else{
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.products.push(element);
        });
      }
      console.log(this.products);
    })
  }


  addToCart(id:any){
    this.customerService.addToCart(id).subscribe(res => {
      this.snackBar.open('Product added to cart successfully !','Close',{duration:5000})
    })
  }

  

  toggleFAQ(id: any){
    if(this.FAQProductId == id){
      this.FAQProductId = null;
      this.FAQ = [];
    }
    else{
      this.customerService.getFAQ(id).subscribe(res => {
        console.log('Received FAQ:', res);
        this.Reviews = [];
        this.ReviewProductId = null;
        this.FAQ = res;
        this.FAQProductId = id;

      })
    }
  }


toggleReviews(id: any){
  if(this.ReviewProductId == id){
    this.ReviewProductId = null;
    this.Reviews = [];
  }
  else{
    this.customerService.getReviews(id).subscribe(res => {
      console.log('Recieved review', res)
      this.FAQ = [];
      this.FAQProductId = null;
      this.Reviews = res;
      this.ReviewProductId = id;
    })
  }
}

addProductToWishList(id:any){
  this.customerService.addProductToWishList(id).subscribe(res => {
    this.snackBar.open('Product added to WishList!', 'Close', {duration: 5000})
  })
}

remove(id:any) {
    this.customerService.removeByProductId(id).subscribe(res => {
      this.snackBar.open('Product removed from wishlist!', 'Close', {duration: 5000})
    });
  }

toggleWishList(product: any) {
  product.isFavorited = !product.isFavorited;
  if(product.isFavorited){
    this.addProductToWishList(product.id);
  }
  else{
    this.remove(product.id);
  }
  
}



}
