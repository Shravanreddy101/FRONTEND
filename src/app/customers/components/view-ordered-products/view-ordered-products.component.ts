import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-ordered-products',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule,
    MatIconModule,MatButton, ],
  templateUrl: './view-ordered-products.component.html',
  styleUrl: './view-ordered-products.component.scss'
})
export class ViewOrderedProductsComponent {


  orderId: any;
  productList = [];
  order: any;
  totalAmount: any;
  
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private customerService: CustomerService, private router: Router, private activatedRoute: ActivatedRoute){}
  

  ngOnInit(){
    this.orderId = this.activatedRoute.snapshot.paramMap.get('orderId');
    this.viewOrder();
  }
  
  viewOrder() {
    this.customerService.viewOrderedProducts(this.orderId).subscribe(res =>{
      res.productDTOList.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.productList.push(element);
      });
      this.totalAmount = res.orderAmount;
    });
  }

  Review(id: number) {
  this.router.navigateByUrl(`/customers/review/${id}`);
}
}
