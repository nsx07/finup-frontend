import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

import { SignupComponent } from "./pages/signup/signup.component";
import { FormDeactivateGuard } from "./guards/form-deactivate.guard";

const routes: Routes = [
  {
    path: "signup",
    component: SignupComponent,
    canDeactivate: [FormDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [CommonModule, RouterModule],
})
export class AppRoutingModule {}
