import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  userData = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  };

  credentials = {
    username: '',
    password: ''
  };


  isLoginModalOpen = false;
  isRegisterModalOpen = false;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if the 'register' query parameter is true
    this.route.queryParams.subscribe(params => {
      if (params['register'] === 'true') {
        // Open the register modal
        this.openRegisterModal();
      }
    });
  }

  // Open login modal
  openLoginModal() {
    this.isLoginModalOpen = true;
    this.isRegisterModalOpen = false;
  }

  // Open register modal
  openRegisterModal() {
    this.isRegisterModalOpen = true;
    this.isLoginModalOpen = false;
  }

  // Close both modals
  closeModal() {
    this.isLoginModalOpen = false;
    this.isRegisterModalOpen = false;
  }

  // Go to chat route
  goToChat() {
    this.router.navigate(['/chat']);
  }

  // Go to home route
  goToHome() {
    this.router.navigate(['/home']);  // Ensure '/home' is the correct path
  }

  // Register method
  register(userData: { username: string; first_name: string; last_name: string; email: string; password: string }) {
    this.authService.register(userData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        // Redirect to the login page after successful registration
        this.closeModal();
        this.openLoginModal();
        this.router.navigate(['/home']); // Optional, you can navigate elsewhere if needed
      },
      (error) => {
        // Handle the error
        console.error('Registration error:', error);
        this.errorMessage = error?.error?.message || 'Registration failed. Please try again.';
      }
    );
  }

  // Login method
  login(credentials: { username: string, password: string }) {
    this.authService.login(credentials).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        this.authService.saveToken(response.token);  // Save the token to local storage
        this.router.navigate(['/chat']); // Redirect to chat after successful login
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = error?.error?.message || 'Login failed. Please try again.';
      }
    );
  }

  // Get all users (if needed for some functionality)
  get() {
    this.authService.getUsers().subscribe((response: any) => {
      console.log('Fetched users:', response);
    });
  }

  
}
