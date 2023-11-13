import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

import { SignupComponent } from "./pages/signup/signup.component";
import { FormDeactivateGuard } from "./guards/form-deactivate.guard";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./guards/auth-guard.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "signup", component: SignupComponent, canDeactivate: [FormDeactivateGuard]},
  { path: "crud", loadChildren: () => import("./crud/crud.module").then(x => x.CrudModule), canActivateChild: [AuthGuard], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [CommonModule, RouterModule],
})
export class AppRoutingModule {}
