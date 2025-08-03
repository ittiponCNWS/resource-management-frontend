import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../src/app/service/auth.service';
import { tap, timeout } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastService);
  if (authService.isLoggedIn()) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return next(clonedReq).pipe(
      tap({
        error: (err: any) => {
          if (err.status === 401) {
            // don't have a valid token
            authService.deleteToken();
            setTimeout(() => {
              toastr.showInfo('Please login again, Session Expired!');
            }, 1500);
            router.navigateByUrl('/login');
          } else if (err.status === 403) {
            toastr.showError("Oops! It seems you're not authorize to perform the action.");
          }
        },
      })
    );
  }
  return next(req);
};
