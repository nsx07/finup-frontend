import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GoalComponent } from "./goal/goal.component";
import { UserComponent } from "./user/user.component";

import { CrudRoutingModule } from "./crud-routing.module";
import { InvoiceComponent } from "./invoice/invoice.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UserTableComponent } from "./user-table/user-table.component";
import { GoalTableComponent } from "./goal-table/goal-table.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NavbarComponent } from "./navbar/navbar.component";

@NgModule({
  declarations: [
    GoalComponent,
    UserComponent,
    InvoiceComponent,
    UserTableComponent,
    GoalTableComponent,
    DashboardComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, CrudRoutingModule, ReactiveFormsModule],
})
export class CrudModule {}
