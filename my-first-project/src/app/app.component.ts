import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeecrudComponent } from './employeecrud/employeecrud.component';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,EmployeecrudComponent,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-first-project';
}
