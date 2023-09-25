import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

import { SignupComponent } from "./pages/signup/signup.component";
import { FormDeactivateGuard } from "./guards/form-deactivate.guard";
import { LoginComponent } from "./pages/login/login.component";
import { InvoiceComponent } from "./crud/invoice/invoice.component";
import { InvoiceTableComponent } from "./pages/invoice-table/invoice-table.component";

const routes: Routes = [
  {
    path: "signup",
    component: SignupComponent,
    canDeactivate: [FormDeactivateGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "invoice", component: InvoiceTableComponent },
  {
    path: "crud",
    loadChildren: () => import("./crud/crud.module").then((m) => m.CrudModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [CommonModule, RouterModule],
})
export class AppRoutingModule {}
