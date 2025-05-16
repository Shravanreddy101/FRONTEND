import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule,
    MatIconModule,  MatButton, MatDivider],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

couponForm!: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private customerService: CustomerService, public dialog: MatDialog, private router: Router){}

  cartItems: any[] = [];
  order: any;

  ngOnInit(): void{
    this.couponForm = this.fb.group({
      code: [null, [Validators.required]]
    })
    this.getCart();
  }

  applyCoupon(){
    const code = this.couponForm.get('code')?.value;
    this.customerService.applyCoupon(code).subscribe({
      next: (res) => {
        this.snackBar.open('Coupon added successfully', 'Close', {duration: 5000})
        this.getCart();
      },
      error: (err) => {
        const msg = err.error?.message || 'Failed to apply coupon';
        this.snackBar.open(msg, 'Close', {duration: 5000});
      }
    });
  }

  getCart(){
    this.cartItems = [];
    this.customerService.getCartByUserId().subscribe(res => {
      this.order = res;
      res.cartItems.forEach(element => {
        element.processedImg = 'data: image/jpeg;base64,' + element.returnedImg;
        this.cartItems.push(element);
      });
    })
  }

  increaseProductQuantity(productId:any){
    this.customerService.increaseProductQuantity(productId).subscribe(res => {
        this.snackBar.open('Added 1 item to cart', 'Close', {duration: 5000})
        this.getCart();
      
      
    })
  }

  decreaseProductQuantity(productId:any){
    this.customerService.decreaseProductQuantity(productId).subscribe(res => {
        this.snackBar.open('Removed 1 item from cart', 'Close', {duration: 5000});
        this.getCart();
      
    })
  }


  placeOrder(){
    this.dialog.open(PlaceOrderComponent);
  }





}
