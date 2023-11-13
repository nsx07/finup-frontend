import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject, finalize, map, of, take } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoaderService } from './loader.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({providedIn: 'root'})
export class ApiService {

  private baseUrl = environment.apiUrl + "api/";
  private offline = new Subject();

  constructor(private httpClient: HttpClient, private loader: LoaderService, private localStorage: LocalStorageService) {
    setInterval(() => {
      this.isConnect
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
    
    this.connected = navigator.onLine
    return this.connected;
  }

  public requestFromApi<T = any>(endpoint: string, query?: string) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    this.loader.show()

    if (query) {
      apiUrl += query;
    }

    return this.httpClient.get<T>(apiUrl).pipe(finalize(() => this.loader.hide())).pipe(map(result => {
      this.loader.hide();
      console.log(result);
      
      return result;
    }));
  }

  public sendToApi(endpoint: string, body: any) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    this.loader.show()
 
    return this.httpClient.post(apiUrl, body).pipe(finalize(() => this.loader.hide())).pipe(take(1)).pipe(map(result => {
      this.loader.hide();
      return result;
    }));
  }

  public deleteFromApi(endpoint: string, query?: any) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    this.loader.show()

    if (query) {
      apiUrl += query;
    }

    return this.httpClient.delete(apiUrl).pipe(finalize(() => this.loader.hide())).pipe(take(1)).pipe(map(result => {
      this.loader.hide();
      return result;
    }));
  }
  
}
