import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-faq',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule,
    MatIconModule,CommonModule,],
  templateUrl: './post-faq.component.html',
  styleUrl: './post-faq.component.scss'
})
export class PostFAQComponent {
  productId: number;
 
  

  constructor(private adminService: AdminService, private fb: FormBuilder, private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router){}
  faqForm: FormGroup;
  
  

  ngOnInit(){
    this.productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.faqForm = this.fb.group({
    question: [null,[Validators.required]],
    answer: [null, [Validators.required]],
  })
}

  postFAQ() {
    const body = this.faqForm.value;
    this.adminService.postFAQ(this.productId,body).subscribe(res => {
      this.snackBar.open("Faq posted successfully!", "Close", {duration: 5000});
    })
    this.router.navigateByUrl("/admin/dashboard");
  } 
}
