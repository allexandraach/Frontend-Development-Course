import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientComponent } from './components/patient/patient.component';
import { GetPatientsService } from './services/patients/get-patients.service';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { redHighlightDirective } from "./directives/redHighlight.directive";
import { blueHighlightDirective } from "./directives/blueHighlight.directive";
import { BmiCalculatorPipe } from './pipes/bmiCalculator.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    redHighlightDirective,
    blueHighlightDirective,
    BmiCalculatorPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    GetPatientsService,
    DecimalPipe,
    BmiCalculatorPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
