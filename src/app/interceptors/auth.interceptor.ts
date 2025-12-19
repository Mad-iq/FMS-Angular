import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
 
  if (req.url.includes('/auth/')) {
    return next(req);
  }

  if (token) {
    const cloned = req.clone({   //http reqs are immutable in angular, so cant modify then directly
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }
 
  return next(req);
};

//This HTTP interceptor automatically attaches a JWT Authorization header to all outgoing HTTP requests except 
// authentication endpoints, enabling secure access to protected backend APIs.
