import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone:true,
  imports: [ReactiveFormsModule, DemoAngularMaterialModule, FormsModule, CommonModule, RouterOutlet],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {

}
