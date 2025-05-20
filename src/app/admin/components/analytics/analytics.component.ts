import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { OrderByStatusComponent } from "./order-by-status/order-by-status.component";

@Component({
  selector: 'app-analytics',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule,
    MatIconModule, FormsModule, MatFormFieldModule, MatSelectModule, OrderByStatusComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

  data:any;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private adminService: AdminService, private router: Router,){}


  ngOnInit(){
    this.adminService.getAnalytics().subscribe(res => {
      console.log(res);
      this.data = res;
    })
  }



}
