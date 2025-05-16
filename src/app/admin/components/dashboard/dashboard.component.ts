import { Component, ElementRef, NgModule, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { CommonModule, NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule,
    MatIconModule, MatDivider, MatButton, RouterLink, FormsModule, MatFormFieldModule, MatOption, MatSelectModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  products: any[] = [];
  productId: number = null;
  OrderDTO: any = {};
  listOfCategories: any = [];
  searchProductForm! : FormGroup;
  

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private adminService: AdminService, private router: Router,){}
  

  getAllProducts(){
    this.products = [];
    this.adminService.getAllProducts().subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    })
  }


  ngOnInit(){
    this.getAllCategories();
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    });
  }

  getAllCategories(){
    this.adminService.getAllCategories().subscribe(res => {
      console.log(res);
      this.listOfCategories = res;
    })
  }

  onImageSelected(event: any, product: any) {
    const file: File = event.target.files[0];
    if (file) {
      product.imgFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        product.processedImg = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  

  saveProduct(product: any) {
    const formData = new FormData();
    formData.append('id', product.id);
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('categoryId', product.categoryId);
    if (product.imgFile) {
      formData.append('img', product.imgFile);
    }
  
    this.adminService.updateProduct(product.id, formData).subscribe({
      next: (res) => {
        this.snackBar.open('Product updated successfully!', 'Close', { duration: 5000 });
        if (product.imgFile) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            product.processedImg = e.target.result; 
          };
          reader.readAsDataURL(product.imgFile);
        } 
      },
      error: (err) => {
        this.snackBar.open('Failed to update product!', 'Close', { duration: 5000 });
        console.error(err);
      }
    });
  }
  

  resetFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';  
    }
  }
  



  submitForm(){
    const title = this.searchProductForm.get('title')!.value;
    this.products = [];
    this.adminService.getAllProductsByName(title).subscribe(res => {
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

  

  deleteProduct(productId: any) {
    this.adminService.deleteProduct(productId).subscribe(
      () => {
        this.snackBar.open('Product Deleted Successfully!', 'Close', { duration: 5000 });
        this.getAllProducts();
      },
      (error) => {
        console.error('Error deleting product', error);
        this.snackBar.open('Error deleting product!', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      }
    );
  }



}
