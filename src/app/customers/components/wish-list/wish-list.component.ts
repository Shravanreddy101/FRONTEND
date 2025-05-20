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
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-wish-list',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule,
    MatIconModule, MatDivider],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {
  

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private customerService: CustomerService, private router: Router, private route: ActivatedRoute){}

  wishList: any[] = [];
  userId: any;
  

  ngOnInit(): void{
      this.getWishList();
  }

  getWishList() {
    this.customerService.getWishList().subscribe(res => {
      console.log(res); 
      this.wishList = res;
    });
  }

  remove(id:any) {
    this.customerService.removeFromWishlist(id).subscribe(res => {
      this.snackBar.open('Product removed from wishlist!', 'Close', {duration: 5000})
      this.getWishList();
    });
  }

  
}
