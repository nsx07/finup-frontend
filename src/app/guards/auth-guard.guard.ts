import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth-service.service";
import { MessageService } from "primeng/api";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  
  tokenValid!: boolean
  
  constructor(private auth: AuthService, private router: Router, private message: MessageService) {
  }

  private ManagerTypes = ["admin", "developer"];
  
  canActivate(): boolean {
    console.log("[canActivate]" ,!this.auth.isLogged , !this.auth.Token);
    
    if (!this.auth.isLogged || !this.auth.Token || this.auth.IsValid) {
      return this.auth.back({
        afterNavigate: () => this.message.add({severity: "info", summary: "Login expirado!", detail: "É necessário realizar o login novamente."})
      });
    }

    return true;
  }

  canActivateChild(): boolean {

    if (!this.auth.isLogged) {
      return this.auth.back({
        afterNavigate: () => this.message.add({severity: "info", summary: "Login expirado!", detail: "É necessário realizar o login novamente."})
      });

    }

    return true;
  }
}