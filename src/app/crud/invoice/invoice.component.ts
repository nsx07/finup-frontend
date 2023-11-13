import { Component, OnInit } from "@angular/core";
import { FormBaseComponent } from "../../shared/form-base.component";
import { FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "../../services/api-service.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent extends FormBaseComponent implements OnInit {
  isEditing = false;
  invoiceId!: string;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();

    this.route.params.subscribe((params) => {
      this.invoiceId = params["id"];
      this.isEditing = !!this.invoiceId;
      if (this.isEditing) {
        console.log("Editing goal:", this.invoiceId);
        this.loadGoalDetails();
      }
    });
  }

  private createForm() {
    this.form = this.fb.group({
      description: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      expirationDate: ["", [Validators.required]],
      status: ["", [Validators.required]],
    });
  }

  private loadGoalDetails() {
    this.apiService
      .requestFromApi(`api/bill/getById/${this.invoiceId}`)
      .subscribe({
        next: (data) => {
          this.form.patchValue({
            description: data.description,
            value: data.value,
            date: data.date,
            status: data.status,
          });
        },
        error: (error) => {
          console.error("Error loading invoice details:", error);
        },
      });
  }

  override submit(): void {
    const form = this.form.value;

    if (this.isEditing) {
      this.apiService
        .updateApi("bill/update", { ...form, id: this.invoiceId })
        .subscribe({
          next: (data) => {
            console.log(data);
            if (data) {
              this.form.reset();
            }
          },
          error: (error) => {
            console.error("Erro ao enviar dados para a API:", error);
          },
        });
    } else {
      this.apiService.sendToApi("bill/save", form).subscribe({
        next: (data) => {
          console.log(data);
          if (data) {
            this.form.reset();
          }
        },
        error: (error) => {
          console.error("Erro ao enviar dados para a API:", error);
        },
      });
    }
  }
}
