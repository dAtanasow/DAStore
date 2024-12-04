import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { catchError } from 'rxjs';
import { ErrMsgService } from './core/err-msg/err-msg.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
const { apiUrl } = environment;
const API = '/api';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials: true,
    });
  }

  const errorService = inject(ErrMsgService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (err.status == 401) {
        router.navigate(['/login']);
      } else {
        errorService.setError(err);
        router.navigate(['/error']);
      }

      return [err];
    })
  );
};
