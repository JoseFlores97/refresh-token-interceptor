import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IToken } from './interfaces';
import { Observable } from 'rxjs';
import { environment } from '@enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: IToken;
  requestCount = 0;

  constructor(private http: HttpClient) { }

  login(): Observable<IToken> {
    return this.http.post<IToken>(`${environment.endPoint}/login`, {
      email: 'pepe@gmail.com',
      password: '1234'
    });
  }

  refreshToken(refreshToken: string): Observable<IToken> {
    return this.http.post<IToken>(`${environment.endPoint}/login/refresh-token`, {
      refresh_token: refreshToken
    });
  }
}
