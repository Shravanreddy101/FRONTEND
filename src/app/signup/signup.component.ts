import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';





@Component({
  selector: 'app-signup',
  standalone:true,
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule,
    MatIconModule,CommonModule, ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
signupForm: FormGroup;

constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private authService: AuthService, private router: Router) {
  this.signupForm = this.fb.group({
    name: ['', Validators.required],   
    email: ['', [Validators.required, Validators.email]],  
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });
}

onSubmit(): void{
  const password = this.signupForm.get('password')?.value;
  const confirmPassword = this.signupForm.get('confirmPassword')?.value;

  if(password != confirmPassword){
    this.snackBar.open('Passwords do not match.', 'Close', {duration: 5000, panelClass: 'error-snackbar'});
    return;
  }
  this.authService.register(this.signupForm.value).subscribe(
    (response) => {
      this.snackBar.open('Sign up successful !', 'Close', {duration: 5000});
      this.router.navigateByUrl("/login");
    },

    (error) => {this.snackBar.open('Sign up unsuccessful..', 'Close', {duration: 5000, panelClass: 'error-snackbar'});
    }
    
  )
}


hidePassword: boolean = true;

togglePasswordVisibility(): void {
  this.hidePassword = !this.hidePassword;
}


}
