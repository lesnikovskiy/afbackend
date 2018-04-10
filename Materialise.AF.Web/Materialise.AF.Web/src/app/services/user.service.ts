import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  private apiPath = `${environment.apiEndpoint}/user`;

  getCurrentUserToken(): string {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  create(user: User) {
    const userData = { firstname: user.firstName, lastName: user.lastName, email: user.email };

    return this.http.post<any>(this.apiPath, userData)
      .map(data => {
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          user.id = data.id;
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return data;
      });
  }
}
