import { Component, OnInit } from "@angular/core";
import { FormBaseComponent } from "../../shared/form-base.component";
import { FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "../../services/api-service.service";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent extends FormBaseComponent implements OnInit {
  constructor(private fb: FormBuilder, private apiService: ApiService) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
  }
  
  private createForm() {
    this.form = this.fb.group({
      description: ["", [Validators.required]],
      value: ["", [Validators.required]],
      date: ["", [Validators.required]],
      status: ["", [Validators.required]],
    });
  }


  override submit(): void {
    const form = this.form.value;
    console.log("aa");

    this.apiService.sendToApi("bill/save", form).subscribe({
      next: (data) => {
        console.log(data);
        if (data) {
          this.form.reset();
        }
      },
    });
  }
}
