import { Component } from "@angular/core";
import { ApiService } from "../../services/api-service.service";

@Component({
  selector: "app-invoice-table",
  templateUrl: "./invoice-table.component.html",
  styleUrls: ["./invoice-table.component.scss"],
})
export class InvoiceTableComponent {
  invoices: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.requestFromApi("bill/getAll").subscribe({
      next: (data) => {
        this.invoices = data;
      },
    });
  }
}
