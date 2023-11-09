import { Component } from "@angular/core";
import { ApiService } from "../../services/api-service.service";

@Component({
  selector: "app-goal-table",
  templateUrl: "./goal-table.component.html",
  styleUrls: ["./goal-table.component.scss"],
})
export class GoalTableComponent {
  goals: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchGoals();
  }

  fetchGoals(): void {
    this.apiService.requestFromApi("goal/getAll").subscribe({
      next: (data) => {
        this.goals = data;
      },
    });
  }

  onDelete(selectedGoal: any): void {
    if (confirm("Are you sure you want to delete this goal?")) {
      this.apiService
        .deleteFromApi("goal/delete/" + selectedGoal.id)
        .subscribe({
          next: () => {
            console.log("Goal deleted successfully");
            this.fetchGoals(); // Atualiza a lista após a deleção
          },
          error: (error) => {
            console.error("Error deleting goal:", error);
          },
        });
    }
  }
}
