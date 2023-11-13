import { NO_ERRORS_SCHEMA, NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { ComponentsModule } from "./components/components.module";
import { FullCalendarModule } from "@fullcalendar/angular";

/**PrimeNG */
import { InputTextareaModule } from "primeng/inputtextarea";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { AutoCompleteModule } from "primeng/autocomplete";
import { SplitButtonModule } from "primeng/splitbutton";
import { MessageModule } from "primeng/message";
import { ToastModule } from "primeng/toast";
import { CardModule } from "primeng/card";
/** */

import { ApiService } from "./services/api-service.service";
import { MessageService } from "primeng/api";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { FormDeactivateGuard } from "./guards/form-deactivate.guard";
import { CrudModule } from "./crud/crud.module";
import { InvoiceTableComponent } from "./crud/invoice-table/invoice-table.component";
import { HomeComponent } from "./pages/home/home.component";
import { DashboardComponent } from "./crud/dashboard/dashboard.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    InvoiceTableComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    ToastModule,
    DialogModule,
    ButtonModule,
    MessageModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule,
    InputTextModule,
    SplitButtonModule,
    AutoCompleteModule,
    OverlayPanelModule,
    InputTextareaModule,
    CardModule,

    CrudModule,
    FullCalendarModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),

    ComponentsModule,
  ],
  providers: [HttpClient, ApiService, MessageService, FormDeactivateGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

String.prototype.toLowerCapital = function (this: string) {
  return this[0].toLowerCase() + this.slice(1);
};

String.prototype.toUpperCapital = function (this: string) {
  return this[0].toUpperCase() + this.slice(1);
};
