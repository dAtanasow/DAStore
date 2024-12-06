import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();
  USER_KEY = '[user]';
  user: UserForAuth | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }
  login(email: string, password: string) {
    return this.http.post<UserForAuth>('/api/login', { email, password }).pipe(
      tap((user) => {
        localStorage.setItem('userId', user._id);
        this.user$$.next(user);
      })
    );
  }

  register(
    username: string,
    email: string,
    phone: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<UserForAuth>('/api/register', {
        username,
        email,
        phone,
        password,
        rePassword,
      })
      .pipe(
        tap((user) => {
          localStorage.setItem('userId', user._id);
          this.user$$.next(user);
        })
      );
  }

  logout() {
    return this.http.post('/api/logout', {}).pipe(
      tap(() => {
        localStorage.removeItem('userId');
        this.user$$.next(null);
      })
    );
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getProfile() {
    return this.http
      .get<UserForAuth>('/api/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(data: { username?: string; email?: string; phone?: string }) {
    return this.http
      .put<UserForAuth>(`/api/profile`, { data })
      .pipe(tap((user) => this.user$$.next(user)));
  }
}
