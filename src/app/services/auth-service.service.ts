import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { LoaderService } from '../services/loader.service';
import { environment } from '../../environments/environment.development';
import { Subject, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logged = false;
  private interval!: NodeJS.Timer;
  private baseUrl = environment.apiUrl;
  public tokenIsValid = new Subject<boolean>();

  constructor(
    private router: Router,
    private loader: LoaderService,
    private jwt: JwtHelperService,
    private httpClient: HttpClient,
    private platform: Platform,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    ) 
    {
      if (this.intervalRunning) {
        this.checkToken();
      }
    }

  public get isLogged () {
    this.logged = this.TokenData != null;
    return this.logged;
  }

  public get Token() {
    return this.localStorage.get("token");
  }

  public set Token(token: any) {

    if (!token) {
      this.logged = false
    } else {
      this.logged = true
    }

    this.localStorage.set("token", token);
  }

  public get TokenData() {
    if (this.Token) {
      return this.jwt.decodeToken();
    }
    return null;
  }

  private get ExpiresIn() {
    if (this.Token) {
      return this.jwt.getTokenExpirationDate()
    }
    return null
  }

  public get IsValid() {
    const isValid = this.jwt.isTokenExpired(this.Token)
    
    return isValid
  }
  
  private get intervalRunning() {
    return this.localStorage.get("interval")
  }

  private set intervalRunning(value: boolean) {
    this.localStorage.set("interval", value);
  }

  public getUserData() {
    return this.TokenData;
  }
  
  public login(login: string, password: string) {
    const loginModel = {
      login: login,
      password: password
    }

    this.loader.show()

    return this.httpClient.post(this.baseUrl + "Auth/Login", loginModel).pipe(map((r: any) => {
      console.log(r);
      this.Token = r.token;
      this.loader.hide();

      if (r.token) {
        this.checkToken();
      }

      return r
    }))
  }

  public logout() {
    this.Token = null;

    this.back({
      beforeNavigate: () => this.messageService.add({severity: "info", summary: "Até breve..."}),
      timeout: 1000
    })
  }

  public back(navigate?: NavigateOptions) {
    if (navigate && navigate.beforeNavigate) {
      navigate.beforeNavigate()
    }

    setTimeout(() => {
      this.router.navigate(['login']);
      if (navigate && navigate.afterNavigate) {
        navigate.afterNavigate();
      }
    }, navigate ? navigate.timeout : 456);

    return false;
  }

  public goFourth(navigate: NavigateOptions) {
    if (navigate.beforeNavigate) {
      navigate.beforeNavigate()
    }
    setTimeout(() => {
      if (navigate.target) {
        this.router.navigate([navigate.target]);
      }

      if (navigate.afterNavigate) {
        navigate.afterNavigate();
      }
    }, navigate.timeout);
  }

  private checkToken() {
    clearInterval(this.interval)
    this.intervalRunning = true;

    this.interval = setInterval(async () => {
      const now = Date.now();
      const timeRemaining = await this.ExpiresIn;

      if (!timeRemaining) {
        clearInterval(this.interval);
        this.intervalRunning = false;
      }

      const isNeedRefresh = Math.abs(timeRemaining?.getTime()! - now) / 1000 < 100;

      if (this.isLogged && isNeedRefresh) {
        clearInterval(this.interval);
        this.intervalRunning = false;
        this.tryRefreshToken()
      }

      if (!this.isLogged) {
        clearInterval(this.interval)
        this.intervalRunning = false;
      }
    }, 1000);
  }

  private tryRefreshToken() {
    console.log("Token its auto-refresh only on mobile");
    if (!this.platform.isBrowser || this.platform.ANDROID || this.platform.IOS) {

      console.log("Trying to refresh token");
      this.httpClient.get(this.baseUrl + "Auth/Refresh").subscribe((x: any) => {
        console.log(x);
        
        if (x && x.token) {
          console.log("Token refreshed");
          this.Token = x.token;
          
          this.checkToken()
        }
      }, err => {
        this.back({beforeNavigate: () => this.messageService.add({severity: "warning", summary: "Erro ao atualizar token", detail: err})})
      })
    }
  }

}

export class NavigateOptions {
  timeout? = 456;
  target?: string
  beforeNavigate?: () => void;
  afterNavigate?: () => void;
  prompt?: Promise<boolean>
}
