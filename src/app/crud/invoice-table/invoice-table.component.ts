import { Component } from "@angular/core";
import { ApiService } from "../../services/api-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-invoice-table",
  templateUrl: "./invoice-table.component.html",
  styleUrls: ["./invoice-table.component.scss"],
})
export class InvoiceTableComponent {
  invoices: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBill();
  }

  fetchBill(): void {
    this.apiService.requestFromApi("bill/getAll").subscribe({
      next: (data) => {
        this.invoices = data;
      },
    });
  }

  onEdit(selectGoal: any): void {
    this.router.navigate(["/addInvoice", selectGoal]);
  }

  onDelete(selectedGoal: any): void {
    if (confirm("Are you sure you want to delete this goal?")) {
      this.apiService
        .deleteFromApi("bill/delete/" + selectedGoal.id)
        .subscribe({
          next: () => {
            console.log("Goal deleted successfully");
            this.fetchBill();
          },
          error: (error) => {
            console.error("Error deleting goal:", error);
          },
        });
    }
  }
}
