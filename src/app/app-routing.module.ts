import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartPointDetailsComponent } from './modules/core/components/chart-point-details/chart-point-details.component';
import { DashboardComponent } from './modules/core/components/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component:DashboardComponent},
  {path: 'dashboard', redirectTo:''},
  {path: 'chartPointDetails/:id', component: ChartPointDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
