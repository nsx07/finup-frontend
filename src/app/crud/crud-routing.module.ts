import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { GoalComponent } from "./goal/goal.component";
import { UserComponent } from "./user/user.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { GoalTableComponent } from "./goal-table/goal-table.component";
import { UserTableComponent } from "./user-table/user-table.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { InvoiceTableComponent } from "./invoice-table/invoice-table.component";

const routes: Routes = [
  {
    path: "",
    component: NavbarComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      { path: "goal", component: GoalComponent },
      { path: "goal/:id", component: GoalComponent },
      { path: "user", component: UserComponent },
      { path: "goalTable", component: GoalTableComponent },
      { path: "userTable", component: UserTableComponent },
      {
        path: "invoice",
        component: InvoiceComponent,
      },
      {
        path: "invoiceTable",
        component: InvoiceTableComponent,
      },
      {
        path: "invoiceTable/:id",
        component: InvoiceTableComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudRoutingModule {}
