import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormBaseComponent } from "../../shared/form-base.component";
import { FormValidators } from "../../shared/form-validators";
import { ApiService } from "../../services/api-service.service";

@Component({
  selector: "app-goal",
  templateUrl: "./goal.component.html",
  styleUrls: ["./goal.component.scss"],
})
export class GoalComponent extends FormBaseComponent implements OnInit {
  constructor(private fb: FormBuilder, private apiService: ApiService) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      status: ["Não atingido"],
      startDate: ["", [Validators.required]],
      finishDate: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }

  override submit(): void {
    const form = this.form.value;
    console.log("aa");

    this.apiService.sendToApi("goal/save", form).subscribe({
      next: (data) => {
        console.log(data);
        if (data) {
          this.form.reset();
        }
      },
    });
  }
}
