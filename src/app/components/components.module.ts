import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from "../app-routing.module";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { LoaderComponent } from "./loader/loader.component";
import { AnimateModule } from "primeng/animate";
import { HeaderComponent } from "./header/header.component";
import { ErrorMsgComponent } from "./error-msg/error-msg.component";

@NgModule({
  declarations: [LoaderComponent, HeaderComponent, ErrorMsgComponent],
  exports: [LoaderComponent, HeaderComponent, ErrorMsgComponent],
  imports: [
    ProgressSpinnerModule,
    AppRoutingModule,
    AnimateModule,
    CommonModule,
  ],
})
export class ComponentsModule {}
