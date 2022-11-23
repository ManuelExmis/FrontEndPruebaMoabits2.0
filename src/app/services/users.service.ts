import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from '../interfaces/user';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'http://localhost:8080/api/v1/user'
  private urlRolls = 'http://localhost:8080/api/v1/rol'

  constructor(
    private http: HttpClient
  ) { }

  getUsuarios(): Observable<any> {
    return this.http.get(this.url);
  }

  getRolls(): Observable<any> {
    return this.http.get(this.urlRolls)
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(this.url, user);
  }

  deleteUser(id: Number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.url, user)
  }
}
