import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean | import('@angular/router').UrlTree {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Usuário não autenticado, redirecionando para /login');
      return this.router.parseUrl('/login');
    }
    return true;
  }
}