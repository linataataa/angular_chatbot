import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Inject the Router service
  const router = inject(Router);
  
  // Get the authToken from localStorage
  const authToken = localStorage.getItem('authToken');

  // If the token exists, allow access
  if (authToken) {
    return true;
  } else {
    console.log("hhhh")
    // If no token, redirect to the register page
    router.navigate(['/home'], { queryParams: { register: true } });
    return false;
  }

};
