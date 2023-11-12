
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router: Router) { }

  redirectToPage(pageName: string) {
    this.router.navigate([`/${pageName}`]);
  }

}
