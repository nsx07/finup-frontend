import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { ApiService } from "../../services/api-service.service";
>>>>>>> e8afd86c687872c10e587c6c865400d114d7ee65

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.scss']
})
export class InvoiceTableComponent {
<<<<<<< HEAD

=======
  invoices: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.requestFromApi("bill/getAll").subscribe({
      next: (data) => {
        this.invoices = data;
      },
    });
  }
>>>>>>> e8afd86c687872c10e587c6c865400d114d7ee65
}
