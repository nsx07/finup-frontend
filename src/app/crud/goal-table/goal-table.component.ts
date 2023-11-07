import { Component } from '@angular/core';
import { ApiService } from '../../services/api-service.service';

@Component({
  selector: 'app-goal-table',
  templateUrl: './goal-table.component.html',
  styleUrls: ['./goal-table.component.scss']
})
export class GoalTableComponent {

  goals: any[] = []

  constructor(private apiService: ApiService) {
    
  }

  ngOnInit(): void {
    this.apiService.requestFromApi("goals/getAll").subscribe({
      next: (data) => {
        this.goals = data
      }
    })
  }


}
