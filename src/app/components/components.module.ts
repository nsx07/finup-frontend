import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderComponent } from './loader/loader.component';
import { AnimateModule } from 'primeng/animate';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    LoaderComponent,
    HeaderComponent
  ],
  exports: [
    LoaderComponent,
    HeaderComponent
  ],
  imports: [
    ProgressSpinnerModule,
    AppRoutingModule,
    AnimateModule,
    CommonModule
  ]
})
export class ComponentsModule { }
