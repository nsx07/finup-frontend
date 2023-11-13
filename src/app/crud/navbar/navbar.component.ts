import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth-service.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  isOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.authService.logout();
  }
}
