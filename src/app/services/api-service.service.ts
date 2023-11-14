import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable, Subject, catchError, finalize, map, of, take, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoaderService } from './loader.service';
import { LocalStorageService } from './local-storage.service';
import { AuthService } from "./auth-service.service";

var self: any;

@Injectable({ providedIn: "root" })
export class ApiService {

  private baseUrl = environment.apiUrl + "api/";
  private offline = new Subject();

  constructor(
    private httpClient: HttpClient,
    private loader: LoaderService,
    private auth :AuthService,
    private localStorage: LocalStorageService
  ) {
    self = this;
    setInterval(() => {
      this.isConnect;
    }, 333);
  }

  private connected!: boolean;

  private get isConnect() {
    if (!this.connected && navigator.onLine) {
      this.offline.next(false);
    }

    if (this.connected && !navigator.onLine) {
      this.offline.next(true);
    }

    this.connected = navigator.onLine;
    return this.connected;
  }

  public requestFromApi<T = any>(endpoint: string, query?: string) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    this.loader.show();

    if (query) {
      apiUrl += query;
    }

    return this.httpClient.get<T>(apiUrl).pipe(catchError(this.handleError)).pipe(finalize(() => this.loader.hide())).pipe(map(result => {
      this.loader.hide();
      console.log(result);
      
      return result;
    }));
  }

  public sendToApi(endpoint: string, body: any) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    this.loader.show()
 
    return this.httpClient.post(apiUrl, body).pipe(catchError(this.handleError)).pipe(finalize(() => this.loader.hide())).pipe(take(1)).pipe(map(result => {
      this.loader.hide();
      return result;
    }));
  }

  public updateApi(endpoint: string, body: any) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    this.loader.show();

    return this.httpClient
      .put(apiUrl, body)
      .pipe(catchError(this.handleError)).pipe(finalize(() => this.loader.hide())).pipe(take(1)).pipe(map(result => {
        this.loader.hide();
        return result;
      }));
  }

  public deleteFromApi(endpoint: string, query?: any) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    this.loader.show();

    if (query) {
      apiUrl += query;
    }

    return this.httpClient.delete(apiUrl).pipe(catchError(this.handleError)).pipe(finalize(() => this.loader.hide())).pipe(take(1)).pipe(map(result => {
      this.loader.hide();
      return result;
    }));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\\nMessage: ${error.message}`;

      if (error.status > 400 && error.status <= 403) {
        errorMessage = error.error.message;
        setTimeout(() => self.auth.logout("Sua sessão expirou, faça login novamente."), 100);
      }

    }
    
    return throwError(errorMessage);
  }
}
