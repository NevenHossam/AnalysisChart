import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'chart.js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropDownListComponent } from './modules/core/components/drop-down-list/drop-down-list.component';
import { AnalyticChartComponent } from './modules/core/components/analytic-chart/analytic-chart.component';
import { DashboardComponent } from './modules/core/components/dashboard/dashboard.component';

import { ChartsModule } from 'ng2-charts';
import { ChartSummaryComponent } from './modules/core/components/chart-summary/chart-summary.component';
import { ChartPointDetailsComponent } from './modules/core/components/chart-point-details/chart-point-details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    DropDownListComponent,
    AnalyticChartComponent,
    DashboardComponent,
    ChartSummaryComponent,
    ChartPointDetailsComponent
        
  ],
  imports: [  
    ChartsModule, 
    BrowserModule,
    AppRoutingModule,
  RouterModule
      ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
