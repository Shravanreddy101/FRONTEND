import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CustomerService } from '../../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule,
    MatIconModule,  MatButton, ],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent {
constructor(private customerService: CustomerService, private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router, public dialog: MatDialog){}

orderForm! : FormGroup;

  ngOnInit(){
    this.orderForm = this.fb.group({
    address: [null, [Validators.required]],
    orderDescription: [null]
    })
  }

  placeOrder(){
    this.customerService.placeOrder(this.orderForm.value).subscribe(res => {
      if(res.id != null){
        this.snackBar.open("Order placed successfully!", "Close", {duration: 5000})
        this.router.navigateByUrl("/customers/orders");
        this.closeForm();
      }else{
        this.snackBar.open("Something went wrong", "Close", {duration: 5000})
      }
    })
  }

  closeForm(){
    this.dialog.closeAll();
  }



}
