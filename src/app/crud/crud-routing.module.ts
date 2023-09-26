import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalComponent } from './goal/goal.component';
import { UserComponent } from './user/user.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  {path: "goal", component: GoalComponent},
  {path: "user", component: UserComponent},
  {
    path: "addInvoice",
    component: InvoiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudRoutingModule {}
