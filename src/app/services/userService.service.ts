import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:8080"; // Substitua pela URL do seu backend Spring Boot.

  constructor(private http: HttpClient) {}

  createUser(user: any) {
    return this.http.post(`${this.apiUrl}/api/user/save`, user);
  }
 
}
