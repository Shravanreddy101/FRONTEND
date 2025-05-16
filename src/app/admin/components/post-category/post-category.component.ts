import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-category',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule,
    MatIconModule,CommonModule,],
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.scss'
})
export class PostCategoryComponent {
categoryForm: FormGroup;

constructor(private adminService: AdminService, private router: Router, private snackBar: MatSnackBar, private fb: FormBuilder){}

ngOnInit(): void{
  this.categoryForm = this.fb.group({
    name:['', Validators.required],
    description: ['', Validators.required]
  })
}

addCategory(): any{
  if(this.categoryForm.valid){
    console.log(this.categoryForm.value);
    this.adminService.addCategory(this.categoryForm.value).subscribe((res) => {
      if(res.id != null){
        this.snackBar.open('Category posted successfully !', 'Close', {duration: 5000});
        this.router.navigateByUrl("/admin/dashboard");
      }
    })
  }
  else{
    this.categoryForm.markAllAsTouched();
  }

  
  
  }
  
}
