import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080/auth/sign'

  constructor(
    private http: HttpClient
  ) { }

  login( loginData: any ): Observable<any> {
    let formData: any = new FormData();
    formData.append('login', loginData.usuario)
    formData.append('password', loginData.password)

    return this.http.post<any>(this.url, formData).pipe(
      map( response => {
        if ( response.access_token && response.access_token.length > 0 ) {
            localStorage.setItem('token', response.access_token);
        }

        return response;
      })
    )
  }
}
