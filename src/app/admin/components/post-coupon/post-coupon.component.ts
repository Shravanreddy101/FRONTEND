import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule } from '@angular/material/input';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-post-coupon',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './post-coupon.component.html',
  styleUrl: './post-coupon.component.scss'
})
export class PostCouponComponent {
couponForm: FormGroup<any>;

constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router, private snackBar: MatSnackBar ){}


ngOnInit(){
  this.couponForm = this.fb.group({
    name: [null, Validators.required],
    code: [null, Validators.required],
    discount: [null, Validators.required],
    expirationDate: [null, Validators.required]
  })
}


addCoupon(){
  if(this.couponForm.valid){
    this.adminService.addCoupon(this.couponForm.value).subscribe(res => {
      if(res.id != null){
        this.snackBar.open('Coupon added successfully!', 'Close', {duration:5000})
      }
    });
    this.router.navigateByUrl("/admin/dashboard");
  }
  else{
    this.snackBar.open('Could not add coupon', 'Close', {duration: 5000})
  }
}





}
