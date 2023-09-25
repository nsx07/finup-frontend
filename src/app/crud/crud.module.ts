import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CrudRoutingModule } from "./crud-routing.module";
import { InvoiceComponent } from "./invoice/invoice.component";
import { ComponentsModule } from "../components/components.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [InvoiceComponent],
  imports: [CommonModule, CrudRoutingModule, ReactiveFormsModule],
})
export class CrudModule {}
