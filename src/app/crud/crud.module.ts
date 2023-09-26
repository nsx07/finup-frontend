import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalComponent } from './goal/goal.component';
import { UserComponent } from './user/user.component';


import { CrudRoutingModule } from "./crud-routing.module";
import { InvoiceComponent } from "./invoice/invoice.component";
import { ComponentsModule } from "../components/components.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    GoalComponent,
    UserComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CrudModule {}
