import { Component, OnInit } from "@angular/core";
import { FormBaseComponent } from "../../shared/form-base.component";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent extends FormBaseComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [null, [Validators.required]],
      value: [null, [Validators.required]],
      date: [null, [Validators.required]],
      status: [null, [Validators.required]],
    });
  }

  submit() {
    let valueSubmit = Object.assign({}, this.form.value);
    console.log(valueSubmit);

    // TODO: Add user to database
  }
}
