import { Component } from "@angular/core";
import { ApiService } from "../../services/api-service.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-goal-table",
  templateUrl: "./goal-table.component.html",
  styleUrls: ["./goal-table.component.scss"],
})
export class GoalTableComponent {
  goals: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

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

  onEdit(selectGoal: any): void {
    this.router.navigate(["goal", selectGoal]);
  }

  onDelete(selectedGoal: any): void {
    if (confirm("Are you sure you want to delete this goal?")) {
      this.apiService
        .deleteFromApi("goal/delete/" + selectedGoal.id)
        .subscribe({
          next: () => {
            console.log("Goal deleted successfully");
            this.fetchGoals();
          },
          error: (error) => {
            console.error("Error deleting goal:", error);
          },
        });
    }
  }
}
