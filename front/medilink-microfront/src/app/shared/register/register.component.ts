import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService } from 'src/app/Services/users.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData: any = {
    name: '',
    email: '',
    password: '',
    role: '',
    city: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }
  async handleSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.password || !this.formData.city) {
      this.showError('Please fill in all fields.');
      return;
    }
  
    const confirmRegistration = confirm('Are you sure you want to register?');
    if (!confirmRegistration) return;
  
    try {
      const response = await this.userService.register(this.formData);
      if (response.statusCode === 200) {
        this.router.navigate(['/login']);
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }
  

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
}

