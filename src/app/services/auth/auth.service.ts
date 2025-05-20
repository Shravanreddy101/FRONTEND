import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

interface AuthResponse {
  jwt: string;
  userId: number;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userStorageService: UserStorageService) {}

  register(signupRequest: any): Observable<any>{
    return this.http.post(BASIC_URL + "sign-up", signupRequest);
  }

  login(username: string, password: string): any{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {username, password};
    return this.http.post<AuthResponse>(BASIC_URL + "authenticate", body, {headers, observe: 'response'}).pipe(

      map((res) => {
        const body = res.body;
        const token = body?.jwt;
        const user = {
        id: body?.userId,
        role: body?.role,
        };

        if(token && user){
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          return true;
        }
        return false;
      })
    )
  }


  getOrderByTrackingNumber(trackingId: any): Observable<any> {
    return this.http.get(BASIC_URL + `order/${trackingId}`);
  }
}
