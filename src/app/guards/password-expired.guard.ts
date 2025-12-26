import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const passwordExpiredGuard: CanActivateFn= ()=>{
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isPasswordExpired()){
    router.navigate(['/profile'], {
      queryParams: { forceChange: 'true' }
    });
    return false;
  }
  return true;
};
