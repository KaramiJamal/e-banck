import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken: string | undefined;
  authenticated = false;
  role!: string | undefined;
  username!: string | undefined;

  constructor(private httpClient: HttpClient, private router: Router) {}

  public login(username: string, password: string) {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    return this.httpClient.post(
      `${environment.backendHost}/auth/login`,
      params,
      options
    );
  }

  public loadProfile(token: any) {
    this.accessToken = token['access-token'];
    this.authenticated = true;
    const decodedJwt: { scope: string; sub: string } = jwtDecode(
      this.accessToken as string
    );
    this.role = decodedJwt.scope;
    this.username = decodedJwt.sub;
    localStorage.setItem('token', this.accessToken as string);
    console.log(decodedJwt);
  }

  logOut() {
    this.accessToken = undefined;
    this.username = undefined;
    this.role = undefined;
    this.authenticated = false;
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
  }
}
