import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api-service.service";
import { CardModule } from "primeng/card";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  goals: any[] = [];
  invoices: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // this.fetchGoals();
    this.fetchBill();
  }

  fetchGoals(): void {
    this.apiService.requestFromApi("goal/getAll").subscribe({
      next: (data) => {
        this.goals = data.slice(0, 5);
      },
    });
  }

  fetchBill(): void {
    this.apiService.requestFromApi("bill/getAll").subscribe({
      next: (data) => {
        this.invoices = data.slice(0, 5);
      },
    });
  }
}
