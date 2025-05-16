import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule,
    MatIconModule, MatTableModule, FormsModule,RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  constructor(private customerService: CustomerService, private snackBar: MatSnackBar){}

  orders: any[] = [];
  cartItems: any;
  

  ngOnInit(){
    this.getAllOrders();
  }

  getAllOrders() {
    this.customerService.getAllOrders().subscribe(res => {
      if(res.length != 0){
        this.orders = res;
      }
      else{
        this.snackBar.open("No active orders", "Close", {duration: 5000});
      }
    })
  }

  
      
}
