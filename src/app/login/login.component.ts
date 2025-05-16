import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule,
    MatIconModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
loginForm: FormGroup;

constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private authService: AuthService, private router: Router) {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],  
    password: ['', Validators.required]
  });
}

hidePassword: boolean = true;

togglePasswordVisibility(): void{
  this.hidePassword = !this.hidePassword;
}

onSubmit(): void{
const username = this.loginForm.get('email')?.value;
const password = this.loginForm.get('password')?.value;

this.authService.login(username, password).subscribe(
  (res) => {
    if(UserStorageService.isAdminLoggedIn()){
      this.router.navigateByUrl("admin/dashboard");
    } else if(UserStorageService.isCustomerLoggedIn()){
      this.router.navigateByUrl("customers/dashboard");
    }
  },
  (error) => {
    this.snackBar.open('Bad credentials', 'ERROR', {duration: 5000});
  }
)
}

}
