import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCellDef, MatHeaderRowDef, MatRowDef, MatTable, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-coupons',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule,
    MatIconModule, MatTableModule],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent {

coupons: any;

constructor(private adminService: AdminService, private snackBar: MatSnackBar, private fb: FormBuilder){}

ngOnInit(){
  this.getAllCoupons();
}

getAllCoupons(){
  this.adminService.getAllCoupons().subscribe(res => {
    this.coupons = res;
    
  })
}


}
