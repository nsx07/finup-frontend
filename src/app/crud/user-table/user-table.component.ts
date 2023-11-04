import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  users: any[] = []

  constructor(private apiService: ApiService) {
    
  }
  
  ngOnInit(): void {
    this.apiService.requestFromApi("user/getAll").subscribe({
      next: (data) => {
        this.users = data
      }
    })
  }




}
