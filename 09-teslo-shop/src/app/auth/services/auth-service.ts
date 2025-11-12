import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthResponse } from '@auth/interfaces/auth.response.interface';
import { RegisterResponse } from '@auth/interfaces/register.response.interface';
import { User } from '@auth/interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

type AuthStatus = 'authenticated' | 'unauthenticated' | 'pending';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.baseURL;

  private readonly _authStatus = signal<AuthStatus>('pending');
  private readonly _user = signal<User | null>(null);
  private readonly _token = signal<string | null>(localStorage.getItem('token'));
  httpClient = inject(HttpClient);

  authStatus = computed<AuthStatus>(() => {
    if(this._authStatus() === 'pending') {
      return 'pending';
    }
    if(this._user()) {
      return 'authenticated';
    }
    return 'unauthenticated';
  });

  user = computed(() => this._user());
  token = computed(() => this._token());
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);

  authResource = rxResource({
    stream: () => {
      return this.checkStatus();
    }
  });

  login(email: string, password: string): Observable<boolean> {
    return this.httpClient.post<AuthResponse>(`${this.baseURL}/auth/login`,
      {
        email : email,
        password: password
      }
    ).pipe(
      map((response) => this.handlerAuthSuccess(response)),
      catchError((error:any) => this.handlerAuthError())
    );
  }

  register(email: string, password: string, fName: string): Observable<boolean> {
    return this.httpClient.post<AuthResponse>(`${this.baseURL}/auth/register`,
      {
        email : email,
        password: password,
        fullName: fName
      }
    ).pipe(
      map((response) => this.handlerRegisterSuccess(response)),
      catchError((error:any) => this.handlerRegisterError())
    );
  }

  checkStatus() {
    const token = localStorage.getItem('token');
    if(!token) {
      console.log('No token found');
      this.logout();
      return of(false);
    }
    return this.httpClient.get<AuthResponse>(`${this.baseURL}/auth/check-status`,
      {
        //headers: {
        //  Authorization: `Bearer ${token}`
        //} //se adiciona en el interceptor
      }
    ).pipe(
      map((response) => this.handlerAuthSuccess(response)),
      catchError((error:any) => this.handlerAuthError())
    );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('unauthenticated');
    localStorage.removeItem('token');
  }

  handlerAuthSuccess(response: AuthResponse) {
    this._user.set(response.user);
    this._token.set(response.token);
    this._authStatus.set('authenticated');
    localStorage.setItem('token', response.token);
    return true;
  }

  handlerRegisterSuccess(response: RegisterResponse) {
    return true;
  }

  handlerAuthError() {
    this.logout();
    return of(false);
  }

  handlerRegisterError() {
    return of(false);
  }
}
