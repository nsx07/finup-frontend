import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormBaseComponent } from "../../shared/form-base.component";
import { FormValidators } from "../../shared/form-validators";
import { ApiService } from "../../services/api-service.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-goal",
  templateUrl: "./goal.component.html",
  styleUrls: ["./goal.component.scss"],
})
export class GoalComponent extends FormBaseComponent implements OnInit {
  isEditing = false;
  goalId!: string;

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
      this.goalId = params["id"];
      this.isEditing = !!this.goalId;
      if (this.isEditing) {
        this.loadGoalDetails();
      }
    });
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

  private loadGoalDetails() {
    this.apiService.requestFromApi(`goal/getById/${this.goalId}`).subscribe({
      next: (data) => {
        this.form.patchValue({
          name: data.name,
          amount: data.amount,
          status: data.status,
          startDate: data.startDate,
          finishDate: data.finishDate,
          description: data.description,
        });
      },
      error: (error) => {
        console.error("Error loading goal details:", error);
      },
    });
  }

  override submit(): void {
    const form = this.form.value;

    if (this.isEditing) {
      this.apiService.updateApi("goal/update", form).subscribe({
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
      this.apiService.sendToApi("goal/save", form).subscribe({
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
