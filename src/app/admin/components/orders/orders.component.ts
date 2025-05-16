import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { MatIconButton } from '@angular/material/button';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-orders',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule,
    MatIconModule, MatTableModule, FormsModule, MatOption, MatSelectModule, MatMenu, MatMenuItem, MatMenuTrigger ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
userOrder: FormGroup<any>;

  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private fb: FormBuilder){}
  
  orders: any;

  ngOnInit(){
    this.getAllOrders();
    this.userOrder = this.fb.group({
      username: [''],
      orderStatus: ['']
    })
  }

  getAllOrders(){
    this.adminService.getAllOrders().subscribe(res => {
      this.orders = res;
    })
  }

  getFilterOrders(){
    const usernameControl = this.userOrder.get('username');
    const orderControl = this.userOrder.get('orderStatus');
    const username = usernameControl?.value;
    const orderStatus = orderControl?.value;
    if(usernameControl?.valid || orderControl?.valid){
      this.adminService.getFilteredOrders(username, orderStatus).subscribe(res => {
        this.orders = res;
        const orderMessage = `Found  ${this.orders.length}  order(s)`;
        const filterUsername = username ? ` for ${username} ` : '';
        this.snackBar.open(orderMessage + filterUsername + ` with status: ${orderStatus || ' any'}`, "Close", {duration: 5000})
      })
    }
    else{
      this.snackBar.open("Please provide a valid username or status","Close", {duration: 5000})
    }
  }

  changeOrderStatus(orderId: number, status: string): void {
    console.log('Order ID:', orderId);
    console.log('New Status:', status); 
    this.adminService.changeOrderStatus(orderId, status).subscribe(res => {
      this.snackBar.open("Order status updated successfully!", "Close", {duration: 5000});
      this.getFilterOrders();
    });
  }
  
}
