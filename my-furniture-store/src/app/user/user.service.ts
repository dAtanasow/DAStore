import { Injectable } from '@angular/core';
import { UserForAuth, UserProfile } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Furniture } from '../types/furniture';

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
    return this.http
      .post<UserForAuth>('/api/users/login', { email, password })
      .pipe(
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
      .post<UserForAuth>('/api/users/register', {
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
    return this.http.post('/api/users/logout', {}).pipe(
      tap(() => {
        localStorage.removeItem('userId');
        this.user$$.next(null);
      })
    );
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getMyFurniture(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(`/api/users/ads`);
  }

  getCartItems(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(`/api/users/cart`);
  }

  addToCart(itemId: string): Observable<Furniture> {
    return this.http.post<Furniture>(`/api/users/cart`, { itemId });
  }

  removeFromCart(itemId: string) {
    return this.http.delete(`/api/users/cart/${itemId}`);
  }

  getAuthorById(authorId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`/api/users/${authorId}`);
  }

  getProfile(): Observable<UserProfile> {
    return this.http
      .get<UserForAuth>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  getProfileById(userId: string): Observable<UserProfile> {
    return this.http
      .get<UserForAuth>(`/api/users/profile/${userId}`)
  }

  updateProfile(data: {
    username?: string;
    email?: string;
    phone?: string;
  }): Observable<UserProfile> {
    return this.http
      .put<UserForAuth>(`/api//users/profile`, { data })
      .pipe(tap((user) => this.user$$.next(user)));
  }
}
