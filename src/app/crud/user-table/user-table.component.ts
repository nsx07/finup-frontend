import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  users: any[] = []

  constructor(private apiService: ApiService, private router: Router) {
    
  }
  
  ngOnInit(): void {
    this.fetchUsers()
  }

  fetchUsers() {
    this.apiService.requestFromApi("user/getAll").subscribe({
      next: (data) => {
        this.users = data
      }
    })
  }

  onEdit(selectUser: any): void {
    this.router.navigate(["/user", selectUser]);
  }

  onDelete(selectedUser: any): void {
    if (confirm("Are you sure you want to delete this goal?")) {
      this.apiService
        .deleteFromApi("user/delete/" + selectedUser.id)
        .subscribe({
          next: () => {
            console.log("User deleted successfully");
            this.fetchUsers();
          },
          error: (error) => {
            console.error("Error deleting goal:", error);
          },
        });
    }
  }




}
