import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';
import { adminRoutes } from './admin.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone:true,
  imports: [ReactiveFormsModule, DemoAngularMaterialModule, FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
